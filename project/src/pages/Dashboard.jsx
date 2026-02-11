import React from 'react';
import ScoreChart from '../components/ScoreChart';
import { Download, TrendingUp, AlertTriangle, Clock, Activity, Target, ArrowUpRight, Sparkles, Zap, Brain, Trophy, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 12
        }
    }
};

const Dashboard = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="h-full flex flex-col gap-4 overflow-y-auto lg:overflow-hidden p-2 sm:p-4"
        >
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Header Section */}
            <header className="flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                <div>
                    <motion.h2 variants={itemVariants} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Performance Overview
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-sm text-slate-400 flex items-center gap-2">
                        <Sparkles size={14} className="text-emerald-400" />
                        AI-Powered Readiness Intelligence
                    </motion.p>
                </div>
                <motion.button
                    variants={itemVariants}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl flex items-center gap-2 font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 text-sm"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Download size={16} /> <span>Export Report</span>
                </motion.button>
            </header>



            {/* Main Content Grid - Fills remaining height */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 lg:min-h-0">
                {/* Left: Skills Analysis Chart */}
                <motion.div variants={itemVariants} className="col-span-1 lg:col-span-8 flex flex-col glass-panel rounded-2xl p-4 sm:p-6 relative overflow-hidden group border border-slate-800/50 min-h-[400px] lg:min-h-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 opacity-50" />

                    <div className="flex items-center justify-between mb-2 relative z-10 shrink-0">
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Brain size={20} className="text-emerald-400" />
                                Skills Radar
                            </h3>
                            <p className="text-xs text-slate-500">Comparative analysis vs. average candidates</p>
                        </div>
                        <select className="bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/50">
                            <option>Last 30 Days</option>
                            <option>Last 3 Months</option>
                            <option>All Time</option>
                        </select>
                    </div>

                    <div className="flex-1 min-h-0 relative z-10 w-full h-full">
                        <ScoreChart />
                    </div>
                </motion.div>

                {/* Right: Quick Insights & Activity */}
                <div className="col-span-1 lg:col-span-4 flex flex-col gap-4 lg:min-h-0 lg:overflow-y-auto scrollbar-thin lg:pr-1">
                    {/* KPI Cards Grid - Moved from top */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 shrink-0">
                        <StatCard label="Score" value="82" icon={Activity} gradient="from-emerald-500 to-teal-500" trend="+5%" color="text-emerald-400" glow="shadow-emerald-500/10" />
                        <StatCard label="Time" value="42h" icon={Clock} gradient="from-blue-500 to-indigo-500" trend="+12m" color="text-blue-400" glow="shadow-blue-500/10" />
                        <StatCard label="Sessions" value="142" icon={Target} gradient="from-violet-500 to-purple-500" trend="+8" color="text-violet-400" glow="shadow-violet-500/10" />
                        <StatCard label="Growth" value="12%" icon={TrendingUp} gradient="from-pink-500 to-rose-500" trend="+2%" color="text-pink-400" glow="shadow-pink-500/10" />
                    </motion.div>

                    {/* Insights Row */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 h-32 shrink-0">
                        <SmallInsightCard
                            icon={Zap}
                            label="Vocabulary"
                            value="+15%"
                            color="text-emerald-400"
                            bg="bg-emerald-500/10"
                            border="border-emerald-500/20"
                            desc="Tech terms used"
                        />
                        <SmallInsightCard
                            icon={AlertTriangle}
                            label="Pacing"
                            value="High"
                            color="text-amber-400"
                            bg="bg-amber-500/10"
                            border="border-amber-500/20"
                            desc="160 words/min"
                        />
                    </motion.div>

                    {/* Recent Activity List */}
                    <motion.div variants={itemVariants} className="flex-1 glass-panel rounded-2xl p-5 relative overflow-hidden border border-slate-800/50 min-h-0 flex flex-col">
                        <div className="flex items-center gap-2 mb-4 shrink-0">
                            <Activity size={18} className="text-violet-400" />
                            <h3 className="font-bold text-white text-sm">Recent Activity</h3>
                        </div>

                        <div className="space-y-3 overflow-y-auto scrollbar-thin pr-1 flex-1">
                            <ActivityItem icon={Trophy} title="Technical Assessment" time="2h ago" score="92%" color="text-yellow-400" />
                            <ActivityItem icon={Target} title="Mock Interview #4" time="5h ago" score="85%" color="text-emerald-400" />
                            <ActivityItem icon={Flame} title="Coding Challenge" time="1d ago" score="78%" color="text-orange-400" />
                            <ActivityItem icon={Brain} title="Aptitude Test" time="2d ago" score="88%" color="text-blue-400" />
                            <ActivityItem icon={Trophy} title="System Design" time="3d ago" score="95%" color="text-purple-400" />
                        </div>
                    </motion.div>

                    {/* Pro Banner */}
                    <motion.div
                        variants={itemVariants}
                        className="h-24 shrink-0 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-4 relative overflow-hidden cursor-pointer group"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <Sparkles size={60} />
                        </div>
                        <div className="relative z-10 flex flex-col justify-center h-full">
                            <div className="flex items-center gap-2 font-bold text-white mb-1">
                                <Sparkles size={16} className="text-yellow-300" />
                                <span>Pro Assessment</span>
                            </div>
                            <p className="text-xs text-indigo-100 mb-2">Unlock FAANG mock interviews</p>
                        </div>
                        <button className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold px-2 py-1 rounded-lg backdrop-blur-sm transition-colors">
                            UPGRADE
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

const StatCard = ({ label, value, icon: Icon, gradient, trend, color, glow }) => (
    <motion.div
        className={`glass-panel p-4 rounded-2xl relative overflow-hidden group border border-white/5 hover:border-white/10 transition-all ${glow}`}
        whileHover={{ y: -2 }}
    >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.08] group-hover:opacity-[0.12] transition-opacity`} />

        <div className="flex justify-between items-start mb-3 relative z-10">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
                <Icon size={18} />
            </div>
            <span className={`px-2 py-1 rounded-lg bg-slate-800/50 border border-slate-700 ${color} text-xs font-bold`}>
                {trend}
            </span>
        </div>

        <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">{label}</p>
        </div>
    </motion.div>
);

const SmallInsightCard = ({ icon: Icon, label, value, color, bg, border, desc }) => (
    <motion.div
        className={`rounded-2xl ${bg} border ${border} p-4 flex flex-col justify-between relative overflow-hidden`}
        whileHover={{ scale: 1.02 }}
    >
        <div className="flex items-start justify-between">
            <Icon size={18} className={color} />
            <span className={`text-lg font-bold ${color}`}>{value}</span>
        </div>
        <div>
            <p className="text-xs font-bold text-slate-200">{label}</p>
            <p className="text-[10px] text-slate-400 truncate">{desc}</p>
        </div>
    </motion.div>
);

const ActivityItem = ({ icon: Icon, title, time, score, color }) => (
    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/30 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50 transition-all group cursor-pointer">
        <div className="flex items-center gap-3 min-w-0">
            <div className={`p-2 rounded-lg bg-slate-900 text-slate-400 group-hover:text-white transition-colors`}>
                <Icon size={14} />
            </div>
            <div className="min-w-0">
                <h4 className="text-xs font-semibold text-slate-300 group-hover:text-white truncate">{title}</h4>
                <p className="text-[10px] text-slate-500">{time}</p>
            </div>
        </div>
        <span className={`text-xs font-bold ${color}`}>{score}</span>
    </div>
);

export default Dashboard;


