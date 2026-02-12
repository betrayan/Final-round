import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from './ToastContext';

const AssessmentContext = createContext();

export const useAssessment = () => {
    return useContext(AssessmentContext);
};

export const AssessmentProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { showToast } = useToast();

    // Steps definition
    // Steps definition
    const steps = [
        { id: 'aptitude', path: '/aptitude', label: 'Aptitude Test' },
        { id: 'technical', path: '/technical', label: 'Technical Assessment' },
        { id: 'gd', path: '/gd-arena', label: 'Group Discussion' },
        { id: 'hr', path: '/hr-module', label: 'Face to Face (HR)' }
    ];

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);

    // Resume suggestions for the report
    const [resumeSuggestions, setResumeSuggestions] = useState([]);

    const [jobRole, setJobRoleState] = useState(localStorage.getItem('nexus_job_role') || '');
    const [assessmentMode, setAssessmentMode] = useState(localStorage.getItem('nexus_assessment_mode') || 'sequence');

    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isCongratsModalOpen, setIsCongratsModalOpen] = useState(false);
    const [nextRoundPath, setNextRoundPath] = useState(null);

    useEffect(() => {
        // Recover state from local storage if needed
        const savedStep = localStorage.getItem('nexus_current_step_index');
        const savedCompleted = JSON.parse(localStorage.getItem('nexus_completed_steps') || '[]');

        if (savedStep) setCurrentStepIndex(parseInt(savedStep));
        if (savedCompleted.length > 0) setCompletedSteps(savedCompleted);
    }, []);

    const startAssessment = (role, mode = 'sequence', targetPath = '/aptitude') => {
        setJobRoleState(role);
        setAssessmentMode(mode);

        localStorage.setItem('nexus_job_role', role);
        localStorage.setItem('nexus_assessment_mode', mode);

        setIsRoleModalOpen(false);
        showToast(`Role: ${role} | Mode: ${mode === 'sequence' ? 'Full Assessment' : 'Practice'}`, 'success');

        if (mode === 'sequence') {
            navigate('/aptitude');
            setCurrentStepIndex(0);
            localStorage.setItem('nexus_current_step_index', 0);
        } else {
            if (targetPath) navigate(targetPath);
        }
    };

    const cancelAssessment = () => {
        setJobRoleState('');
        setAssessmentMode('sequence');
        setCurrentStepIndex(0);
        setCompletedSteps([]);

        localStorage.removeItem('nexus_job_role');
        localStorage.removeItem('nexus_assessment_mode');
        localStorage.removeItem('nexus_current_step_index');
        localStorage.removeItem('nexus_completed_steps');

        navigate('/reports');
        showToast('Assessment cancelled. Progress reset.', 'info');
    };

    const completeStep = (stepId, suggestions = []) => {
        if (!completedSteps.includes(stepId)) {
            const newCompleted = [...completedSteps, stepId];
            setCompletedSteps(newCompleted);
            localStorage.setItem('nexus_completed_steps', JSON.stringify(newCompleted));

            // Add resume suggestions if any
            if (suggestions.length > 0) {
                setResumeSuggestions(prev => [...prev, ...suggestions]);
            }

            // Check if there is a next step
            if (assessmentMode === 'sequence' && currentStepIndex < steps.length - 1) {
                setNextRoundPath(steps[currentStepIndex + 1].path);
                setIsCongratsModalOpen(true);
            } else if (assessmentMode === 'standalone') {
                // Standalone completion logic
                showToast('Round completed successfully!', 'success');
                setIsCongratsModalOpen(true); // Still show congrats but simple one
                setNextRoundPath(null);
            } else {
                showToast('All rounds completed! Redirecting to dashboard...', 'success');
                setTimeout(() => navigate('/reports'), 2000);
            }
        }
    };

    const moveToNextRound = () => {
        setIsCongratsModalOpen(false);
        const nextIndex = currentStepIndex + 1;
        setCurrentStepIndex(nextIndex);
        localStorage.setItem('nexus_current_step_index', nextIndex);

        if (nextRoundPath) {
            navigate(nextRoundPath);
        }
    };

    const checkAssessmentAccess = (path) => {
        // If it's a non-assessment page, allow access
        const step = steps.find(s => s.path === path);
        if (!step) return true;

        const currentRole = jobRole || localStorage.getItem('nexus_job_role');
        const currentMode = assessmentMode || localStorage.getItem('nexus_assessment_mode');

        // If no assessment started, allow browsing without restrictions
        if (!currentRole) {
            return true;
        }

        // If standalone, allow access to any assessment page
        if (currentMode === 'standalone') {
            return true;
        }

        // Sequence logic enforcement
        const stepIndex = steps.findIndex(s => s.path === path);
        if (stepIndex > currentStepIndex) {
            showToast(`Please complete the ${steps[currentStepIndex].label} first.`, 'error');
            navigate(steps[currentStepIndex].path);
            return false;
        }

        return true;
    };

    const value = {
        currentStep: steps[currentStepIndex],
        completedSteps,
        jobRole,
        assessmentMode,
        startAssessment,
        cancelAssessment,
        isRoleModalOpen,
        setIsRoleModalOpen,
        isCongratsModalOpen,
        setIsCongratsModalOpen,
        completeStep,
        moveToNextRound,
        checkAssessmentAccess,
        resumeSuggestions,
        addResumeSuggestions: (suggestions) => setResumeSuggestions(prev => [...prev, ...suggestions])
    };

    return (
        <AssessmentContext.Provider value={value}>
            {children}
        </AssessmentContext.Provider>
    );
};
