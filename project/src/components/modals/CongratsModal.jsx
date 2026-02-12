import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Timer, Zap } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';

const CongratsModal = () => {
    const { isCongratsModalOpen, moveToNextRound, assessmentMode, setIsCongratsModalOpen } = useAssessment();
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (isCongratsModalOpen) {
            setTimeLeft(30);
        }
    }, [isCongratsModalOpen]);

    useEffect(() => {
        if (!isCongratsModalOpen || assessmentMode !== 'sequence') return;

        if (timeLeft === 0) {
            moveToNextRound();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [isCongratsModalOpen, timeLeft, assessmentMode, moveToNextRound]);

    if (!isCongratsModalOpen) return null;

    return (
        <AnimatePresence>
            {isCongratsModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", bounce: 0.3 }}
                        className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden text-center"
                    >
                        {/* Confetti Effect Simulation */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                        </div>

                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-emerald-500/20">
                            <CheckCircle size={32} className="text-emerald-500" />
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2">
                            Great Job!
                        </h2>

                        <p className="text-slate-400 text-sm mb-6 px-4 leading-relaxed">
                            {assessmentMode === 'sequence'
                                ? "You smashed this round! Take a deep breath. The next challenge begins in..."
                                : "You have successfully completed this practice round. Outstanding performance!"}
                        </p>

                        {assessmentMode === 'sequence' && (
                            <div className="mb-6 flex justify-center">
                                <div className="flex items-center gap-3 px-4 py-2 bg-slate-800 rounded-xl border border-slate-700">
                                    <Timer size={18} className="text-emerald-400 animate-pulse" />
                                    <span className="text-2xl font-mono font-bold text-white">
                                        00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                                    </span>
                                </div>
                            </div>
                        )}

                        {assessmentMode === 'sequence' && (
                            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3 mb-6 text-xs text-emerald-400/80">
                                <strong className="block text-emerald-400 mb-1 flex items-center justify-center gap-1">
                                    <Zap size={12} /> Next Round Note:
                                </strong>
                                Stay focused. Speed and accuracy are key.
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={assessmentMode === 'sequence' ? moveToNextRound : () => setIsCongratsModalOpen(false)}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 text-sm active:scale-[0.98]"
                            >
                                {assessmentMode === 'sequence' ? (
                                    <>Skip Timer & Start Next <ArrowRight size={18} /></>
                                ) : (
                                    "Close & Stay Here"
                                )}
                            </button>

                            {assessmentMode === 'sequence' && (
                                <button
                                    onClick={() => setIsCongratsModalOpen(false)}
                                    className="text-slate-500 hover:text-slate-300 text-xs font-medium py-2 transition-colors uppercase tracking-wider"
                                >
                                    Review results
                                </button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CongratsModal;
