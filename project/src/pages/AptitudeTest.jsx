import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Timer, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const AptitudeTest = () => {
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
                        Quantitative Reasoning • Set 3
                    </p>
                </div>
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
                    14:30
                </motion.div>
            </header>

            {/* Question Card */}
            <motion.div
                className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 mb-5 sm:mb-6 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex justify-between items-start mb-4 sm:mb-5 relative z-10">
                    <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Question 5 / 20</span>
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg text-[10px] sm:text-xs text-amber-400 font-bold">Hard</span>
                </div>

                <h3 className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed mb-5 sm:mb-6 relative z-10">
                    A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 relative z-10">
                    <Option label="A" text="120 meters" />
                    <Option label="B" text="150 meters" selected />
                    <Option label="C" text="180 meters" />
                    <Option label="D" text="324 meters" />
                </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
                <motion.button
                    className="px-4 sm:px-5 py-2.5 sm:py-3 text-sm rounded-xl glass-panel hover:bg-white/10 text-white font-bold flex items-center justify-center gap-2 border border-white/10 transition-all shadow-lg touch-manipulation w-full sm:w-auto"
                    whileHover={{ x: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <ArrowLeft size={16} /> Previous
                </motion.button>
                <motion.button
                    className="px-4 sm:px-5 py-2.5 sm:py-3 text-sm rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-violet-500/50 border border-white/10 touch-manipulation w-full sm:w-auto"
                    whileHover={{ x: 3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Next <ArrowRight size={16} />
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
                    <span className="font-bold text-emerald-400">25% Completed</span>
                </div>
                <div className="h-2 glass-panel rounded-full overflow-hidden border border-white/10">
                    <motion.div
                        className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 relative overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: "25%" }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Option = ({ label, text, selected }) => (
    <motion.button
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

