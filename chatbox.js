const RAG_API_URL = "http://127.0.0.1:5002/api/chat";


/* ==========================================================
   ELEMENTS
========================================================== */

const chatLauncher = document.getElementById("chatLauncher");
const chatPanel = document.getElementById("chatPanel");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const chatError = document.getElementById("chatError");
const suggestedQuestions = document.getElementById("suggestedQuestions");

const conversationHistory = [];


/* ==========================================================
   OPEN / CLOSE CHAT
========================================================== */

function openChat() {
  chatPanel?.classList.add("open");
  chatPanel?.setAttribute("aria-hidden", "false");
  chatLauncher?.setAttribute("aria-expanded", "true");

  window.setTimeout(() => {
    chatInput?.focus();
  }, 100);
}


function closeChat() {
  chatPanel?.classList.remove("open");
  chatPanel?.setAttribute("aria-hidden", "true");
  chatLauncher?.setAttribute("aria-expanded", "false");
}


chatLauncher?.addEventListener("click", () => {
  if (chatPanel?.classList.contains("open")) {
    closeChat();
  } else {
    openChat();
  }
});


chatClose?.addEventListener("click", closeChat);


document
  .querySelectorAll("[data-open-chat]")
  .forEach((button) => {
    button.addEventListener("click", openChat);
  });


document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    chatPanel?.classList.contains("open")
  ) {
    closeChat();
  }
});


/* ==========================================================
   SUGGESTED QUESTIONS
========================================================== */

suggestedQuestions?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-question]");

  if (!button) return;

  openChat();

  sendQuestion(
    button.dataset.question || ""
  );
});


/* ==========================================================
   FORM
========================================================== */

chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const question =
    chatInput?.value.trim();

  if (!question) return;

  sendQuestion(question);
});


chatInput?.addEventListener(
  "input",
  resizeInput
);


chatInput?.addEventListener(
  "keydown",
  (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      chatForm?.requestSubmit();
    }
  }
);


/* ==========================================================
   INPUT RESIZE
========================================================== */

function resizeInput() {
  if (!chatInput) return;

  chatInput.style.height = "auto";

  chatInput.style.height =
    `${Math.min(chatInput.scrollHeight, 100)}px`;
}


/* ==========================================================
   SEND QUESTION TO RAG
========================================================== */

async function sendQuestion(question) {
  const cleanQuestion =
    String(question || "").trim();

  if (!cleanQuestion) return;


  hideError();

  suggestedQuestions?.remove();


  /* User message */

  addMessage(
    "user",
    cleanQuestion
  );


  /* Reset input */

  if (chatInput) {
    chatInput.value = "";

    resizeInput();
  }


  /* Add question to history */

  conversationHistory.push({
    role: "user",
    content: cleanQuestion
  });


  setLoading(true);

  const loadingNode =
    addLoadingMessage();


  try {

    const response =
      await fetch(
        RAG_API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            question: cleanQuestion,

            history:
              conversationHistory.slice(-6)
          })
        }
      );


    const data =
      await response
        .json()
        .catch(() => ({}));


    if (!response.ok) {
      throw new Error(
        data.error ||
        `Request failed (${response.status})`
      );
    }


    loadingNode?.remove();


    const answer =
      data.answer ||
      data.response ||
      "I couldn't generate an answer for that question.";


    addMessage(
      "assistant",
      answer,
      data.sources || []
    );


    conversationHistory.push({
      role: "assistant",
      content: answer
    });

  } catch (error) {

    loadingNode?.remove();


    showError(
      "I couldn't reach the portfolio assistant. Make sure the RAG backend is running on port 5002."
    );


    console.error(
      "RAG request failed:",
      error
    );

  } finally {

    setLoading(false);

  }
}


/* ==========================================================
   CHECK WHETHER SOURCES SHOULD BE HIDDEN
========================================================== */

/*
  The retriever may still return nearest documents even when
  none of them actually answer the user's question.

  Example:
  "Does Fatima have any AWS projects?"

  If the assistant correctly says that the information isn't
  available, we don't want unrelated projects appearing below
  the answer as sources.
*/

