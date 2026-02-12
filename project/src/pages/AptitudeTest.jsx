import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { ArrowLeft, ArrowRight, CheckCircle, Timer, Sparkles, Zap, AlertTriangle, Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimer } from '../hooks/useTimer';
import { useProctoring } from '../hooks/useProctoring';

const QUESTIONS_BY_ROLE = {
    'Frontend Dev': [
        {
            id: 1,
            question: "What is the time complexity of searching for an element in a balanced Binary Search Tree (BST)?",
            difficulty: 'Medium',
            options: [
                { id: 'A', text: "O(n)" },
                { id: 'B', text: "O(log n)" },
                { id: 'C', text: "O(n log n)" },
                { id: 'D', text: "O(1)" }
            ]
        },
        {
            id: 2,
            question: "Which CSS property computes the size of the box including the border and padding?",
            difficulty: 'Easy',
            options: [
                { id: 'A', text: "box-sizing: content-box" },
                { id: 'B', text: "box-sizing: border-box" },
                { id: 'C', text: "box-model: border-box" },
                { id: 'D', text: "display: block" }
            ]
        },
        {
            id: 3,
            question: "What will be the output of `console.log(typeof NaN)` in JavaScript?",
            difficulty: 'Medium',
            options: [
                { id: 'A', text: "'number'" },
                { id: 'B', text: "'NaN'" },
                { id: 'C', text: "'undefined'" },
                { id: 'D', text: "'object'" }
            ]
        },
        {
            id: 4,
            question: "In React, what is the primary purpose of the `useEffect` hook?",
            difficulty: 'Easy',
            options: [
                { id: 'A', text: "To handle state changes" },
                { id: 'B', text: "To perform side effects in function components" },
                { id: 'C', text: "To create a Redux store" },
                { id: 'D', text: "To optimize rendering speed" }
            ]
        },
        {
            id: 5,
            question: "Which of the following is NOT a JavaScript data type?",
            difficulty: 'Easy',
            options: [
                { id: 'A', text: "Boolean" },
                { id: 'B', text: "Undefined" },
                { id: 'C', text: "Float" },
                { id: 'D', text: "Symbol" }
            ]
        },
        {
            id: 6,
            question: "What does the 'Z' index property control in CSS?",
            difficulty: 'Medium',
            options: [
                { id: 'A', text: "Horizontal positioning" },
                { id: 'B', text: "Vertical stacking order" },
                { id: 'C', text: "Zoom level" },
                { id: 'D', text: "Opacity" }
            ]
        },
        {
            id: 7,
            question: "Explain the closure concept in JavaScript.",
            difficulty: 'Hard',
            options: [
                { id: 'A', text: "A function having access to its own scope only" },
                { id: 'B', text: "A function bundled with its lexical environment" },
                { id: 'C', text: "A method to close a browser window" },
                { id: 'D', text: "A callback function" }
            ]
        },
        {
            id: 8,
            question: "Which HTTP method is idempotent?",
            difficulty: 'Medium',
            options: [
                { id: 'A', text: "POST" },
                { id: 'B', text: "PUT" },
                { id: 'C', text: "PATCH" },
                { id: 'D', text: "CONNECT" }
            ]
        },
        {
            id: 9,
            question: "What is the default behavior of `event.preventDefault()`?",
            difficulty: 'Easy',
            options: [
                { id: 'A', text: "Stops event propagation" },
                { id: 'B', text: "Prevents the browser's default action for the event" },
                { id: 'C', text: "Refreshes the page" },
                { id: 'D', text: "Closes the modal" }
            ]
        },
        {
            id: 10,
            question: "Identify the correct way to merge two arrays in ES6.",
            difficulty: 'Easy',
            options: [
                { id: 'A', text: "[...arr1, ...arr2]" },
                { id: 'B', text: "arr1.merge(arr2)" },
                { id: 'C', text: "arr1 + arr2" },
                { id: 'D', text: "Array.combine(arr1, arr2)" }
            ]
        }
    ],
    'default': Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        question: `General Aptitude Q${i + 1}: Check the logical consistency of sequence ${i + 2}, ${i * 3}, ${i * 4}`,
        difficulty: i % 3 === 0 ? 'Hard' : i % 2 === 0 ? 'Medium' : 'Easy',
        options: [
            { id: 'A', text: `Logical inference A` },
            { id: 'B', text: `Logical inference B` },
            { id: 'C', text: `Logical inference C` },
            { id: 'D', text: `Logical inference D` }
        ]
    }))
};

