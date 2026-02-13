import React from 'react';
import ScoreChart from '../components/ScoreChart';
import { Download, TrendingUp, AlertTriangle, Clock, Activity, Target, Sparkles, Zap, Brain, Trophy, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 15
        }
    }
};

const Dashboard = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="h-full flex flex-col gap-3 overflow-hidden p-2 sm:p-3 relative"
        >
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px]" />
            </div>

            {/* Compact Header Section */}
            <header className="flex items-center justify-between gap-3 shrink-0 h-10">
                <div>
                    <motion.h2 variants={itemVariants} className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 leading-none">
                        Performance Overview
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5 font-medium">
                        <Sparkles size={10} />
                        AI-Powered Intelligence
                    </motion.p>
                </div>
                <motion.button
                    variants={itemVariants}
                    className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg flex items-center gap-1.5 font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 text-xs"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Download size={12} /> <span>Export Report</span>
                </motion.button>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
                {/* Left: Skills Analysis Chart */}
                <motion.div variants={itemVariants} className="col-span-1 lg:col-span-8 flex flex-col glass-panel rounded-xl p-3 sm:p-4 relative overflow-hidden group border border-slate-800/50 h-full min-h-0 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 opacity-50" />

                    <div className="flex items-center justify-between mb-2 relative z-10 shrink-0">
                        <div>
                            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                                <Brain size={14} className="text-emerald-400" />
                                Skills Radar
                            </h3>
                            <p className="text-[10px] text-slate-500">Comparative vs. average</p>
                        </div>
                        <select className="bg-slate-900/50 border border-slate-700/50 rounded-md px-2 py-1 text-[10px] text-slate-300 focus:outline-none focus:border-emerald-500/50">
                            <option>Last 30 Days</option>
                            <option>Last 3 Months</option>
                        </select>
                    </div>

                    <div className="flex-1 min-h-0 relative z-10 w-full h-full">
                        <ScoreChart />
                    </div>
                </motion.div>

                {/* Right: Quick Insights & Activity */}
                <div className="col-span-1 lg:col-span-4 flex flex-col gap-3 min-h-0 h-full overflow-hidden">
                    {/* KPI Cards Grid */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2 shrink-0">
                        <StatCard label="Score" value="82" icon={Activity} gradient="from-emerald-500 to-teal-500" trend="+5%" color="text-emerald-400" glow="shadow-emerald-500/10" />
                        <StatCard label="Time" value="42h" icon={Clock} gradient="from-blue-500 to-indigo-500" trend="+12m" color="text-blue-400" glow="shadow-blue-500/10" />
                        <StatCard label="Sessions" value="142" icon={Target} gradient="from-violet-500 to-purple-500" trend="+8" color="text-violet-400" glow="shadow-violet-500/10" />
                        <StatCard label="Growth" value="12%" icon={TrendingUp} gradient="from-pink-500 to-rose-500" trend="+2%" color="text-pink-400" glow="shadow-pink-500/10" />
                    </motion.div>

                    {/* Insights Row */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2 shrink-0">
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
                            desc="160 wpm"
                        />
                    </motion.div>

                    {/* Recent Activity List - Scrollable */}
                    <motion.div variants={itemVariants} className="flex-1 glass-panel rounded-xl p-3 relative overflow-hidden border border-slate-800/50 min-h-0 flex flex-col shadow-lg">
                        <div className="flex items-center gap-1.5 mb-2 shrink-0 border-b border-white/5 pb-2">
                            <Activity size={12} className="text-violet-400" />
                            <h3 className="font-bold text-white text-xs">Recent Activity</h3>
                        </div>

                        <div className="space-y-2 overflow-y-auto scrollbar-thin pr-1 flex-1 custom-scrollbar">
                            <ActivityItem icon={Trophy} title="Technical Assessment" time="2h ago" score="92%" color="text-yellow-400" />
                            <ActivityItem icon={Target} title="Mock Interview #4" time="5h ago" score="85%" color="text-emerald-400" />
                            <ActivityItem icon={Flame} title="Coding Challenge" time="1d ago" score="78%" color="text-orange-400" />
                            <ActivityItem icon={Brain} title="Aptitude Test" time="2d ago" score="88%" color="text-blue-400" />
                            <ActivityItem icon={Trophy} title="System Design" time="3d ago" score="95%" color="text-purple-400" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

const StatCard = ({ label, value, icon: Icon, gradient, trend, color, glow }) => (
    <motion.div
        className={`glass-panel p-2.5 rounded-xl relative overflow-hidden group border border-white/5 hover:border-white/10 transition-all ${glow} shadow-lg`}
        whileHover={{ y: -2 }}
    >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.08] group-hover:opacity-[0.12] transition-opacity`} />

        <div className="flex justify-between items-start mb-1 relative z-10">
            <div className={`p-1.5 rounded-lg bg-gradient-to-br ${gradient} text-white shadow-md`}>
                <Icon size={12} />
            </div>
            <span className={`px-1.5 py-0.5 rounded-md bg-slate-800/50 border border-slate-700 ${color} text-[10px] font-bold`}>
                {trend}
            </span>
        </div>

        <div className="relative z-10">
            <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{value}</h3>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
        </div>
    </motion.div>
);

const SmallInsightCard = ({ icon: Icon, label, value, color, bg, border, desc }) => (
    <motion.div
        className={`rounded-xl ${bg} border ${border} p-2.5 flex flex-col justify-between relative overflow-hidden shadow-lg`}
        whileHover={{ scale: 1.02 }}
    >
        <div className="flex items-center justify-between mb-1">
            <Icon size={12} className={color} />
            <span className={`text-sm font-bold ${color}`}>{value}</span>
        </div>
        <div>
            <p className="text-[10px] font-bold text-slate-200 leading-tight">{label}</p>
            <p className="text-[9px] text-slate-400 truncate opacity-80">{desc}</p>
        </div>
    </motion.div>
);

const ActivityItem = ({ icon: Icon, title, time, score, color }) => (
    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/5 transition-all group cursor-pointer">
        <div className="flex items-center gap-2 min-w-0">
            <div className={`p-1.5 rounded-md bg-slate-900 text-slate-400 group-hover:text-white transition-colors shrink-0`}>
                <Icon size={12} />
            </div>
            <div className="min-w-0 flex flex-col justify-center">
                <h4 className="text-[11px] font-semibold text-slate-300 group-hover:text-white truncate leading-tight">{title}</h4>
                <p className="text-[9px] text-slate-500 leading-tight">{time}</p>
            </div>
        </div>
        <span className={`text-[10px] font-bold ${color}`}>{score}</span>
    </div>
);

export default Dashboard;


