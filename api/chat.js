const fs = require("fs");
const path = require("path");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed."
    });
  }

  try {
    const {
      question,
      history = []
    } = req.body || {};

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a question."
      });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    const model =
      process.env.OPENROUTER_MODEL ||
      "openai/gpt-4.1-mini";

    if (!apiKey) {
      throw new Error(
        "OPENROUTER_API_KEY is missing."
      );
    }

    const knowledgePath = path.join(
      process.cwd(),
      "rag_backend",
      "knowledge",
      "portfolio_data.json"
    );

    const portfolioData = JSON.parse(
      fs.readFileSync(
        knowledgePath,
        "utf8"
      )
    );

    const context = buildContext(
      portfolioData,
      question
    );

    const recentHistory =
      Array.isArray(history)
        ? history.slice(-6)
        : [];

    const messages = [
      {
        role: "system",
        content: `
You are Fatima Talat's portfolio assistant.

Answer only from the supplied portfolio context.

Rules:
1. Do not invent projects, skills, repositories or experience.
2. If the context does not support the answer, say:
   "I don't have that information in Fatima's portfolio."
3. Keep answers concise and professional.
4. When discussing a project, mention its name.
5. Use GitHub URLs from the context when asked.
        `.trim()
      },

      ...recentHistory
        .filter(
          item =>
            item &&
            typeof item.content === "string" &&
            ["user", "assistant"].includes(item.role)
        )
        .map(item => ({
          role: item.role,
          content: item.content
        })),

      {
        role: "user",
        content: `
PORTFOLIO CONTEXT

${context}

VISITOR QUESTION

${question}
        `.trim()
      }
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${apiKey}`,

          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          model,
          messages,
          max_tokens: 500,
          temperature: 0.2
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error?.message ||
        "OpenRouter request failed."
      );
    }

    const answer =
      data?.choices?.[0]?.message?.content?.trim();

    return res.status(200).json({
      success: true,

      answer:
        answer ||
        "I couldn't generate an answer from the portfolio information."
    });

  } catch (error) {
    console.error(
      "Portfolio chat error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "The portfolio assistant could not generate a response."
    });
  }
};


/* =========================================================
   BUILD SIMPLE RELEVANT CONTEXT
========================================================= */

function buildContext(
  portfolioData,
  question
) {
  const query =
    String(question)
      .toLowerCase()
      .trim();

  const words =
    query
      .split(/[^a-z0-9+#.]+/)
      .filter(
        word => word.length > 2
      );

  const documents = [];


  /* Profile */

  const profile =
    portfolioData.profile || {};

  documents.push({
    score:
      scoreText(
        [
          profile.name,
          profile.role,
          profile.summary,
          ...(profile.interests || [])
        ].join(" "),
        words
      ),

    text: `
Name:
${profile.name || ""}

Role:
${profile.role || ""}

Summary:
${profile.summary || ""}

Interests:
${(profile.interests || []).join(", ")}
    `.trim()
  });


  /* Skills */

  const skills =
    portfolioData.skills || {};

  for (
    const [category, list]
    of Object.entries(skills)
  ) {
    documents.push({
      score:
        scoreText(
          `${category} ${(list || []).join(" ")}`,
          words
        ),

      text: `
Skill Category:
${category}

Skills:
${(list || []).join(", ")}
      `.trim()
    });
  }


  /* Projects */

  for (
    const project
    of portfolioData.projects || []
  ) {
    const searchable = [
      project.title,
      project.type,
      project.role,
      project.summary,
      ...(project.technologies || []),
      ...(project.features || []),
      project.github_url
    ]
      .filter(Boolean)
      .join(" ");

    let score =
      scoreText(
        searchable,
        words
      );

    if (
      query.includes(
        String(
          project.title || ""
        ).toLowerCase()
      )
    ) {
      score += 20;
    }

    documents.push({
      score,

      text: `
Project Name:
${project.title || ""}

Project Type:
${project.type || ""}

Role:
${project.role || ""}

Summary:
${project.summary || ""}

Technologies:
${(project.technologies || []).join(", ")}

Features:
${(project.features || [])
  .map(item => `- ${item}`)
  .join("\n")}

Portfolio Page:
${project.project_url || ""}

GitHub Repository:
${project.github_url || ""}
      `.trim()
    });
  }


  return documents
    .sort(
      (a, b) =>
        b.score - a.score
    )
    .slice(0, 6)
    .map(item => item.text)
    .join("\n\n---\n\n");
}


function scoreText(
  text,
  words
) {
  const lower =
    String(text || "")
      .toLowerCase();

  let score = 0;

  for (const word of words) {
    if (
      lower.includes(word)
    ) {
      score += 3;
    }
  }

  return score;
}