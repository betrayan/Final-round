import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Code,
    Users,
    MessageSquare,
    BrainCircuit,
    BarChart3,
    Zap,
    Sparkles,
    X
} from 'lucide-react';
import { motion } from 'framer-motion';

import { useAssessment } from '../context/AssessmentContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const { jobRole, completedSteps } = useAssessment();
    const isAssessmentActive = !!jobRole;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                ></motion.div>
            )}

            <aside className={`fixed lg:sticky top-0 h-screen w-[220px] sm:w-[240px] md:w-[260px] glass-panel backdrop-blur-3xl border-r border-white/10 z-40 transition-all duration-300 ease-out flex flex-col shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                        className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-1/2 -right-20 w-60 h-60 bg-violet-500/15 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* Logo Section */}
                <div className="p-4 sm:p-5 md:p-6 border-b border-white/10 backdrop-blur-sm relative z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/40 to-teal-500/40 blur-lg animate-pulse-glow"></div>
                                <div className="relative p-2.5 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-xl shadow-lg">
                                    <Zap className="text-white" size={22} strokeWidth={2.5} />
                                </div>
                            </motion.div>
                            <div>
                                <h1 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 tracking-tight">
                                    NexusAI
                                </h1>
                                <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium uppercase tracking-wider flex items-center gap-1">
                                    <Sparkles size={10} className="text-emerald-400" />
                                    Assessment Platform
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-grow px-2 sm:px-3 py-4 sm:py-5 space-y-5 sm:space-y-6 overflow-y-auto scrollbar-thin relative z-10">
                    {/* Analytics Section - Only show when NOT in active assessment */}
                    {!isAssessmentActive && (
                        <div>
                            <div className="px-3 mb-3 flex items-center gap-2">
                                <BarChart3 size={14} className="text-emerald-400" />
                                <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Analytics</p>
                            </div>
                            <NavItem to="/reports" icon={BarChart3} label="Dashboard" />
                        </div>
                    )}


                    {/* Assessment Flow - Always Visible */}
                    <div className={`${!isAssessmentActive ? 'pt-3 border-t border-white/10' : ''}`}>
                        <div className="px-3 mb-3 flex items-center gap-2">
                            <Code size={14} className="text-violet-400" />
                            <p className="text-[11px] font-bold text-violet-400 uppercase tracking-wider">Assessment Flow</p>
                        </div>
                        <div className="space-y-1.5">
                            <NavItem to="/aptitude" icon={BrainCircuit} label="Aptitude Test" isCompleted={completedSteps.includes('aptitude')} />
                            <NavItem to="/technical" icon={Code} label="Technical Test" isCompleted={completedSteps.includes('technical')} />
                            <NavItem to="/gd-arena" icon={MessageSquare} label="Group Discussion" isCompleted={completedSteps.includes('gd')} />
                            <NavItem to="/hr-module" icon={Users} label="Face to Face (HR)" isCompleted={completedSteps.includes('hr')} />
                        </div>
                    </div>
                </nav>

                {/* Resume Analyzer - Hide during assessment */}
                {!isAssessmentActive && (
                    <div className="p-3 border-t border-white/10 z-10">
                        <div className="px-3 mb-2 flex items-center gap-2">
                            <FileText size={14} className="text-cyan-400" />
                            <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Resume Analysis</p>
                        </div>
                        <NavItem to="/resume-analyzer" icon={FileText} label="Resume Analyzer" />
                    </div>
                )}

                {/* Bottom Section - REMOVED */}
                {/* User menu moved to top right header */}
            </aside>
        </>
    );
};

const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm transition-all duration-300 group relative overflow-hidden ${isActive ? 'text-white bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 shadow-lg shadow-emerald-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'}`}
    >
        {({ isActive }) => (
            <>
                {isActive && (
                    <>
                        <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl"
                            initial={false}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-lg -z-10 animate-pulse-glow" />
                    </>
                )}
                <div className="relative z-10 flex items-center gap-3 w-full">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <Icon
                            size={18}
                            strokeWidth={2.2}
                            className={`${isActive ? 'text-emerald-400' : 'group-hover:text-emerald-400 transition-colors'}`}
                        />
                    </motion.div>
                    <span className="font-medium">{label}</span>
                    {isActive && (
                        <motion.div
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50"
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    )}
                </div>
            </>
        )}
    </NavLink>
);

export default Sidebar;


