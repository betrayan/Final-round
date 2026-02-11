import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ACHIEVEMENTS } from '../constants';

const GlobalContext = createContext();

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [sessionID, setSessionID] = useState(null);

    const [currentScore, setCurrentScore] = useState({
        technical: 0,
        communication: 0,
        confidence: 0,
        problemSolving: 0
    });

    const [resumeData, setResumeData] = useState(null);

    // Achievement tracking
    const [achievements, setAchievements] = useLocalStorage('nexusai_achievements', []);

    // Session history
    const [sessionsHistory, setSessionsHistory] = useLocalStorage('nexusai_sessions', []);

    // User preferences
    const [preferences, setPreferences] = useLocalStorage('nexusai_preferences', {
        theme: 'dark',
        notifications: true,
        voiceSpeed: 1.0,
        autoSave: true
    });

    // Stats
    const [stats, setStats] = useState({
        totalSessions: 142,
        studyHours: 42.5,
        avgScore: 82,
        currentStreak: 7
    });

    const login = (email, password) => {
        // Mock Login Logic - Replace with real API call
        setUser({
            name: 'Alex Johnson',
            email,
            avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alex',
            joinedDate: new Date('2024-01-15'),
            plan: 'pro'
        });
        setIsAuthenticated(true);
        setSessionID(`SES-${Math.floor(Math.random() * 10000)}`);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setSessionID(null);
        setResumeData(null);
    };

    const uploadResume = (data) => {
        setResumeData(data);
        // Update initial base scores based on resume quality
        if (data.totalScore) {
            setCurrentScore(prev => ({
                ...prev,
                technical: data.totalScore
            }));
        }
    };

    const updateScore = (category, value) => {
        setCurrentScore(prev => ({
            ...prev,
            [category]: Math.min(100, Math.max(0, prev[category] + value))
        }));
    };

    const addSession = (sessionData) => {
        const newSession = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...sessionData
        };
        setSessionsHistory(prev => [newSession, ...prev].slice(0, 100)); // Keep last 100 sessions

        // Update stats
        setStats(prev => ({
            ...prev,
            totalSessions: prev.totalSessions + 1,
            studyHours: prev.studyHours + (sessionData.duration || 0) / 3600
        }));

        // Check for achievements
        checkAchievements(newSession);
    };

    const checkAchievements = (session) => {
        // Check if user earned any new achievements
        const newAchievements = [];

        // First session
        if (stats.totalSessions === 0 && !achievements.includes('first_session')) {
            newAchievements.push('first_session');
        }

        // Perfect score
        if (session.score === 100 && !achievements.includes('perfect_score')) {
            newAchievements.push('perfect_score');
        }

        // Week streak
        if (stats.currentStreak >= 7 && !achievements.includes('week_streak')) {
            newAchievements.push('week_streak');
        }

        // Technical master (50+ technical assessments)
        const technicalCount = sessionsHistory.filter(s => s.type === 'technical').length;
        if (technicalCount >= 50 && !achievements.includes('technical_master')) {
            newAchievements.push('technical_master');
        }

        if (newAchievements.length > 0) {
            setAchievements(prev => [...new Set([...prev, ...newAchievements])]);
            // Trigger notification for earned achievements
            return newAchievements;
        }

        return [];
    };

    const updatePreferences = (newPreferences) => {
        setPreferences(prev => ({ ...prev, ...newPreferences }));
    };

    const getAchievementProgress = () => {
        const totalAchievements = ACHIEVEMENTS.length;
        const earnedAchievements = achievements.length;
        const progress = (earnedAchievements / totalAchievements) * 100;
        return {
            total: totalAchievements,
            earned: earnedAchievements,
            progress: Math.round(progress)
        };
    };

    return (
        <GlobalContext.Provider value={{
            // User & Auth
            user,
            isAuthenticated,
            sessionID,
            login,
            logout,

            // Scores & Progress
            currentScore,
            updateScore,
            stats,

            // Resume
            resumeData,
            uploadResume,

            // Sessions
            sessionsHistory,
            addSession,

            // Achievements
            achievements,
            checkAchievements,
            getAchievementProgress,

            // Preferences
            preferences,
            updatePreferences
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
