import React, { useState, useEffect, useCallback } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { ArrowLeft, ArrowRight, CheckCircle, Timer, Sparkles, Zap, AlertTriangle, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimer } from '../hooks/useTimer';
import { useProctoring } from '../hooks/useProctoring';

const MOCK_QUESTIONS = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    question: `Sample Question ${i + 1}: What is the logical output of sequence ${i + 1}, ${i * 2}, ${i * 3}?`,
    difficulty: i % 3 === 0 ? 'Hard' : i % 2 === 0 ? 'Medium' : 'Easy',
    options: [
        { id: 'A', text: `Option A for Q${i + 1}` },
        { id: 'B', text: `Option B for Q${i + 1}` },
        { id: 'C', text: `Option C for Q${i + 1}` },
        { id: 'D', text: `Option D for Q${i + 1}` }
    ]
}));

const AptitudeTest = () => {
    const { checkAssessmentAccess, completeStep, cancelAssessment } = useAssessment();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    // Auto submit on violation
    const handleViolation = useCallback(() => {
        completeStep('aptitude', ['Review strict assessment guidelines', 'Focus management']);
    }, [completeStep]);

    const { warnings, startCamera, stopCamera } = useProctoring(handleViolation);

    const { formattedTime, start, stop, isRunning } = useTimer(1200, () => {
        // Time over
        handleSubmitTest();
    });

    useEffect(() => {
        const hasAccess = checkAssessmentAccess('/aptitude');
        if (hasAccess) {
            startCamera();
            setIsStarted(true);
            start();
        }
        return () => {
            stopCamera();
            stop();
        };
    }, []);

    const handleOptionSelect = (optionId) => {
        setAnswers(prev => ({ ...prev, [currentQuestion]: optionId }));
    };

    const handleNext = () => {
        if (currentQuestion < MOCK_QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setShowConfirmModal(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel the assessment? All progress will be lost.")) {
            cancelAssessment();
        }
    };

    const handleSubmitTest = () => {
        // Calculate score or just submit
        const suggestions = ["Improve speed in Quantitative aptitude", "Review logical reasoning concepts"];
        completeStep('aptitude', suggestions);
    };

    const progressPercentage = ((currentQuestion + 1) / MOCK_QUESTIONS.length) * 100;
    const currentQ = MOCK_QUESTIONS[currentQuestion];


    return (
        <motion.div
            className="h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <header className="mb-4 sm:mb-5 md:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                <div>
                    <motion.h2
                        className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 flex items-center gap-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Zap size={20} className="sm:w-6 sm:h-6" />
                        Aptitude Lab
                    </motion.h2>
                    <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-2 mt-1">
                        <Sparkles size={14} className="text-fuchsia-400" />
                        Quantitative Reasoning • 20 Questions
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {warnings > 0 && (
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold animate-pulse px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                            <AlertTriangle size={14} />
                            Warning {warnings}/3
                        </div>
                    )}
                    <button onClick={handleCancel} className="text-xs text-rose-400 hover:text-rose-300 font-medium px-3 py-2 hover:bg-rose-500/10 rounded-lg border border-transparent hover:border-rose-500/20 transition-all">
                        Cancel/Drop Out
                    </button>
                    <motion.div
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 glass-panel border border-violet-500/30 text-violet-400 rounded-xl font-mono text-base sm:text-lg font-bold shadow-lg shadow-violet-500/20 w-full sm:w-auto justify-center"
                        animate={{
                            boxShadow: [
                                "0 0 20px rgba(139, 92, 246, 0.2)",
                                "0 0 30px rgba(139, 92, 246, 0.4)",
                                "0 0 20px rgba(139, 92, 246, 0.2)",
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Timer size={18} className="sm:w-5 sm:h-5 animate-pulse" />
                        {formattedTime}
                    </motion.div>
                </div>
            </header>

            {/* Question Card */}
            <motion.div
                key={currentQuestion}
                className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 mb-5 sm:mb-6 relative overflow-hidden group min-h-[400px] flex flex-col"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex justify-between items-start mb-4 sm:mb-5 relative z-10">
                    <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Question {currentQ.id} / {MOCK_QUESTIONS.length}
                    </span>
                    <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-bold border ${currentQ.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                        currentQ.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                            'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                        {currentQ.difficulty}
                    </span>
                </div>

                <h3 className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed mb-5 sm:mb-6 relative z-10 flex-grow">
                    {currentQ.question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 relative z-10">
                    {currentQ.options.map(opt => (
                        <Option
                            key={opt.id}
                            label={opt.id}
                            text={opt.text}
                            selected={answers[currentQuestion] === opt.id}
                            onClick={() => handleOptionSelect(opt.id)}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
                <motion.button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className={`px-4 sm:px-5 py-2.5 sm:py-3 text-sm rounded-xl glass-panel text-white font-bold flex items-center justify-center gap-2 border border-white/10 transition-all shadow-lg touch-manipulation w-full sm:w-auto ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
                    whileHover={currentQuestion !== 0 ? { x: -3, scale: 1.02 } : {}}
                    whileTap={currentQuestion !== 0 ? { scale: 0.98 } : {}}
                >
                    <ArrowLeft size={16} /> Previous
                </motion.button>
                <motion.button
                    onClick={handleNext}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 text-sm rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-violet-500/50 border border-white/10 touch-manipulation w-full sm:w-auto"
                    whileHover={{ x: 3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {currentQuestion === MOCK_QUESTIONS.length - 1 ? 'Complete Test' : 'Next'} <ArrowRight size={16} />
                </motion.button>
            </div>

            {/* Progress */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <div className="flex justify-between text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                        <Sparkles size={12} className="text-emerald-400" />
                        Progress
                    </span>
                    <span className="font-bold text-emerald-400">{Math.round(progressPercentage)}% Completed</span>
                </div>
                <div className="h-2 glass-panel rounded-full overflow-hidden border border-white/10">
                    <motion.div
                        className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 relative overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </motion.div>
                </div>
            </motion.div>
            <AnimatePresence>
                {showConfirmModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden text-center"
                        >
                            <h3 className="text-xl font-bold text-white mb-2">Confirm Submission</h3>
                            <p className="text-slate-400 text-sm mb-6">
                                Are you sure you want to complete the test? You cannot change your answers after submission.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors text-sm font-bold"
                                >
                                    Review
                                </button>
                                <button
                                    onClick={handleSubmitTest}
                                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/20 transition-all text-sm font-bold"
                                >
                                    Submit
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Option = ({ label, text, selected, onClick }) => (
    <motion.button
        onClick={onClick}
        className={`p-4 rounded-xl border flex items-center gap-3 transition-all text-left relative overflow-hidden group ${selected
            ? 'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border-violet-500/50 text-white shadow-lg shadow-violet-500/20'
            : 'glass-panel border-white/10 text-slate-300 hover:bg-white/5 hover:border-white/20'
            }`}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
    >
        {/* Glow Effect for selected */}
        {selected && (
            <div className="absolute inset-0 bg-gradient-to-br from-violet-400/10 to-fuchsia-400/10 animate-pulse-glow" />
        )}

        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold relative z-10 ${selected
            ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg'
            : 'bg-white/10 text-slate-400 group-hover:bg-white/15'
            }`}>
            {label}
        </span>
        <span className="font-medium text-sm relative z-10">{text}</span>
        {selected && (
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="ml-auto text-violet-400 relative z-10"
            >
                <CheckCircle size={18} />
            </motion.div>
        )}
    </motion.button>
)

export default AptitudeTest;

