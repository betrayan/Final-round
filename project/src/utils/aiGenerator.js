
// Mock AI Question Generator
// In a real application, this would call an OpenAI/Gemini API

const QUESTION_BANK = {
    "Frontend Developer": {
        beginner: [
            "What is the difference between let, const, and var in JavaScript?",
            "Explain the concept of the Virtual DOM in React.",
            "How do you center a div using Flexbox?",
            "What is the purpose of the useEffect hook?",
            "Describe the box model in CSS."
        ],
        intermediate: [
            "Explain the concept of closures in JavaScript and provide a use case.",
            "How does React handle state management with Context API vs Redux?",
            "What are the benefits of Server-Side Rendering (SSR) in Next.js?",
            "Discuss the difference between deep and shallow copying in JavaScript.",
            "How do you optimize the performance of a React application?"
        ],
        advanced: [
            "Explain the Event Loop in JavaScript in detail.",
            "How would you design a scalable micro-frontend architecture?",
            "Discuss the implications of using Web Workers for heavy computations.",
            "What strategies would you use for effective caching in a PWA?",
            "Explain how React Fiber works and its impact on rendering."
        ]
    },
    "Backend Developer": {
        beginner: [
            "What is the difference between GET and POST requests?",
            "Explain the concept of a RESTful API.",
            "What is SQL injection and how do you prevent it?",
            "Describe the purpose of middleware in Express.js.",
            "What is the difference between SQL and NoSQL databases?"
        ],
        intermediate: [
            "How do you handle authentication and authorization in a Node.js app?",
            "Explain the concept of database normalization.",
            "What are the benefits of using GraphQL over REST?",
            "How do you handle concurrent requests in a single-threaded Node.js server?",
            "Discuss the pros and cons of microservices architecture."
        ],
        advanced: [
            "Design a system for handling millions of concurrent websocket connections.",
            "Explain the CAP theorem and its relevance in distributed systems.",
            "How would you implement database sharding for a high-traffic application?",
            "Discuss the trade-offs between eventual consistency and strong consistency.",
            "How do you ensure message reliability in a message queue system like RabbitMQ or Kafka?"
        ]
    },
    "Data Scientist": {
        beginner: [
            "What is the difference between supervised and unsupervised learning?",
            "Explain the concept of overfitting and underfitting.",
            "What is a confusion matrix?",
            "Describe the steps in data preprocessing.",
            "What is the difference between pandas Series and DataFrame?"
        ],
        intermediate: [
            "How do you handle missing values in a dataset?",
            "Explain the bias-variance tradeoff.",
            "What are the different types of regularization techniques?",
            "How does a Random Forest algorithm work?",
            "Discuss the use of dimensionality reduction techniques like PCA."
        ],
        advanced: [
            "Explain the architecture of a Transformer model.",
            "How do you deploy a machine learning model to production at scale?",
            "Discuss the challenges of training deep learning models on large datasets.",
            "What is reinforcement learning and where is it used?",
            "Explain the concept of attention mechanisms in NLP."
        ]
    },
    // Fallback for other roles
    "General": {
        beginner: [
            "Tell me about a challenging project you worked on.",
            "How do you handle deadlines and pressure?",
            "What are your strengths and weaknesses?",
            "Describe a time you had a conflict with a team member.",
            "Where do you see yourself in 5 years?"
        ],
        intermediate: [
            "Describe a situation where you had to learn a new technology quickly.",
            "How do you mentor junior developers?",
            "Tell me about a time you improved a process.",
            "How do you prioritize tasks when you have multiple deadlines?",
            "Describe a complex problem you solved recently."
        ],
        advanced: [
            "How do you foster a culture of innovation in your team?",
            "Describe a strategic decision you made that had a significant impact.",
            "How do you handle failure in a high-stakes project?",
            "What is your approach to technical debt?",
            "How do you align technical goals with business objectives?"
        ]
    }
};

const HR_QUESTIONS = [
    "Tell me about yourself.",
    "Why do you want to work for this company?",
    "What motivates you?",
    "Describe your ideal work environment.",
    "How do you handle constructive criticism?",
    "What is your biggest professional achievement?",
    "Why are you looking for a new opportunity?",
    "How do you deal with ambiguity?",
    "What values are most important to you in a workplace?",
    "Do you have any questions for us?"
];

export const generateQuestion = (role, resumeLevel, history = [], type = "technical") => {
    // 1. Determine Difficulty based on Resume Level (0-100)
    let difficulty = 'beginner';
    if (resumeLevel >= 80) difficulty = 'advanced';
    else if (resumeLevel >= 50) difficulty = 'intermediate';

    // 2. Select Question Set
    let questionSet = [];

    if (type === 'hr') {
        questionSet = HR_QUESTIONS;
    } else {
        let normalizedRole = "General";
        if (role) {
            const foundRole = Object.keys(QUESTION_BANK).find(r => role.toLowerCase().includes(r.split(" ")[0].toLowerCase()));
            if (foundRole) normalizedRole = foundRole;
        }
        questionSet = QUESTION_BANK[normalizedRole][difficulty];
    }

    // 3. Filter out previously asked questions (simple mock implementation)
    // In a real app, 'history' would contain specific question IDs
    // Here we just pick a random one that hopefully isn't the immediate last one

    const randomQuestion = questionSet[Math.floor(Math.random() * questionSet.length)];

    // Add some "Generative AI" flavor - varying the phrasing
    const prefixes = [
        "Based on your profile, ",
        "Considering your experience level, ",
        "Let's dive into this: ",
        "Here is a scenario for you: ",
        "I'd like to understand your approach to this: "
    ];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

    return `${prefix}${randomQuestion}`;
};
