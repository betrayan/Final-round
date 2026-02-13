import React, { useState } from 'react';
import { Clock, Target, Rocket, Flame, Crown, Zap, Brain, Download, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateX: -10 },
    show: {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 15
        }
    }
};

const Dashboard = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="h-full bg-slate-950 p-3 overflow-hidden relative flex flex-col gap-3"
        >
            {/* Animated Grid Background */}
            <div className="fixed inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(to right, #ff006e 1px, transparent 1px),
                        linear-gradient(to bottom, #ff006e 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                    maskImage: 'radial-gradient(circle at center, black, transparent 70%)'
                }}></div>
            </div>

            {/* Neon Spotlight Effect - Smaller & Subtler */}
            <div className="fixed top-0 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="fixed bottom-0 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

            {/* Compact Header */}
            <motion.header
                variants={itemVariants}
                className="flex items-center justify-between gap-3 relative z-10 shrink-0 h-12"
            >
                <div>
                    <h1 className="text-2xl font-black relative font-display flex items-center gap-2">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                            NEURAL SYNC
                        </span>
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="text-pink-500 w-4 h-4" />
                        </motion.div>
                    </h1>
                    <p className="text-cyan-400 text-[10px] font-mono flex items-center gap-1 mt-0.5">
                        <Zap className="w-3 h-3 animate-pulse" />
                        AI-Powered Analytics
                    </p>
                </div>
                <motion.button
                    className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg font-bold text-white text-xs relative overflow-hidden group shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all flex items-center gap-1.5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Download className="w-3.5 h-3.5" />
                    Export
                </motion.button>
            </motion.header>

            {/* Dense Bento Grid Layout */}
            <div className="grid grid-cols-12 gap-3 flex-1 min-h-0 relative z-10 overflow-y-auto lg:overflow-hidden pr-1 pb-1">

                {/* Large Score Card */}
                <motion.div variants={itemVariants} className="col-span-12 sm:col-span-6 lg:col-span-4 row-span-2 group min-h-[160px]">
                    <div className="h-full bg-slate-900/40 p-4 rounded-2xl relative overflow-hidden flex flex-col justify-between border border-pink-500/30 backdrop-blur-sm">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent pointer-events-none" />

                        <div className="flex justify-between items-start relative z-10">
                            <div className="p-2.5 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <span className="px-2 py-0.5 rounded-md bg-pink-500/20 text-pink-400 text-[10px] font-bold border border-pink-500/30">
                                +12%
                            </span>
                        </div>

                        <div className="relative z-10">
                            <p className="text-slate-400 text-[10px] font-mono uppercase tracking-widest mb-1">Overall Score</p>
                            <h2 className="text-5xl font-black text-white mb-2 tracking-tighter drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">92</h2>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500 relative"
                                    initial={{ width: 0 }}
                                    animate={{ width: "92%" }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                >
                                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Time Card */}
                <motion.div variants={itemVariants} className="col-span-6 sm:col-span-3 lg:col-span-2 group min-h-[80px]">
                    <div className="h-full bg-slate-900/40 p-3 rounded-xl relative overflow-hidden border border-cyan-500/30 backdrop-blur-sm flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-500/10 rounded-full blur-xl" />
                        <Clock className="w-5 h-5 text-cyan-400" />
                        <div>
                            <p className="text-slate-400 text-[9px] font-mono mb-0.5">TIME</p>
                            <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">47h</h3>
                        </div>
                    </div>
                </motion.div>

                {/* Sessions Card */}
                <motion.div variants={itemVariants} className="col-span-6 sm:col-span-3 lg:col-span-2 group min-h-[80px]">
                    <div className="h-full bg-slate-900/40 p-3 rounded-xl relative overflow-hidden border border-purple-500/30 backdrop-blur-sm flex flex-col justify-between">
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-purple-500/10 rounded-full blur-xl" />
                        <Target className="w-5 h-5 text-purple-400" />
                        <div>
                            <p className="text-slate-400 text-[9px] font-mono mb-0.5">SESSIONS</p>
                            <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">156</h3>
                        </div>
                    </div>
                </motion.div>

                {/* Growth Card - Compact */}
                <motion.div variants={itemVariants} className="col-span-12 sm:col-span-6 lg:col-span-4 row-span-1 group min-h-[80px]">
                    <div className="h-full bg-slate-900/40 p-3 rounded-xl relative overflow-hidden border border-lime-500/30 backdrop-blur-sm flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-[10px] font-mono mb-1">GROWTH</p>
                            <h3 className="text-3xl font-black text-white drop-shadow-[0_0_8px_rgba(132,204,22,0.8)]">+24%</h3>
                        </div>
                        <Rocket className="w-10 h-10 text-lime-400 opacity-80" />
                    </div>
                </motion.div>

                {/* Chart Card - Span Reduced */}
                <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8 row-span-2 group min-h-[200px]">
                    <div className="h-full bg-slate-900/40 p-4 rounded-2xl relative overflow-hidden border border-slate-700/50 backdrop-blur-sm flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none" />

                        <div className="flex justify-between items-center mb-4 shrink-0 relative z-10">
                            <div>
                                <h3 className="text-lg font-black text-white flex items-center gap-2">
                                    <Flame className="text-orange-500 w-4 h-4" />
                                    Heatmap
                                </h3>
                                <p className="text-slate-500 text-[10px] font-mono">Last 7 Days</p>
                            </div>
                            <select className="px-2 py-1 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 text-[10px] focus:outline-none focus:border-pink-500/50">
                                <option>Weekly</option>
                                <option>Monthly</option>
                            </select>
                        </div>

                        {/* Chart Bars */}
                        <div className="flex items-end justify-between gap-2 flex-1 min-h-0 relative z-10 pb-2">
                            {[65, 85, 45, 92, 78, 88, 95].map((height, i) => (
                                <motion.div
                                    key={i}
                                    className="flex-1 rounded-t-lg relative group/bar cursor-pointer"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ delay: i * 0.05, duration: 0.5, type: "spring" }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    style={{
                                        background: `linear-gradient(to top, 
                                            ${i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4'}, 
                                            ${i % 3 === 0 ? '#f43f5e' : i % 3 === 1 ? '#a855f7' : '#0891b2'}
                                        )`,
                                        opacity: 0.8
                                    }}
                                >
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-900 px-1.5 py-0.5 rounded text-[10px] font-bold text-white border border-white/10">
                                        {height}%
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Achievement Card - Compact */}
                <motion.div variants={itemVariants} className="col-span-12 sm:col-span-6 lg:col-span-4 row-span-1 group min-h-[80px]">
                    <div className="h-full bg-slate-900/40 p-3 rounded-xl relative overflow-hidden border border-yellow-500/30 backdrop-blur-sm flex items-center gap-3">
                        <div className="p-2.5 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 shadow-[0_0_15px_rgba(234,179,8,0.4)] shrink-0">
                            <Crown className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-yellow-500 text-[9px] font-mono mb-0.5 font-bold">LATEST</p>
                            <h3 className="text-lg font-black text-white leading-none mb-0.5">Top Performer</h3>
                            <p className="text-slate-400 text-[10px]">Rank #3 Global</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default Dashboard;
