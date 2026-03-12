import React, { useState, useEffect } from 'react';
import ScoreChart from '../components/ScoreChart';
import {
    Download, TrendingUp, AlertTriangle, Clock, Activity, Target, Sparkles,
    Zap, Brain, Trophy, Flame, ChevronRight, Star, Award, BookOpen,
    BarChart3, ArrowUpRight, Calendar, Layers, Shield, Cpu, Eye,
    MessageSquare, Code, Users, Lightbulb, CheckCircle2, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 14
        }
    }
};

/* ────────────────── Animated Counter ────────────────── */
const AnimatedCounter = ({ value, duration = 1.5, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const numericValue = parseInt(value) || 0;
    useEffect(() => {
        let start = 0;
        const increment = numericValue / (duration * 60);
        const timer = setInterval(() => {
            start += increment;
            if (start >= numericValue) {
                setCount(numericValue);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [numericValue, duration]);
    return <>{count}{suffix}</>;
};

/* ────────────────── Circular Progress Ring ────────────────── */
const ProgressRing = ({ value, max = 100, size = 64, strokeWidth = 5, color = '#10b981' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / max) * circumference;

    return (
        <svg width={size} height={size} className="transform -rotate-90">
            <circle cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
            <motion.circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke={color} strokeWidth={strokeWidth}
                strokeLinecap="round" strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - progress }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />
        </svg>
    );
};

/* ════════════════════ MAIN DASHBOARD ════════════════════ */
const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { isDark } = useTheme();
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 17 ? 'Good Afternoon' : 'Good Evening';

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="h-full flex flex-col gap-3 overflow-hidden p-2 sm:p-3 relative"
        >
            {/* ═══ Ambient Background Orbs ═══ */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-violet-500/8 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px]" />
            </div>

            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-teal-600/10 to-cyan-600/20 rounded-2xl" />
                <div className="absolute inset-0 backdrop-blur-3xl" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-400/10 to-transparent rounded-full blur-3xl" />

                <div className="relative p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-3">
                        {/* Animated Avatar */}
                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-emerald-500/30">
                                JD
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
                        </motion.div>
                        <div>
                            <motion.h1
                                className="text-xl sm:text-2xl font-bold text-white"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {greeting}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">John</span> 👋
                            </motion.h1>
                            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                                <Sparkles size={12} className="text-emerald-400" />
                                Your performance is <span className="text-emerald-400 font-semibold">above average</span> this week
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <motion.button
                            className="px-3 py-2 bg-white/5 text-slate-300 rounded-xl flex items-center gap-1.5 font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs"
                            whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                        >
                            <Calendar size={13} />
                            <span className="hidden sm:inline">This Week</span>
                        </motion.button>
                        <motion.button
                            className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl flex items-center gap-1.5 font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all text-xs"
                            whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                        >
                            <Download size={13} /> Export
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* ═══════════════ KPI STAT CARDS ═══════════════ */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <StatCard
                    label="Overall Score" value={82} suffix="/100" icon={Activity}
                    gradient="from-emerald-500 to-teal-500" color="text-emerald-400"
                    ringColor="#10b981" trend="+5%" trendUp={true}
                    desc="Top 15% of candidates"
                />
                <StatCard
                    label="Practice Time" value={42} suffix="h" icon={Clock}
                    gradient="from-blue-500 to-indigo-500" color="text-blue-400"
                    ringColor="#3b82f6" trend="+12h" trendUp={true}
                    desc="This month"
                />
                <StatCard
                    label="Completed" value={14} suffix="/20" icon={Target}
                    gradient="from-violet-500 to-purple-500" color="text-violet-400"
                    ringColor="#8b5cf6" trend="70%" trendUp={true}
                    desc="Assessment modules"
                />
                <StatCard
                    label="Streak" value={7} suffix=" Days" icon={Flame}
                    gradient="from-amber-500 to-orange-500" color="text-amber-400"
                    ringColor="#f59e0b" trend="Best: 14" trendUp={false}
                    desc="Keep it going!"
                />
            </motion.div>

            {/* ═══════════════ MAIN CONTENT GRID ═══════════════ */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 flex-1 min-h-0">

                {/* ─── Left Column: Chart + Weekly Progress ─── */}
                <div className="xl:col-span-8 flex flex-col gap-3 min-h-0">

                    {/* Skills Radar Chart */}
                    <motion.div variants={itemVariants} className={`rounded-2xl p-3 sm:p-4 relative overflow-hidden border shadow-xl flex-1 flex flex-col min-h-0 transition-colors ${isDark ? 'bg-slate-900/50 border-white/5 bg-opacity-80' : 'bg-white border-slate-200'}`}>
                        <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-indigo-500/5 ${isDark ? 'opacity-50' : 'opacity-10'}`} />

                        {/* Tab Selectors */}
                        <div className="flex items-center justify-between mb-2 shrink-0 relative z-10">
                            <div>
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <Brain size={18} className="text-emerald-400" />
                                    Skills Intelligence
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">AI-analyzed competency mapping</p>
                            </div>
                            <div className="flex items-center gap-1 bg-slate-900/60 rounded-xl p-1 border border-white/5">
                                {['overview', 'trends', 'compare'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all capitalize ${activeTab === tab
                                            ? 'bg-emerald-500/20 text-emerald-400 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-300'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 relative z-10 w-full min-h-0 py-2">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ScoreChart />
                            </div>
                        </div>
                    </motion.div>

                    {/* Weekly Progress Bars */}
                    <motion.div variants={itemVariants} className={`rounded-xl p-3 sm:p-4 relative overflow-hidden border shadow-xl shrink-0 transition-colors ${isDark ? 'bg-slate-900/50 border-white/5 bg-opacity-80' : 'bg-white border-slate-200'}`}>
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    <BarChart3 size={16} className="text-cyan-400" />
                                    Weekly Progress
                                </h3>
                                <p className="text-[11px] text-slate-500 mt-0.5">Hours practiced per day</p>
                            </div>
                            <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                                +23% vs last week
                            </span>
                        </div>
                        <div className="flex items-end gap-2 h-20">
                            {[
                                { day: 'Mon', hours: 3.5, max: 6 },
                                { day: 'Tue', hours: 5.2, max: 6 },
                                { day: 'Wed', hours: 2.8, max: 6 },
                                { day: 'Thu', hours: 6, max: 6 },
                                { day: 'Fri', hours: 4.5, max: 6 },
                                { day: 'Sat', hours: 1.5, max: 6 },
                                { day: 'Sun', hours: 0, max: 6 },
                            ].map((item, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                                    <span className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                                        {item.hours}h
                                    </span>
                                    <motion.div
                                        className="w-full rounded-lg relative overflow-hidden cursor-pointer"
                                        style={{ height: '100%', maxHeight: '90px' }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="absolute inset-0 bg-slate-800/50 rounded-lg" />
                                        <motion.div
                                            className={`absolute bottom-0 left-0 right-0 rounded-lg ${item.day === 'Sun'
                                                ? 'bg-slate-700/50'
                                                : item.hours >= 5
                                                    ? 'bg-gradient-to-t from-emerald-500 to-emerald-400'
                                                    : item.hours >= 3
                                                        ? 'bg-gradient-to-t from-cyan-500 to-cyan-400'
                                                        : 'bg-gradient-to-t from-slate-600 to-slate-500'
                                                }`}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(item.hours / item.max) * 100}%` }}
                                            transition={{ duration: 0.8, delay: 0.5 + i * 0.08, ease: "easeOut" }}
                                        />
                                    </motion.div>
                                    <span className={`text-[10px] font-semibold ${item.day === 'Sun' ? 'text-slate-600' : 'text-slate-400'}`}>
                                        {item.day}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ─── Right Column: Insights + Activity + Recommendations ─── */}
                <div className="xl:col-span-4 flex flex-col gap-3 min-h-0">

                    {/* Quick Insights Grid */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2 shrink-0">
                        <InsightCard
                            icon={Zap} label="Vocabulary" value="+15%"
                            color="text-emerald-400" bg="from-emerald-500/15 to-emerald-500/5"
                            border="border-emerald-500/20" desc="Tech terms growth"
                        />
                        <InsightCard
                            icon={AlertTriangle} label="Speech Pace" value="160wpm"
                            color="text-amber-400" bg="from-amber-500/15 to-amber-500/5"
                            border="border-amber-500/20" desc="Slightly fast"
                        />
                        <InsightCard
                            icon={Eye} label="Confidence" value="87%"
                            color="text-blue-400" bg="from-blue-500/15 to-blue-500/5"
                            border="border-blue-500/20" desc="Eye contact score"
                        />
                        <InsightCard
                            icon={Shield} label="Accuracy" value="94%"
                            color="text-violet-400" bg="from-violet-500/15 to-violet-500/5"
                            border="border-violet-500/20" desc="Answer precision"
                        />
                    </motion.div>

                    {/* AI Recommendations */}
                    <motion.div variants={itemVariants} className={`rounded-xl p-3 relative overflow-hidden border shadow-xl shrink-0 transition-colors ${isDark ? 'bg-slate-900/50 border-white/5 bg-opacity-80' : 'bg-white border-slate-200'}`}>
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-500/10 to-transparent rounded-full ${isDark ? 'blur-2xl' : 'blur-xl'}`} />
                        <div className="flex items-center gap-2 mb-2 relative z-10">
                            <div className="p-1.5 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
                                <Lightbulb size={12} className="text-white" />
                            </div>
                            <h3 className="font-bold text-white text-xs">AI Recommendations</h3>
                        </div>
                        <div className="space-y-1.5 relative z-10">
                            <RecommendationItem
                                text="Practice system design questions"
                                tag="Priority" tagColor="text-rose-400 bg-rose-500/10 border-rose-500/20"
                                icon={Cpu}
                            />
                            <RecommendationItem
                                text="Slow down speech pace by 10%"
                                tag="Tip" tagColor="text-amber-400 bg-amber-500/10 border-amber-500/20"
                                icon={MessageSquare}
                            />
                            <RecommendationItem
                                text="Add more STAR method in answers"
                                tag="Improve" tagColor="text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
                                icon={Star}
                            />
                        </div>
                    </motion.div>

                    {/* Recent Activity List */}
                    <motion.div variants={itemVariants} className={`rounded-xl p-3 relative overflow-hidden border flex flex-col shadow-xl flex-1 min-h-0 transition-colors ${isDark ? 'bg-slate-900/50 border-white/5' : 'bg-white border-slate-200'}`}>
                        <div className={`flex items-center justify-between mb-2 shrink-0 pb-1.5 border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                            <div className="flex items-center gap-2">
                                <Activity size={14} className="text-violet-400" />
                                <h3 className="font-bold text-white text-sm">Recent Activity</h3>
                            </div>
                            <button className="text-[11px] text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium">
                                View All <ChevronRight size={12} />
                            </button>
                        </div>

                        <div className="space-y-1.5 overflow-y-auto scrollbar-thin flex-1 custom-scrollbar pr-1">
                            <ActivityItem icon={Trophy} title="Technical Assessment" time="2h ago" score="92%" color="text-yellow-400" status="excellent" />
                            <ActivityItem icon={Target} title="Mock Interview #4" time="5h ago" score="85%" color="text-emerald-400" status="good" />
                            <ActivityItem icon={Flame} title="Coding Challenge" time="1d ago" score="78%" color="text-orange-400" status="average" />
                            <ActivityItem icon={Brain} title="Aptitude Test" time="2d ago" score="88%" color="text-blue-400" status="good" />
                            <ActivityItem icon={Users} title="Group Discussion" time="3d ago" score="91%" color="text-purple-400" status="excellent" />
                            <ActivityItem icon={Code} title="DSA Practice" time="4d ago" score="75%" color="text-pink-400" status="average" />
                        </div>
                    </motion.div>

                    {/* Achievement Badges */}
                    <motion.div variants={itemVariants} className={`rounded-xl p-3 relative overflow-hidden border shadow-xl shrink-0 transition-colors ${isDark ? 'bg-slate-900/50 border-white/5' : 'bg-white border-slate-200'}`}>
                        <div className={`absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 ${isDark ? 'opacity-100' : 'opacity-30'}`} />
                        <div className="flex items-center justify-between mb-2 relative z-10">
                            <div className="flex items-center gap-2">
                                <Award size={14} className="text-amber-400" />
                                <h3 className="font-bold text-white text-sm">Achievements</h3>
                            </div>
                            <span className="text-[10px] text-slate-500 font-medium">5/12 unlocked</span>
                        </div>
                        <div className="flex items-center gap-2 relative z-10">
                            {[
                                { emoji: '🔥', label: 'On Fire', unlocked: true, color: 'from-orange-500/30 to-red-500/30' },
                                { emoji: '🧠', label: 'Brain', unlocked: true, color: 'from-violet-500/30 to-purple-500/30' },
                                { emoji: '⚡', label: 'Speed', unlocked: true, color: 'from-yellow-500/30 to-amber-500/30' },
                                { emoji: '🎯', label: 'Accurate', unlocked: true, color: 'from-emerald-500/30 to-teal-500/30' },
                                { emoji: '💎', label: 'Perfect', unlocked: true, color: 'from-cyan-500/30 to-blue-500/30' },
                                { emoji: '🏆', label: 'Champ', unlocked: false, color: '' },
                                { emoji: '🌟', label: 'Star', unlocked: false, color: '' },
                            ].map((badge, i) => (
                                <motion.div
                                    key={i}
                                    className={`flex-1 aspect-square rounded-xl flex items-center justify-center text-lg cursor-pointer transition-all relative overflow-hidden ${badge.unlocked
                                        ? `bg-gradient-to-br ${badge.color} border border-white/10 shadow-lg`
                                        : 'bg-slate-800/30 border border-white/5 opacity-40 grayscale'
                                        }`}
                                    whileHover={badge.unlocked ? { scale: 1.15, y: -3 } : {}}
                                    title={badge.label}
                                >
                                    {badge.unlocked && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent" />
                                    )}
                                    <span className="relative z-10">{badge.emoji}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

/* ════════════════════ SUBCOMPONENTS ════════════════════ */

const StatCard = ({ label, value, suffix, icon: Icon, gradient, trend, trendUp, color, ringColor, desc }) => {
    const { isDark } = useTheme();
    return (
    <motion.div
        className={`p-3 rounded-xl relative overflow-hidden group border transition-all shadow-xl cursor-pointer flex flex-col justify-center ${isDark ? 'bg-slate-900/50 border-white/5 hover:bg-slate-800/60 hover:border-emerald-500/20' : 'bg-white border-slate-200 hover:border-emerald-200'}`}
        whileHover={{ y: -2, scale: 1.01 }}
        variants={itemVariants}
    >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} ${isDark ? 'opacity-[0.06] group-hover:opacity-[0.12]' : 'opacity-[0.03] group-hover:opacity-[0.08]'} transition-opacity duration-500`} />
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.02] to-transparent rounded-full" />

        <div className="flex justify-between items-start relative z-10">
            <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1.5">
                    <div className={`p-1 rounded bg-gradient-to-br ${gradient} text-white shadow-sm`}>
                        <Icon size={12} />
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-0.5 ${trendUp ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : `${color} bg-white/5 border border-white/10`}`}>
                        {trendUp && <ArrowUpRight size={8} />}
                        {trend}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight leading-none mb-0.5">
                    <AnimatedCounter value={value} suffix={suffix} />
                </h3>
                <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
                <p className="text-[10px] text-slate-600 mt-0.5">{desc}</p>
            </div>
            <div className="relative">
                <ProgressRing value={value} max={suffix === '/100' ? 100 : suffix === '/20' ? 20 : 50} size={52} strokeWidth={4} color={ringColor} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-[10px] font-bold ${color}`}>{Math.round((value / (suffix === '/100' ? 100 : suffix === '/20' ? 20 : 50)) * 100)}%</span>
                </div>
            </div>
        </div>
    </motion.div>
    );
};

const InsightCard = ({ icon: Icon, label, value, color, bg, border, desc }) => (
    <motion.div
        className={`rounded-lg bg-gradient-to-br ${bg} border ${border} p-2 flex flex-col justify-between relative overflow-hidden shadow-sm cursor-pointer group`}
        whileHover={{ scale: 1.02, y: -1 }}
    >
        <div className="absolute top-0 right-0 w-12 h-12 bg-white/[0.02] rounded-full blur-xl" />
        <div className="flex items-center justify-between mb-1.5">
            <div className={`p-1 rounded bg-white/5 ${color}`}>
                <Icon size={12} />
            </div>
            <span className={`text-sm font-bold ${color}`}>{value}</span>
        </div>
        <div>
            <p className="text-[11px] font-bold text-slate-200 leading-tight">{label}</p>
            <p className="text-[10px] text-slate-500 truncate">{desc}</p>
        </div>
    </motion.div>
);

const RecommendationItem = ({ text, tag, tagColor, icon: Icon }) => (
    <motion.div
        className="flex items-center gap-2 p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-transparent hover:border-white/5 transition-all group cursor-pointer"
        whileHover={{ x: 2 }}
    >
        <div className="p-1 rounded bg-white/5 text-slate-400 group-hover:text-white transition-colors shrink-0">
            <Icon size={11} />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-[11px] text-slate-300 group-hover:text-white transition-colors leading-tight">{text}</p>
            <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mt-1 inline-block border ${tagColor}`}>{tag}</span>
        </div>
        <ArrowRight size={12} className="text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0" />
    </motion.div>
);

const ActivityItem = ({ icon: Icon, title, time, score, color, status }) => {
    const statusColors = {
        excellent: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        good: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        average: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    };

    return (
        <motion.div
            className="flex items-center justify-between p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-transparent hover:border-white/5 transition-all group cursor-pointer"
            whileHover={{ x: 2 }}
        >
            <div className="flex items-center gap-2 min-w-0">
                <div className={`p-1 rounded bg-slate-800/80 ${color} group-hover:scale-110 transition-transform shrink-0`}>
                    <Icon size={11} />
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                    <h4 className="text-[11px] font-semibold text-slate-300 group-hover:text-white truncate leading-tight transition-colors">{title}</h4>
                    <p className="text-[9px] text-slate-600 leading-tight">{time}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${statusColors[status]}`}>{score}</span>
            </div>
        </motion.div>
    );
};

export default Dashboard;