function shouldHideSources(text) {
  const answerText =
    String(text || "")
      .toLowerCase()
      .replace(/[’‘]/g, "'");


  const notFoundPhrases = [

    "don't have that information",

    "do not have that information",

    "i don't have information",

    "i do not have information",

    "not currently listed",

    "isn't currently listed",

    "is not currently listed",

    "not listed in fatima",

    "isn't listed in fatima",

    "is not listed in fatima",

    "not available in fatima's portfolio",

    "isn't available in fatima's portfolio",

    "is not available in fatima's portfolio",

    "no information about that",

    "no information is available"

  ];


  return notFoundPhrases.some(
    (phrase) =>
      answerText.includes(phrase)
  );
}


/* ==========================================================
   ADD MESSAGE
========================================================== */

function addMessage(
  role,
  text,
  sources = []
) {

  if (!chatMessages) {
    return null;
  }


  const article =
    document.createElement("article");


  article.className =
    `message ${
      role === "user"
        ? "user-message"
        : "assistant-message"
    }`;


  /* Assistant avatar */

  if (role !== "user") {

    const avatar =
      document.createElement("div");

    avatar.className =
      "message-avatar";

    avatar.textContent =
      "FT";

    article.appendChild(
      avatar
    );
  }


  /* Message content */

  const content =
    document.createElement("div");

  content.className =
    "message-content";


  const bubble =
    document.createElement("div");

  bubble.className =
    "message-bubble";


  String(text)
    .split(/\n{2,}/)
    .forEach((paragraphText) => {

      const p =
        document.createElement("p");


      p.textContent =
        paragraphText.trim();


      if (p.textContent) {
        bubble.appendChild(p);
      }

    });


  content.appendChild(
    bubble
  );


  /* ========================================================
     SOURCES

     Sources are shown normally for valid portfolio answers.

     They are hidden when the assistant explicitly says the
     requested information isn't available.
  ======================================================== */

  const hideSources =
    role !== "user" &&
    shouldHideSources(text);


  const visibleSources =
    hideSources
      ? []
      : sources;


  if (
    role !== "user" &&
    Array.isArray(visibleSources) &&
    visibleSources.length
  ) {

    const sourceBox =
      document.createElement("div");


    sourceBox.className =
      "message-sources";


    const label =
      document.createElement("span");


    label.className =
      "sources-label";


    label.textContent =
      "Sources";


    sourceBox.appendChild(
      label
    );


    const list =
      document.createElement("div");


    list.className =
      "source-list";


    visibleSources
      .slice(0, 4)
      .forEach((source) => {

        const title =
          source.title ||
          source.name ||
          source.project ||
          "Portfolio source";


        const url =
          source.url ||
          source.github_url ||
          "";


        const item =
          url
            ? document.createElement("a")
            : document.createElement("div");


        item.className =
          "source-link";


        if (url) {

          item.href =
            url;

          item.target =
            "_blank";

          item.rel =
            "noopener noreferrer";

        }


        const titleSpan =
          document.createElement("span");


        titleSpan.textContent =
          title;


        const arrow =
          document.createElement("span");


        arrow.textContent =
          url
            ? "↗"
            : "•";


        item.append(
          titleSpan,
          arrow
        );


        list.appendChild(
          item
        );

      });


    sourceBox.appendChild(
      list
    );


    content.appendChild(
      sourceBox
    );

  }


  article.appendChild(
    content
  );


  chatMessages.appendChild(
    article
  );


  scrollChatToBottom();


  return article;
}


/* ==========================================================
   LOADING MESSAGE
========================================================== */

function addLoadingMessage() {

  if (!chatMessages) {
    return null;
  }


  const article =
    document.createElement("article");


  article.className =
    "message assistant-message";


  article.innerHTML = `
    <div class="message-avatar">
      FT
    </div>

    <div class="message-content">
      <div class="message-bubble">

        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </div>
  `;


  chatMessages.appendChild(
    article
  );


  scrollChatToBottom();


  return article;
}


/* ==========================================================
   LOADING STATE
========================================================== */

function setLoading(loading) {

  if (sendButton) {
    sendButton.disabled =
      loading;
  }


  if (chatInput) {
    chatInput.disabled =
      loading;
  }

}


/* ==========================================================
   SCROLL
========================================================== */

function scrollChatToBottom() {

  requestAnimationFrame(() => {

    if (chatMessages) {

      chatMessages.scrollTop =
        chatMessages.scrollHeight;

    }

  });

}


/* ==========================================================
   ERROR
========================================================== */

function showError(message) {

  if (!chatError) return;


  chatError.textContent =
    message;


  chatError.hidden =
    false;

}


function hideError() {

  if (!chatError) return;


  chatError.hidden =
    true;


  chatError.textContent =
    "";

}