const AptitudeTest = () => {
    const { checkAssessmentAccess, completeStep, cancelAssessment, jobRole } = useAssessment();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    const questions = useMemo(() => {
        return QUESTIONS_BY_ROLE[jobRole] || QUESTIONS_BY_ROLE['default'];
    }, [jobRole]);

    // Auto submit on violation
    const handleViolation = useCallback(() => {
        completeStep('aptitude', ['Review strict assessment guidelines', 'Focus management']);
    }, [completeStep]);

    const { warnings, startCamera, stopCamera } = useProctoring(handleViolation);

    const { formattedTime, start, stop } = useTimer(1200, () => {
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

    const handleNext = useCallback(() => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setShowConfirmModal(true);
        }
    }, [currentQuestion, questions.length]);

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

    const handleSubmitTest = useCallback(() => {
        const suggestions = ["Improve speed in Quantitative aptitude", "Review logical reasoning concepts"];
        completeStep('aptitude', suggestions);
    }, [completeStep]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                if (showConfirmModal) {
                    handleSubmitTest();
                } else {
                    handleNext();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showConfirmModal, handleNext, handleSubmitTest]);

    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    const currentQ = questions[currentQuestion];

    return (
        <motion.div
            className="min-h-[calc(100vh-4rem)] text-white px-4 md:px-8 py-6 max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header Section */}
            <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 mb-2"
                    >
                        <div className="p-2 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg shadow-lg shadow-violet-500/20">
                            <Zap className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 tracking-tight">
                            Aptitude Lab
                        </h2>
                    </motion.div>
                    <p className="text-slate-400 flex items-center gap-2 font-medium">
                        <Sparkles size={16} className="text-fuchsia-400" />
                        Quantitative Reasoning • {questions.length} Questions
                    </p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto self-end md:self-auto">
                    {warnings > 0 && (
                        <div className="flex items-center gap-2 text-amber-400 text-sm font-bold px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl animate-pulse">
                            <AlertTriangle size={16} />
                            <span>Warning {warnings}/3</span>
                        </div>
                    )}

                    <motion.div
                        className="flex items-center gap-3 px-5 py-3 glass-panel border-violet-500/30 text-violet-300 rounded-2xl font-mono text-xl font-bold tracking-widest shadow-xl shadow-violet-900/20"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Timer size={22} className="text-fuchsia-400 animate-pulse" />
                        {formattedTime}
                    </motion.div>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Question Area */}
                <div className="lg:col-span-8 space-y-6">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="glass-card rounded-3xl p-6 md:p-10 relative overflow-hidden group min-h-[500px] flex flex-col justify-between"
                        >
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/10 blur-[100px] rounded-full pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-8 h-0.5 bg-slate-700"></span>
                                        Question {currentQ.id < 10 ? `0${currentQ.id}` : currentQ.id}
                                    </span>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 ${currentQ.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-rose-900/20' :
                                        currentQ.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-900/20' :
                                            'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-900/20'
                                        } shadow-lg backdrop-blur-md`}>
                                        <span className={`w-2 h-2 rounded-full ${currentQ.difficulty === 'Hard' ? 'bg-rose-500' :
                                            currentQ.difficulty === 'Medium' ? 'bg-amber-500' :
                                                'bg-emerald-500'
                                            } animate-pulse`} />
                                        {currentQ.difficulty}
                                    </span>
                                </div>

                                <h3 className="text-2xl md:text-3xl text-white font-medium leading-relaxed mb-8">
                                    {currentQ.question}
                                </h3>

                                <div className="grid grid-cols-1 gap-4">
                                    {currentQ.options.map((opt, idx) => (
                                        <Option
                                            key={opt.id}
                                            label={opt.id}
                                            text={opt.text}
                                            index={idx}
                                            selected={answers[currentQuestion] === opt.id}
                                            onClick={() => handleOptionSelect(opt.id)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Keyboard Hint */}
                            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs text-slate-500 relative z-10">
                                <div className="flex items-center gap-2">
                                    <Keyboard size={14} />
                                    <span>Press <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-slate-300">Enter</kbd> for next</span>
                                </div>
                                <span>{currentQuestion === questions.length - 1 ? 'Last Question' : 'Next Question'}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Sidebar / Controls */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Progress Card */}
                    <div className="glass-panel rounded-3xl p-6 md:p-8">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Sparkles size={18} className="text-emerald-400" />
                            Your Progress
                        </h4>

                        <div className="mb-2 flex justify-between text-sm font-medium">
                            <span className="text-slate-400">Completed</span>
                            <span className="text-emerald-400">{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="h-3 bg-slate-800/50 rounded-full overflow-hidden border border-white/5 p-0.5">
                            <motion.div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full relative overflow-hidden"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                            </motion.div>
                        </div>
                        <p className="text-xs text-slate-500 mt-4 text-center">
                            {answers[currentQuestion] ? "Answer selected" : "Select an answer to proceed"}
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <motion.button
                            onClick={handlePrevious}
                            disabled={currentQuestion === 0}
                            className={`p-4 rounded-2xl font-bold flex flex-col items-center justify-center gap-2 border transition-all ${currentQuestion === 0
                                ? 'border-white/5 text-slate-600 cursor-not-allowed bg-white/5'
                                : 'glass-panel border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                                }`}
                            whileHover={currentQuestion !== 0 ? { y: -2 } : {}}
                            whileTap={currentQuestion !== 0 ? { scale: 0.98 } : {}}
                        >
                            <ArrowLeft size={20} />
                            Previous
                        </motion.button>

                        <motion.button
                            onClick={handleNext}
                            className={`p-4 rounded-2xl font-bold flex flex-col items-center justify-center gap-2 border transition-all relative overflow-hidden ${currentQuestion === questions.length - 1
                                ? 'bg-gradient-to-br from-emerald-600 to-teal-600 border-emerald-500/50 text-white shadow-lg shadow-emerald-900/20'
                                : 'bg-gradient-to-br from-violet-600 to-fuchsia-600 border-violet-500/50 text-white shadow-lg shadow-violet-900/20'
                                }`}
                            whileHover={{ y: -2, brightness: 1.1 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                            <div className="flex flex-col items-center gap-2 relative z-10">
                                {currentQuestion === questions.length - 1 ? <CheckCircle size={20} /> : <ArrowRight size={20} />}
                                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                            </div>
                        </motion.button>
                    </div>

                    <button
                        onClick={handleCancel}
                        className="w-full py-4 text-rose-400 hover:text-rose-300 text-sm font-medium hover:bg-rose-500/10 rounded-2xl border border-transparent hover:border-rose-500/20 transition-all"
                    >
                        Cancel Assessment
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {showConfirmModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-slate-900 md:bg-gradient-to-b md:from-slate-900 md:to-slate-950 border border-slate-700/80 rounded-3xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden text-center"
                        >
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500" />

                            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
                                <CheckCircle size={32} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3">Ready to Submit?</h3>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                You have answered <span className="text-emerald-400 font-bold">{Object.keys(answers).length}</span> out of <span className="text-white font-bold">{questions.length}</span> questions.
                                <br />Verify your answers before final submission.
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="flex-1 py-3.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-all font-bold"
                                >
                                    Review Answers
                                </button>
                                <button
                                    onClick={handleSubmitTest}
                                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 transition-all font-bold"
                                >
                                    Submit Test
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Option = ({ label, text, index, selected, onClick }) => (
    <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        onClick={onClick}
        className={`w-full p-4 md:p-5 rounded-2xl flex items-center gap-4 transition-all text-left relative overflow-hidden group border-2 ${selected
            ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10'
            : 'border-transparent bg-slate-800/40 hover:bg-slate-800/60 hover:border-white/10'
            }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
    >
        <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-inner transition-colors ${selected
            ? 'bg-violet-500 text-white shadow-violet-600/50'
            : 'bg-slate-700/50 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'
            }`}>
            {label}
        </span>

        <span className={`font-medium text-base md:text-lg flex-grow transition-colors ${selected ? 'text-white' : 'text-slate-300 group-hover:text-white'
            }`}>
            {text}
        </span>

        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selected
            ? 'border-violet-500 bg-violet-500 text-white'
            : 'border-slate-600 group-hover:border-slate-500'
            }`}>
            {selected && <CheckCircle size={14} />}
        </div>
    </motion.button>
);

export default AptitudeTest;
