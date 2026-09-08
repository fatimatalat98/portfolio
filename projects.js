/* =====================================================
                    PROJECT DATA
===================================================== */


window.PORTFOLIO_PROJECTS = [


/* =====================================================
   SENTRIQUIZ
===================================================== */

{
    id:
        "sentriquiz",


    title:
        "SentriQuiz",


    subtitle:
        "Secure Online Examination & Proctoring System",


    type:
        "Personal Project",


    category:
        "fullstack",


    featured:
        true,


    year:
        "2026",


    role:
        "Full Stack Developer",


    repo:
        "https://github.com/fatimatalat98/SentriQuiz",


    summary:

        "SentriQuiz is a full-stack online examination and browser-based proctoring system. It combines timed quizzes with webcam monitoring, face-presence checks, browser anti-cheat monitoring, evidence capture, MongoDB storage and an instructor review dashboard.",


    tech: [

        "HTML",

        "CSS",

        "JavaScript",

        "Node.js",

        "Express.js",

        "MongoDB",

        "MediaPipe"

    ],


    metrics: [

        "10-question quiz",

        "Camera evidence",

        "3-violation system"

    ],


    features: [

        "Timed multiple-choice examination",

        "Student name, username and email collection",

        "Webcam permission and live camera preview",

        "Initial student photograph before quiz",

        "One normal evidence photograph per question",

        "MediaPipe face-presence detection",

        "No-face warning before continuing",

        "Multiple-face warning",

        "Fullscreen monitoring",

        "Browser tab-switch detection",

        "Window focus monitoring",

        "Copy and paste monitoring",

        "Restricted browser shortcut monitoring",

        "Camera disconnection detection",

        "Three anti-cheat violations trigger automatic submission",

        "Quiz reports stored in MongoDB",

        "Camera evidence stored separately",

        "Instructor admin dashboard",

        "Individual quiz report review"

    ],


    architecture: [

        "index.html displays the student examination interface.",

        "script.js controls questions, answers, navigation, timer, fullscreen monitoring, anti-cheat events and quiz submission.",

        "camera.js controls webcam permission, live video and evidence image capture.",

        "face-presence.js uses MediaPipe to determine whether a face is visible in the camera.",

        "The frontend sends completed quiz reports to the Express backend using Fetch API requests.",

        "server.js runs with Node.js and Express and provides the application API routes.",

        "server.js reads the MongoDB connection information from the private .env file.",

        "MongoDB Atlas stores examination reports inside quiz_sessions.",

        "Camera evidence is stored separately inside quiz_snapshots.",

        "admin.html requests stored examination reports through server.js for instructor review."

    ],


    challenge:

        "One of the main challenges was coordinating camera evidence, face detection, navigation and the quiz timer without creating long delays for the student. The face checks originally blocked answer selection, so the architecture was improved by running monitoring in the background and only performing a fresh verification when needed.",


    learning:

        "SentriQuiz helped me understand how frontend JavaScript, browser APIs, asynchronous programming, Node.js, Express APIs and MongoDB work together in a complete application. It also introduced me to application security concepts and the limitations of browser-based monitoring.",


    contribution:

        "I worked on the complete application flow, including the quiz interface, timer, answer navigation, camera integration, evidence capture, face-presence monitoring, browser anti-cheat events, Express backend integration, MongoDB report storage and the instructor report dashboard."

},



/* =====================================================
   QUIZ PROJECT
===================================================== */

{
    id:
        "quiz-project",


    title:
        "Quiz Project",


    subtitle:
        "Interactive Browser Quiz Application",


    type:
        "Personal Project",


    category:
        "frontend",


    featured:
        true,


    year:
        "2026",


    role:
        "Frontend Developer",


    repo:
        "https://github.com/fatimatalat98/quiz-project",


    summary:

        "An interactive browser quiz application created to practice JavaScript state management, DOM manipulation, answer selection, navigation and score calculation.",


    tech: [

        "HTML",

        "CSS",

        "JavaScript"

    ],


    metrics: [

        "Interactive questions",

        "Score calculation",

        "Responsive UI"

    ],


    features: [

        "Multiple-choice questions",

        "Interactive answer selection",

        "Previous and next navigation",

        "Question progress",

        "Score calculation",

        "Responsive quiz interface"

    ],


    architecture: [

        "HTML provides the quiz interface structure.",

        "CSS controls the visual presentation and responsive design.",

        "JavaScript stores the question data.",

        "JavaScript tracks the user's selected answers.",

        "DOM events connect the interface with quiz logic.",

        "The final score is calculated after quiz completion."

    ],


    challenge:

        "The main challenge was maintaining question and answer state while moving between multiple questions.",


    learning:

        "This project improved my understanding of arrays, JavaScript objects, DOM manipulation, event listeners and frontend state management.",


    contribution:

        "I built the quiz interface and implemented the JavaScript logic for questions, answer selection, navigation and scoring."

},



/* =====================================================
   THEME SWITCHER
===================================================== */

{
    id:
        "theme-switcher",


    title:
        "Theme Switcher",


    subtitle:
        "Dynamic Light & Dark Theme Interface",


    type:
        "Personal Project",


    category:
        "frontend",


    featured:
        false,


    year:
        "2026",


    role:
        "Frontend Developer",


    repo:
        "https://github.com/fatimatalat98/theme-switcher",


    summary:

        "A lightweight frontend application that demonstrates dynamic light and dark theme switching using JavaScript and reusable CSS variables.",


    tech: [

        "HTML",

        "CSS",

        "JavaScript"

    ],


    metrics: [

        "Light mode",

        "Dark mode",

        "Dynamic UI"

    ],


    features: [

        "Light theme",

        "Dark theme",

        "Theme toggle control",

        "Reusable CSS custom properties",

        "Instant interface updates"

    ],


    architecture: [

        "HTML provides the interface structure.",

        "CSS variables define reusable theme colors.",

        "JavaScript listens for the theme button click.",

        "JavaScript changes the active theme.",

        "CSS automatically updates interface colors."

    ],


    challenge:

        "The main challenge was keeping contrast and visual consistency across both light and dark themes.",


    learning:

        "I learned how CSS variables and JavaScript can work together to create reusable theme systems.",


    contribution:

        "I implemented the complete theme switching interface and JavaScript behavior."

},



/* =====================================================
   GITHUB REPOSITORY PRACTICE
===================================================== */

{
    id:
        "github-repository",


    title:
        "GitHub Repository Practice",


    subtitle:
        "Git & GitHub Workflow Practice",


    type:
        "Practice Project",


    category:
        "practice",


    featured:
        false,


    year:
        "2026",


    role:
        "Developer",


    repo:
        "https://github.com/fatimatalat98/github-repository",


    summary:

        "A repository created to practice the fundamental Git and GitHub workflow including commits, remote repositories and project version control.",


    tech: [

        "Git",

        "GitHub"

    ],


    metrics: [

        "Version control",

        "Commits",

        "Remote repository"

    ],


    features: [

        "Git repository initialization",

        "Tracking project changes",

        "Creating commits",

        "Connecting local repository to GitHub",

        "Pushing project updates"

    ],


    architecture: [

        "Project files exist on the local computer.",

        "Git tracks changes to those files.",

        "Commits create checkpoints in project history.",

        "A GitHub remote stores the repository online.",

        "git push sends local commits to GitHub."

    ],


    challenge:

        "Understanding the difference between the local Git repository and the remote GitHub repository.",


    learning:

        "I learned the fundamental Git workflow including status, add, commit, pull and push.",


    contribution:

        "I created and managed the repository as part of my Git and GitHub practice."

},



/* =====================================================
   TEAM GIT PRACTICE
===================================================== */

{
    id:
        "team-git-practice",


    title:
        "Team Git Practice",


    subtitle:
        "Collaborative Git & GitHub Workflow",


    type:
        "Collaborative Project",


    category:
        "collab",


    featured:
        false,


    year:
        "2026",


    role:
        "Team Contributor",


    repo:
        "https://github.com/fatimatalat98/team-git-practice",


    summary:

        "A team-based project created to practice collaborative Git workflows and understand how multiple developers contribute to the same repository.",


    tech: [

        "Git",

        "GitHub"

    ],


    metrics: [

        "Team workflow",

        "Shared repository",

        "Git collaboration"

    ],


    features: [

        "Shared GitHub repository",

        "Multiple contributors",

        "Commit history",

        "Team repository workflow",

        "Collaborative version control"

    ],


    architecture: [

        "Each developer works from their local project copy.",

        "Git tracks each developer's changes.",

        "Developers create commits for completed work.",

        "GitHub acts as the shared remote repository.",

        "Team changes are combined through the shared Git workflow."

    ],


    challenge:

        "The main challenge was coordinating work between multiple contributors while keeping project changes organized.",


    learning:

        "This project gave me practical experience with Git collaboration and shared repositories.",


    contribution:

        "I participated in the collaborative Git workflow by making project changes, commits and working with the shared repository."

},



/* =====================================================
   POMODORO
===================================================== */

{
    id:
        "pomodoro-timer",


    title:
        "Pomodoro Timer",


    subtitle:
        "Productivity Timer Application",


    type:
        "Collaborative Project",


    category:
        "collab",


    featured:
        true,


    year:
        "2026",


    role:
        "Team Contributor",


    repo:
        "https://github.com/lishay7890/pomodoro-timer",


    summary:

        "A collaborative productivity application based on the Pomodoro technique, using timed work sessions and break intervals.",


    tech: [

        "HTML",

        "CSS",

        "JavaScript"

    ],


    metrics: [

        "Timer controls",

        "Work sessions",

        "Break sessions"

    ],


    features: [

        "Work session timer",

        "Short break timer",

        "Long break timer",

        "Start control",

        "Stop control",

        "Resume functionality",

        "Configurable session intervals"

    ],


    architecture: [

        "HTML provides the timer interface.",

        "CSS creates the responsive visual design.",

        "JavaScript manages countdown state.",

        "JavaScript switches between work and break sessions.",

        "Git is used to combine work from multiple contributors."

    ],


    challenge:

        "The challenge was keeping timer state predictable while supporting start, stop, resume and different session types.",


    learning:

        "I improved my understanding of JavaScript timers, application state and collaborative project development.",


    contribution:

        "I contributed to the development and integration of the collaborative Pomodoro Timer project."

},



/* =====================================================
   STORY CLONE
===================================================== */

{
    id:
        "story-clone",


    title:
        "Story Clone Project",


    subtitle:
        "Collaborative Web Application",


    type:
        "Collaborative Project",


    category:
        "collab",


    featured:
        false,


    year:
        "2026",


    role:
        "Team Contributor",


    repo:
        "https://github.com/lishay7890/story-clone-project",


    summary:

        "A collaborative web application created to practice building and integrating different parts of a shared project.",


    tech: [

        "HTML",

        "CSS",

        "JavaScript",

        "Node.js"

    ],


    metrics: [

        "Team project",

        "UI development",

        "Code integration"

    ],


    features: [

        "Interactive browser interface",

        "Shared development workflow",

        "Frontend functionality",

        "Team code integration"

    ],


    architecture: [

        "The browser displays the application interface.",

        "HTML provides page structure.",

        "CSS controls presentation.",

        "JavaScript provides dynamic functionality.",

        "The project is integrated using a shared Git repository."

    ],


    challenge:

        "Combining independently developed code without breaking existing functionality.",


    learning:

        "I learned how modular work and Git collaboration affect larger team projects.",


    contribution:

        "I contributed to the development and integration of the shared application."

},



/* =====================================================
   WEATHER APP
===================================================== */

{
    id:
        "weather-check",


    title:
        "Weather Check App",


    subtitle:
        "Interactive Weather Utility",


    type:
        "Collaborative Project",


    category:
        "collab",


    featured:
        false,


    year:
        "2026",


    role:
        "Team Contributor",


    repo:
        "https://github.com/lishay7890/weather-check-app",


    summary:

        "A collaborative weather-focused utility application designed to practice dynamic browser interfaces and result presentation.",


    tech: [

        "HTML",

        "CSS",

        "JavaScript"

    ],


    metrics: [

        "Dynamic interface",

        "User input",

        "Weather results"

    ],


    features: [

        "Location-based user input",

        "Weather result display",

        "Dynamic interface updates",

        "Responsive presentation"

    ],


    architecture: [

        "HTML creates the weather interface.",

        "The user enters a location.",

        "JavaScript processes the interaction.",

        "Weather information is rendered dynamically in the browser."

    ],


    challenge:

        "Presenting changing information clearly while keeping the interface simple.",


    learning:

        "I practiced building utility applications and dynamically rendering information.",


    contribution:

        "I contributed to the development of the collaborative weather application."

},



/* =====================================================
   CUSTOM DROPDOWN
===================================================== */

{
    id:
        "custom-dropdown",


    title:
        "Custom Dropdown",


    subtitle:
        "Reusable Interactive UI Component",


    type:
        "Collaborative Project",


    category:
        "collab",


    featured:
        false,


    year:
        "2026",


    role:
        "Team Contributor",


    repo:
        "https://github.com/lishay7890/custom-dropdown",


    summary:

        "A custom dropdown component created to practice reusable interface design and JavaScript-driven UI interaction.",


    tech: [

        "HTML",

        "CSS",

        "JavaScript"

    ],


    metrics: [

        "Reusable UI",

        "Interactive states",

        "Custom component"

    ],


    features: [

        "Custom dropdown button",

        "Open and closed states",

        "Option selection",

        "Dynamic selected value",

        "Reusable UI styling"

    ],


    architecture: [

        "HTML defines the dropdown structure.",

        "CSS controls visual states.",

        "JavaScript listens to user interactions.",

        "JavaScript updates the selected option."

    ],


    challenge:

        "Building custom interaction while keeping the component predictable and easy to use.",


    learning:

        "I improved my understanding of JavaScript events and reusable UI component development.",


    contribution:

        "I contributed to developing and testing the interactive dropdown component."

},



/* =====================================================
   TASK TRACKER
===================================================== */

{
    id:
        "task-tracker",


    title:
        "Task Tracker",


    subtitle:
        "Interactive Productivity Application",


    type:
        "Collaborative Project",


    category:
        "collab",


    featured:
        false,


    year:
        "2026",


    role:
        "Team Contributor",


    repo:
        "https://github.com/rmking205-oss/task-tracker",


    summary:

        "A collaborative productivity application focused on creating, displaying and managing tasks through an interactive interface.",


    tech: [

        "HTML",

        "CSS",

        "JavaScript"

    ],


    metrics: [

        "Task creation",

        "Task state",

        "Interactive list"

    ],


    features: [

        "Create tasks",

        "Display task list",

        "Task state management",

        "Interactive task controls"

    ],


    architecture: [

        "HTML displays the task interface.",

        "JavaScript stores task state.",

        "DOM manipulation updates the visible task list.",

        "CSS visually separates different task states."

    ],


    challenge:

        "Keeping the visible task list synchronized with the JavaScript state.",


    learning:

        "I practiced application state, DOM updates and collaborative frontend development.",


    contribution:

        "I contributed to the collaborative development and testing of the task tracker."

},



/* =====================================================
   TEMPERATURE SYSTEM
===================================================== */

{
    id:
        "temperature-system",


    title:
        "Temperature System",


    subtitle:
        "Interactive Temperature Utility",


    type:
        "Collaborative Project",


    category:
        "collab",


    featured:
        false,


    year:
        "2026",


    role:
        "Team Contributor",


    repo:
        "https://github.com/rmking205-oss/temperature-system",


    summary:

        "A collaborative utility application focused on processing temperature input and dynamically presenting calculated results.",


    tech: [

        "HTML",

        "CSS",

        "JavaScript"

    ],


    metrics: [

        "User input",

        "Calculations",

        "Dynamic output"

    ],


    features: [

        "Temperature input",

        "Input validation",

        "Temperature calculations",

        "Dynamic result rendering"

    ],


    architecture: [

        "HTML collects temperature input.",

        "JavaScript reads the user value.",

        "JavaScript performs the required calculation.",

        "The calculated result is displayed dynamically."

    ],


    challenge:

        "Handling user input correctly and keeping calculated output easy to understand.",


    learning:

        "I strengthened my understanding of JavaScript calculations, input validation and dynamic UI feedback.",


    contribution:

        "I contributed to the implementation and testing of the temperature utility."

}

,

/* =====================================================
   SCHOOL MANAGEMENT SYSTEM
===================================================== */

{
    id:
        "school-management-system",

    title:
        "School Management System",

    subtitle:
        "C++ Console-Based Management Application",

    type:
        "Academic Project",

    category:
        "practice",

    featured:
        true,

    year:
        "2025",

    role:
        "C++ Developer",

    repo:
        "https://github.com/fatimatalat98/cpp-school-management-system",

    summary:
        "A console-based School Management System developed in C++ with separate Admin, Teacher and Student modules. The application manages student records, academic results, library books, school transport and notifications while using file handling to preserve student information between program runs.",

    tech: [
        "C++",
        "Object-Oriented Programming",
        "File Handling",
        "STL",
        "Vectors"
    ],

    metrics: [
        "3 user roles",
        "Multiple management modules",
        "Persistent file storage"
    ],

    features: [
        "Admin, Teacher and Student role-based modules",
        "Student registration and profile management",
        "Teacher and student authentication",
        "Midterm and final examination marks",
        "Student report card generation",
        "Teacher-to-student notifications",
        "Library book management",
        "School transport management",
        "Persistent student records using file handling",
        "Menu-driven console interface"
    ],

    architecture: [
        "C++ classes represent students, teachers, books, buses and notifications.",
        "STL vectors manage collections of application objects during execution.",
        "File handling saves and reloads student records between application sessions.",
        "Separate menu systems control Admin, Teacher and Student functionality."
    ],

    challenge:
        "The main challenge was combining several school management modules into one application while maintaining separate permissions and workflows for administrators, teachers and students.",

    learning:
        "This project strengthened my understanding of C++ classes and objects, encapsulation, vectors, functions, loops, conditional logic, authentication workflows and persistent storage using file I/O.",

    contribution:
        "I developed the C++ application including the student, teacher, library, transport, report card and notification modules, together with the file-based persistence system."
},


/* =====================================================
   VIRTUAL PET SIMULATOR
===================================================== */

{
    id:
        "virtual-pet-simulator",

    title:
        "Virtual Pet Simulator",

    subtitle:
        "Java OOP Desktop Application with MySQL",

    type:
        "Academic Project",

    category:
        "fullstack",

    featured:
        true,

    year:
        "2026",

    role:
        "Java Developer",

    repo:
        "https://github.com/fatimatalat98/java-virtual-pet-simulator",

    summary:
        "A Java-based Virtual Pet Simulator developed using Object-Oriented Programming principles and connected to a MySQL database through JDBC. Users can create accounts, adopt virtual pets, manage pet activities, purchase items and store application information persistently in MySQL.",

    tech: [
        "Java",
        "OOP",
        "Java Swing",
        "JDBC",
        "MySQL",
        "SQL",
        "MySQL Connector/J"
    ],

    metrics: [
        "5 pet types",
        "MySQL persistence",
        "Multi-feature pet system"
    ],

    features: [
        "User registration and login",
        "Virtual pet adoption",
        "Dog, Cat, Bird, Rabbit and Fish pet types",
        "Pet hunger, happiness, health and energy management",
        "Feeding, playing and training activities",
        "Level and experience progression",
        "Pet mood management",
        "Inventory management",
        "Virtual shop and coin rewards",
        "Food, toys and medicine items",
        "Veterinary functionality",
        "Mini games and daily tasks",
        "Achievements and leaderboard",
        "Weather system and pet diary",
        "Java Swing graphical interface",
        "MySQL database persistence through JDBC"
    ],

    architecture: [
        "Java Swing provides the application's graphical user interface.",
        "Java classes model users, pets, inventory, shop items, activities and supporting systems.",
        "Object-Oriented Programming organizes shared pet behaviour and individual pet types.",
        "JDBC provides communication between the Java application and MySQL.",
        "MySQL Connector/J acts as the JDBC driver.",
        "MySQL stores application data persistently."
    ],

    challenge:
        "The primary challenge was managing a relatively large collection of interacting OOP classes while synchronizing application data with a relational MySQL database.",

    learning:
        "The project helped me practise inheritance, encapsulation, abstraction, class relationships, Java Swing interfaces, JDBC database connectivity, SQL and persistent application data.",

    contribution:
        "I developed the Java application using OOP principles, implemented the pet and user systems, built the Swing interface and worked with JDBC and MySQL for persistent application storage."
},


/* =====================================================
   TOY STORE WEBSITE
===================================================== */

{
    id:
        "toy-store",

    title:
        "Toy Store Website",

    subtitle:
        "Responsive Frontend E-Commerce Website",

    type:
        "Web Development Project",

    category:
        "frontend",

    featured:
        false,

    year:
        "2026",

    role:
        "Frontend Developer",

    repo:
        "https://github.com/fatimatalat98/toy-store",

    summary:
        "A responsive Toy Store website created as a frontend web development project. The website uses HTML and CSS to create a colourful e-commerce-inspired interface with product sections, promotional content, navigation and responsive layouts.",

    tech: [
        "HTML5",
        "CSS3",
        "Responsive Web Design"
    ],

    metrics: [
        "Responsive layout",
        "Multiple store sections",
        "Custom UI design"
    ],

    features: [
        "Responsive storefront layout",
        "Product showcase sections",
        "Navigation menu",
        "Promotional sections",
        "Product imagery",
        "Customer-focused content sections",
        "Contact information",
        "Custom CSS styling",
        "Responsive desktop and mobile layouts"
    ],

    architecture: [
        "HTML provides the semantic structure of the storefront.",
        "CSS controls the visual design, layout, typography, responsive behaviour and component styling.",
        "Images and other visual resources are organised inside the project's assets folder."
    ],

    challenge:
        "The main challenge was creating a complete multi-section storefront while maintaining consistent spacing, visual hierarchy and responsive behaviour across the page.",

    learning:
        "This project helped strengthen my understanding of HTML structure, CSS layouts, responsive design, positioning, reusable styling and building complete web page interfaces.",

    contribution:
        "I designed and developed the Toy Store frontend using HTML and CSS, including the page structure, product sections, visual styling and responsive layout."
}

,

/* =====================================================
   MULTI-CLOUD DATABASE E-COMMERCE
===================================================== */

{
    id:
        "multi-cloud-db-ecommerce",

    title:
        "Multi-Cloud DB E-Commerce",

    subtitle:
        "E-Commerce Dashboard with PostgreSQL & MongoDB",

    type:
        "Full Stack Project",

    category:
        "fullstack",

    featured:
        true,

    year:
        "2026",

    role:
        "Full Stack Developer",

    repo:
        "https://github.com/fatimatalat98/multi-cloud-db-ecommerce",

    summary:
        "A full-stack e-commerce dashboard built with Node.js and Express that connects to two cloud databases at the same time. Supabase PostgreSQL stores structured business data such as customers, products, orders and order items, while MongoDB Atlas stores flexible activity logs for order events.",

    tech: [
        "HTML",
        "CSS",
        "JavaScript",
        "Node.js",
        "Express.js",
        "Supabase PostgreSQL",
        "MongoDB Atlas",
        "Mongoose",
        "REST API"
    ],

    metrics: [
        "2 cloud databases",
        "Transactional order flow",
        "CRUD dashboard"
    ],

    features: [
        "Customer CRUD management",
        "Product CRUD and inventory management",
        "Add-to-cart workflow with quantity controls",
        "Customer selection during checkout",
        "Server-side order total calculation",
        "PostgreSQL transactions for order creation",
        "Automatic stock reduction after checkout",
        "Order and order item persistence",
        "MongoDB ORDER_CREATED activity logging",
        "Dashboard statistics and recent activity",
        "Responsive admin interface",
        "Environment-based cloud database configuration"
    ],

    architecture: [
        "The browser frontend is built with HTML, CSS and JavaScript and provides the dashboard, customer, product, order, activity and cart interfaces.",
        "Frontend JavaScript communicates with the backend through REST API requests.",
        "Node.js and Express provide the application server and API routes.",
        "Supabase PostgreSQL stores relational data for customers, products, orders and order_items.",
        "The order API validates stock, calculates totals on the server, creates order records and updates inventory inside a PostgreSQL transaction.",
        "MongoDB Atlas stores flexible activity log documents through Mongoose.",
        "When an order is successfully created, the backend also creates an ORDER_CREATED activity event in MongoDB.",
        "The dashboard combines PostgreSQL statistics and MongoDB activity data in one frontend view."
    ],

    challenge:
        "The main challenge was coordinating one application with two different cloud database systems while keeping transactional order data reliable. The order workflow was improved by moving price calculation and stock validation to the backend and using PostgreSQL transactions so incomplete orders do not remain when a database operation fails.",

    learning:
        "This project helped me understand how frontend applications communicate with REST APIs, how Node.js and Express connect to multiple databases, when relational and document databases are useful, how PostgreSQL relationships and transactions work, how MongoDB activity logging differs from transactional storage, and how environment variables keep cloud credentials outside the source code.",

    contribution:
        "I built the full application flow including the responsive dashboard, customer and product CRUD interfaces, cart and checkout functionality, Express API routes, Supabase PostgreSQL integration, MongoDB Atlas integration, inventory updates, order transactions and activity logging."
}


,

/* =====================================================
   OMNIMODEL LAB
===================================================== */

{
    id:
        "omnimodel-lab",

    title:
        "OmniModel Lab",

    subtitle:
        "Multi-Model AI Playground with Usage Billing",

    type:
        "Full Stack Project",

    category:
        "fullstack",

    featured:
        true,

    year:
        "2026",

    role:
        "Full Stack Developer",

    repo:
        "https://github.com/fatimatalat98/omnimodel-lab",

    summary:
        "A multi-model AI playground where users can test models such as GPT, Claude and Gemini from one interface, stream responses live, adjust generation controls, track token usage and cost, and manage transaction-safe billing through MySQL.",

    tech: [
        "HTML",
        "CSS",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MySQL",
        "OpenRouter API"
    ],

    metrics: [
        "Multiple AI models",
        "Live streaming responses",
        "Token & cost tracking"
    ],

    features: [
        "Select and test multiple AI models",
        "Live streamed AI responses",
        "Temperature, Top P and Max Token controls",
        "Stop Generation support",
        "Token usage and cost tracking",
        "Wallet balance system",
        "Transaction-safe billing with MySQL",
        "Light and Dark themes",
        "Stream chunk storage and recovery support"
    ],

    architecture: [
        "The frontend lets users enter prompts, choose an AI model and configure generation settings.",
        "The Node.js and Express backend checks the available balance before model generation begins.",
        "A maximum estimated cost is reserved before the selected model is called through OpenRouter.",
        "AI responses stream live to the frontend while response chunks are stored in MySQL.",
        "After completion, actual token usage and cost are calculated, the real amount is charged and any unused reserved amount is released.",
        "MySQL stores users, billing_accounts, ledger_entries, ai_models, generations and generation_chunks.",
        "The billing design uses an immutable ledger instead of directly modifying a balance column."
    ],

    challenge:
        "A key challenge was handling streamed AI generation together with billing safely. The application reserves an estimated amount before generation, records streamed chunks, calculates the actual token cost after completion and releases any unused reserved amount using database-backed billing logic.",

    learning:
        "This project strengthened my understanding of streamed API responses, multi-model AI integrations, backend billing logic, token and cost tracking, MySQL transactions, row locking, immutable ledgers and secure environment-variable based API configuration.",

    contribution:
        "I built the multi-model playground flow, model controls, streamed response experience, usage tracking, wallet and billing logic, MySQL persistence, backend API integration and theme support."
}


];
