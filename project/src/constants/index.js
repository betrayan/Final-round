// Application Configuration Constants

export const APP_CONFIG = {
    name: 'NexusAI',
    tagline: 'AI-Powered Interview Preparation Platform',
    version: '2.0.0',
    supportEmail: 'support@nexusai.com'
};

export const ROUTES = {
    LANDING: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    RESUME_UPLOAD: '/resume',
    RESUME_ANALYZER: '/resume-analyzer',
    TECHNICAL: '/technical',
    HR_MODULE: '/hr-module',
    GD_ARENA: '/gd-arena',
    APTITUDE: '/aptitude',
    REPORTS: '/reports',
    SETTINGS: '/settings',
    PROFILE: '/profile',
    RESOURCES: '/resources',
    ACHIEVEMENTS: '/achievements',
    SCHEDULE: '/schedule'
};

export const DIFFICULTY_LEVELS = {
    EASY: { label: 'Easy', color: 'emerald', value: 'easy' },
    MEDIUM: { label: 'Medium', color: 'amber', value: 'medium' },
    HARD: { label: 'Hard', color: 'rose', value: 'hard' }
};

export const ASSESSMENT_CATEGORIES = {
    TECHNICAL: {
        label: 'Technical',
        icon: 'Code',
        color: 'indigo',
        topics: [
            'Data Structures',
            'Algorithms',
            'System Design',
            'Database Design',
            'API Design',
            'Security'
        ]
    },
    BEHAVIORAL: {
        label: 'Behavioral',
        icon: 'Users',
        color: 'purple',
        topics: [
            'Leadership',
            'Teamwork',
            'Conflict Resolution',
            'Time Management',
            'Communication',
            'Problem Solving'
        ]
    },
    APTITUDE: {
        label: 'Aptitude',
        icon: 'Brain',
        color: 'cyan',
        topics: [
            'Logical Reasoning',
            'Quantitative Aptitude',
            'Verbal Ability',
            'Data Interpretation'
        ]
    },
    GROUP_DISCUSSION: {
        label: 'Group Discussion',
        icon: 'MessageSquare',
        color: 'violet',
        topics: [
            'Current Affairs',
            'Technical Topics',
            'Abstract Topics',
            'Case Studies'
        ]
    }
};

export const PERFORMANCE_METRICS = {
    CONFIDENCE: 'confidence',
    COMMUNICATION: 'communication',
    TECHNICAL_ACCURACY: 'technical_accuracy',
    PROBLEM_SOLVING: 'problem_solving',
    TIME_MANAGEMENT: 'time_management',
    CLARITY: 'clarity'
};

export const ACHIEVEMENT_TIERS = {
    BRONZE: { min: 0, max: 25, color: 'orange', icon: '🥉' },
    SILVER: { min: 26, max: 50, color: 'gray', icon: '🥈' },
    GOLD: { min: 51, max: 75, color: 'yellow', icon: '🥇' },
    PLATINUM: { min: 76, max: 100, color: 'blue', icon: '💎' }
};

export const ACHIEVEMENTS = [
    {
        id: 'first_session',
        title: 'First Steps',
        description: 'Complete your first practice session',
        icon: '🎯',
        points: 10,
        category: 'milestone'
    },
    {
        id: 'week_streak',
        title: 'Consistent Learner',
        description: 'Practice for 7 consecutive days',
        icon: '🔥',
        points: 50,
        category: 'streak'
    },
    {
        id: 'perfect_score',
        title: 'Perfect Performance',
        description: 'Score 100% in any assessment',
        icon: '⭐',
        points: 100,
        category: 'performance'
    },
    {
        id: 'technical_master',
        title: 'Technical Wizard',
        description: 'Complete 50 technical assessments',
        icon: '🧙‍♂️',
        points: 200,
        category: 'mastery'
    },
    {
        id: 'communication_expert',
        title: 'Communication Expert',
        description: 'Score above 90% in 10 HR interviews',
        icon: '💬',
        points: 150,
        category: 'mastery'
    },
    {
        id: 'speed_demon',
        title: 'Speed Demon',
        description: 'Complete an assessment in record time',
        icon: '⚡',
        points: 75,
        category: 'performance'
    }
];

export const SESSION_TYPES = {
    PRACTICE: 'practice',
    MOCK: 'mock',
    ASSESSMENT: 'assessment',
    LIVE: 'live'
};

export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};

export const TIMER_PRESETS = {
    SHORT: { label: '5 min', seconds: 300 },
    MEDIUM: { label: '15 min', seconds: 900 },
    LONG: { label: '30 min', seconds: 1800 },
    INTERVIEW: { label: '45 min', seconds: 2700 },
    EXTENDED: { label: '60 min', seconds: 3600 }
};

export const VOICE_SETTINGS = {
    SPEECH_RATE: { min: 0.5, max: 2.0, default: 1.0 },
    PITCH: { min: 0, max: 2, default: 1 },
    VOLUME: { min: 0, max: 1, default: 1 }
};

export const SCORE_THRESHOLDS = {
    EXCELLENT: { min: 90, label: 'Excellent', color: 'emerald' },
    GOOD: { min: 75, label: 'Good', color: 'blue' },
    AVERAGE: { min: 60, label: 'Average', color: 'amber' },
    NEEDS_IMPROVEMENT: { min: 0, label: 'Needs Improvement', color: 'rose' }
};

export const RESUME_CRITERIA = {
    FORMAT: { weight: 0.15, label: 'Format & Structure' },
    CONTENT: { weight: 0.30, label: 'Content Quality' },
    KEYWORDS: { weight: 0.25, label: 'Keyword Optimization' },
    EXPERIENCE: { weight: 0.20, label: 'Experience Relevance' },
    SKILLS: { weight: 0.10, label: 'Skills Match' }
};

export const LOCAL_STORAGE_KEYS = {
    USER_SESSION: 'nexusai_session',
    USER_PREFERENCES: 'nexusai_preferences',
    RECENT_SEARCHES: 'nexusai_recent_searches',
    ACHIEVEMENT_PROGRESS: 'nexusai_achievements',
    THEME: 'nexusai_theme'
};

export const API_ENDPOINTS = {
    // Placeholder for when backend is integrated
    ANALYZE_RESUME: '/api/analyze-resume',
    GENERATE_QUESTION: '/api/generate-question',
    SUBMIT_ANSWER: '/api/submit-answer',
    GET_FEEDBACK: '/api/get-feedback',
    SAVE_SESSION: '/api/save-session',
    GET_ANALYTICS: '/api/get-analytics'
};

export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
    SESSION_EXPIRED: 'Your session has expired. Please login again.',
    INVALID_INPUT: 'Invalid input. Please check your data and try again.',
    UPLOAD_FAILED: 'File upload failed. Please try again.',
    MICROPHONE_ERROR: 'Could not access microphone. Please check permissions.',
    GENERIC_ERROR: 'Something went wrong. Please try again later.'
};

export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Welcome back! Logged in successfully.',
    LOGOUT_SUCCESS: 'Logged out successfully.',
    PROFILE_UPDATED: 'Profile updated successfully.',
    ASSESSMENT_COMPLETED: 'Assessment completed! Check your results.',
    RESUME_UPLOADED: 'Resume uploaded and analyzed successfully.'
};
