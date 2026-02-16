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

    // Available Rounds Definition
    const AVAILABLE_ROUNDS = [
        { id: 'aptitude', path: '/aptitude', label: 'Aptitude Test' },
        { id: 'technical', path: '/technical', label: 'Technical Assessment' },
        { id: 'gd', path: '/gd-arena', label: 'Group Discussion' },
        { id: 'hr', path: '/hr-module', label: 'Face to Face (HR)' }
    ];

    const [activeSteps, setActiveSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);

    // Resume suggestions for the report
    const [resumeSuggestions, setResumeSuggestions] = useState([]);

    const [jobRole, setJobRoleState] = useState(localStorage.getItem('nexus_job_role') || '');
    const [examName, setExamNameState] = useState(localStorage.getItem('nexus_exam_name') || '');

    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isCongratsModalOpen, setIsCongratsModalOpen] = useState(false);
    const [nextRoundPath, setNextRoundPath] = useState(null);

    useEffect(() => {
        // Recover state from local storage if needed
        const savedStep = localStorage.getItem('nexus_current_step_index');
        const savedCompleted = JSON.parse(localStorage.getItem('nexus_completed_steps') || '[]');
        const savedActiveSteps = JSON.parse(localStorage.getItem('nexus_active_steps') || '[]');
        const savedExamName = localStorage.getItem('nexus_exam_name');

        if (savedStep) setCurrentStepIndex(parseInt(savedStep));
        if (savedCompleted.length > 0) setCompletedSteps(savedCompleted);
        if (savedActiveSteps.length > 0) setActiveSteps(savedActiveSteps);
        if (savedExamName) setExamNameState(savedExamName);
    }, []);

    const startAssessment = (role, examName, selectedRoundIds) => {
        setJobRoleState(role);
        setExamNameState(examName);

        // Build the schedule based on selection order
        // If selectedRoundIds is not provided or empty, default to all rounds? 
        // Or assume the caller always provides valid IDs. 
        // Let's assume the caller provides valid IDs.

        let newActiveSteps = [];
        if (selectedRoundIds && selectedRoundIds.length > 0) {
            newActiveSteps = selectedRoundIds.map(id => AVAILABLE_ROUNDS.find(r => r.id === id)).filter(Boolean);
        } else {
            // Fallback to all rounds if none selected (should be handled by UI though)
            newActiveSteps = AVAILABLE_ROUNDS;
        }

        setActiveSteps(newActiveSteps);

        localStorage.setItem('nexus_job_role', role);
        localStorage.setItem('nexus_exam_name', examName);
        localStorage.setItem('nexus_active_steps', JSON.stringify(newActiveSteps));

        // Reset Progress
        setCurrentStepIndex(0);
        setCompletedSteps([]);
        localStorage.setItem('nexus_current_step_index', 0);
        localStorage.setItem('nexus_completed_steps', '[]');

        setIsRoleModalOpen(false);
        showToast(`Session Started: ${examName}`, 'success');

        if (newActiveSteps.length > 0) {
            navigate(newActiveSteps[0].path);
        }
    };

    const cancelAssessment = () => {
        setJobRoleState('');
        setExamNameState('');
        setActiveSteps([]);
        setCurrentStepIndex(0);
        setCompletedSteps([]);

        localStorage.removeItem('nexus_job_role');
        localStorage.removeItem('nexus_exam_name');
        localStorage.removeItem('nexus_active_steps');
        localStorage.removeItem('nexus_current_step_index');
        localStorage.removeItem('nexus_completed_steps');

        navigate('/reports');
        showToast('Assessment cancelled. Progress reset.', 'info');
    };

    const completeStep = (stepId, suggestions = []) => {
        // Logic: Add to completed. Check next in activeSteps.
        if (!completedSteps.includes(stepId)) {
            const newCompleted = [...completedSteps, stepId];
            setCompletedSteps(newCompleted);
            localStorage.setItem('nexus_completed_steps', JSON.stringify(newCompleted));

            // Add resume suggestions if any
            if (suggestions.length > 0) {
                setResumeSuggestions(prev => [...prev, ...suggestions]);
            }

            // Check if there is a next step
            if (currentStepIndex < activeSteps.length - 1) {
                setNextRoundPath(activeSteps[currentStepIndex + 1].path);
                setIsCongratsModalOpen(true);
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

        if (nextIndex < activeSteps.length) {
            navigate(activeSteps[nextIndex].path);
        }
    };

    const checkAssessmentAccess = (path) => {
        // If no active assessment steps, lax check
        if (activeSteps.length === 0) return true;

        // Find if path is in active steps
        const stepIndex = activeSteps.findIndex(s => s.path === path);

        // If not in active steps, user shouldn't be here ideally during an exam
        if (stepIndex === -1) {
            // Optional: Redirect to current step if stricly enforcing
            // navigate(activeSteps[currentStepIndex].path);
            return true;
        }

        const currentRole = jobRole || localStorage.getItem('nexus_job_role');

        if (!currentRole) {
            return true;
        }

        // Sequence logic enforcement
        if (stepIndex > currentStepIndex) {
            showToast(`Please complete the ${activeSteps[currentStepIndex].label} first.`, 'error');
            navigate(activeSteps[currentStepIndex].path);
            return false;
        }

        return true;
    };

    const value = {
        currentStep: activeSteps[currentStepIndex] || {}, // Fallback empty object
        activeSteps, // Expose active steps
        completedSteps,
        jobRole,
        // assessmentMode removed/deprecated in favor of activeSteps
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
