import React, { useState } from 'react';
import { Activity, Clock, Target, TrendingUp, Zap, Flame, Award, Brain, Download, Sparkles, Crown, Rocket } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -15 },
    show: {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
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
            className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 overflow-hidden relative"
        >
            {/* Animated Grid Background */}
            <div className="fixed inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(to right, #ff006e 1px, transparent 1px),
                        linear-gradient(to bottom, #ff006e 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black, transparent 70%)'
                }}></div>
            </div>

            {/* Neon Spotlight Effect */}
            <motion.div
                className="fixed top-0 left-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl pointer-events-none"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 100, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl pointer-events-none"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, -100, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Header */}
            <motion.header
                variants={itemVariants}
                className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10"
            >
                <div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 relative font-display">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                            NEURAL SYNC
                        </span>
                        <motion.div
                            className="absolute -top-2 -right-8"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="text-pink-500 w-6 h-6" />
                        </motion.div>
                    </h1>
                    <p className="text-cyan-400 text-sm sm:text-base font-mono flex items-center gap-2">
                        <Zap className="w-4 h-4 animate-pulse" />
                        AI-Powered Performance Analytics
                    </p>
                </div>
                <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl font-bold text-white relative overflow-hidden group shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        Export Data
                    </span>
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                </motion.button>
            </motion.header>

            {/* BENTO GRID LAYOUT */}
            <div className="grid grid-cols-12 gap-4 sm:gap-6 auto-rows-[140px] sm:auto-rows-[180px] relative z-10">

                {/* Large Score Card - Spans 2 rows */}
                <motion.div
                    variants={itemVariants}
                    className="col-span-12 sm:col-span-6 lg:col-span-4 row-span-2 group"
                    onHoverStart={() => setHoveredCard('score')}
                    onHoverEnd={() => setHoveredCard(null)}
                >
                    <TiltCard>
                        <div className="h-full neomorph-card-pink p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between">
                            <div className="absolute inset-0 rounded-3xl border-2 border-pink-500/20 group-hover:border-pink-500/60 transition-all duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex justify-between items-start relative z-10">
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                                    <Brain className="w-8 h-8 text-white" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-xs font-bold border border-pink-500/30">
                                    +12%
                                </span>
                            </div>

                            <div className="relative z-10">
                                <p className="text-slate-400 text-sm font-mono uppercase tracking-widest mb-2">Overall Score</p>
                                <h2 className="text-6xl sm:text-7xl font-black text-white mb-2 neon-text-pink">92</h2>
                                <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 relative"
                                        initial={{ width: 0 }}
                                        animate={{ width: "92%" }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    >
                                        <div className="absolute inset-0 bg-white/30 animate-shimmer" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </TiltCard>
                </motion.div>

                {/* Time Card */}
                <motion.div
                    variants={itemVariants}
                    className="col-span-6 sm:col-span-3 lg:col-span-2 group"
                >
                    <TiltCard>
                        <div className="h-full neomorph-card-cyan p-4 sm:p-5 rounded-2xl relative overflow-hidden">
                            <div className="absolute inset-0 rounded-2xl border border-cyan-500/20 group-hover:border-cyan-500/60 transition-all" />
                            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/20 rounded-full blur-2xl" />

                            <Clock className="w-8 h-8 text-cyan-400 mb-3" />
                            <p className="text-slate-400 text-xs font-mono mb-1">TIME SPENT</p>
                            <h3 className="text-3xl sm:text-4xl font-black text-white neon-text-cyan">47h</h3>
                        </div>
                    </TiltCard>
                </motion.div>

                {/* Sessions Card */}
                <motion.div
                    variants={itemVariants}
                    className="col-span-6 sm:col-span-3 lg:col-span-2 group"
                >
                    <TiltCard>
                        <div className="h-full neomorph-card-purple p-4 sm:p-5 rounded-2xl relative overflow-hidden">
                            <div className="absolute inset-0 rounded-2xl border border-purple-500/20 group-hover:border-purple-500/60 transition-all" />
                            <div className="absolute bottom-0 left-0 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl" />

                            <Target className="w-8 h-8 text-purple-400 mb-3" />
                            <p className="text-slate-400 text-xs font-mono mb-1">SESSIONS</p>
                            <h3 className="text-3xl sm:text-4xl font-black text-white neon-text-purple">156</h3>
                        </div>
                    </TiltCard>
                </motion.div>

                {/* Growth Card */}
                <motion.div
                    variants={itemVariants}
                    className="col-span-12 sm:col-span-6 lg:col-span-4 row-span-1 group"
                >
                    <TiltCard>
                        <div className="h-full neomorph-card-lime p-5 rounded-2xl relative overflow-hidden flex items-center justify-between">
                            <div className="absolute inset-0 rounded-2xl border border-lime-500/20 group-hover:border-lime-500/60 transition-all" />
                            <div className="absolute inset-0 bg-gradient-to-r from-lime-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <p className="text-slate-400 text-xs font-mono mb-2">GROWTH RATE</p>
                                <h3 className="text-5xl font-black text-white neon-text-lime">+24%</h3>
                            </div>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Rocket className="w-16 h-16 text-lime-400" />
                            </motion.div>
                        </div>
                    </TiltCard>
                </motion.div>

                {/* Chart Card - Large */}
                <motion.div
                    variants={itemVariants}
                    className="col-span-12 lg:col-span-8 row-span-2 group"
                >
                    <TiltCard>
                        <div className="h-full neomorph-card-dark p-6 rounded-3xl relative overflow-hidden">
                            <div className="absolute inset-0 rounded-3xl border-2 border-slate-700/50 group-hover:border-pink-500/30 transition-all" />
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-cyan-500/5" />

                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
                                        <Flame className="text-orange-500 w-6 h-6" />
                                        Performance Heatmap
                                    </h3>
                                    <p className="text-slate-500 text-sm font-mono">Last 7 Days Activity</p>
                                </div>
                                <select className="px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-300 text-sm focus:outline-none focus:border-pink-500/50 cursor-pointer">
                                    <option>Weekly</option>
                                    <option>Monthly</option>
                                    <option>Yearly</option>
                                </select>
                            </div>

                            {/* Placeholder for chart - using bars */}
                            <div className="flex items-end justify-between gap-2 h-48 relative z-10">
                                {[65, 85, 45, 92, 78, 88, 95].map((height, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex-1 rounded-t-xl relative group/bar cursor-pointer"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        style={{
                                            background: `linear-gradient(to top, 
                                                ${i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4'}, 
                                                ${i % 3 === 0 ? '#f43f5e' : i % 3 === 1 ? '#a855f7' : '#0891b2'}
                                            )`,
                                            boxShadow: `0 0 20px ${i % 3 === 0 ? 'rgba(236,72,153,0.5)' : i % 3 === 1 ? 'rgba(139,92,246,0.5)' : 'rgba(6,182,212,0.5)'}`
                                        }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-900 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                                            {height}%
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </TiltCard>
                </motion.div>

                {/* Achievement Card */}
                <motion.div
                    variants={itemVariants}
                    className="col-span-12 sm:col-span-6 lg:col-span-4 row-span-1 group"
                >
                    <TiltCard>
                        <div className="h-full neomorph-card-gold p-5 rounded-2xl relative overflow-hidden flex items-center gap-4">
                            <div className="absolute inset-0 rounded-2xl border border-yellow-500/20 group-hover:border-yellow-500/60 transition-all" />

                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="p-4 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 shadow-[0_0_30px_rgba(234,179,8,0.5)]"
                            >
                                <Crown className="w-10 h-10 text-white" />
                            </motion.div>

                            <div>
                                <p className="text-yellow-500 text-xs font-mono mb-1">LATEST ACHIEVEMENT</p>
                                <h3 className="text-xl font-black text-white">Top Performer</h3>
                                <p className="text-slate-400 text-xs">Rank #3 Global</p>
                            </div>
                        </div>
                    </TiltCard>
                </motion.div>

            </div>
        </motion.div>
    );
};

// 3D Tilt Card Component with Magnetic Effect
const TiltCard = ({ children }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouse = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className="h-full perspective-1000"
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.div>
    );
};

export default Dashboard;
