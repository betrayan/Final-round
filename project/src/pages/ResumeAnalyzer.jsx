import React, { useState, useEffect } from 'react';
import { useGlobal } from '../context/GlobalContext';
import { useAssessment } from '../context/AssessmentContext';
import { UploadCloud, FileText, CheckCircle, PieChart, AlertCircle, TrendingUp, Sparkles, Smile, RefreshCw, Cpu, BookOpen, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeResume } from '../utils/resumeAnalyzer';

const RESUME_FACTS = [
    { type: 'fact', text: "Recruiters spend an average of 7.4 seconds scanning a resume initially.", icon: <Sparkles size={16} /> },
    { type: 'fact', text: "75% of resumes are never read by a human due to ATS filtering.", icon: <Cpu size={16} /> },
    { type: 'joke', text: "My resume is just a list of things I never want to do again.", icon: <Smile size={16} /> },
    { type: 'fact', text: "Including a photo on your resume can actually decrease your chances in the US/UK.", icon: <AlertCircle size={16} /> },
    { type: 'joke', text: "I put 'very organized' on my resume, but I lost the file three times.", icon: <Smile size={16} /> },
    { type: 'fact', text: "Soft skills are listed in 90% of job postings but only 50% of resumes.", icon: <BookOpen size={16} /> },
    { type: 'insight', text: "Cybersecurity and AI skills have seen a 40% demand increase in 2024.", icon: <TrendingUp size={16} /> }
];

const MARKET_INSIGHTS = [
    { title: "Trending Now", text: "React & TypeScript dominance continues in Frontend roles.", color: "text-blue-400" },
    { title: "Salary Watch", text: "AI-literate developers are commanding 15-20% higher base salaries.", color: "text-emerald-400" },
    { title: "Remote Work", text: "Hybrid roles are stabilizing, but fully remote positions for seniors are competitive.", color: "text-purple-400" }
];

const ResumeAnalyzer = () => {
    const { resumeData, uploadResume } = useGlobal();
    const { addResumeSuggestions } = useAssessment();
    const [isReanalyzing, setIsReanalyzing] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(RESUME_FACTS[0]);
    const [marketTip, setMarketTip] = useState(MARKET_INSIGHTS[0]);

    useEffect(() => {
        setMarketTip(MARKET_INSIGHTS[Math.floor(Math.random() * MARKET_INSIGHTS.length)]);
    }, []);

    useEffect(() => {
        let interval;
        if (isReanalyzing) {
            interval = setInterval(() => {
                setLoadingMessage(RESUME_FACTS[Math.floor(Math.random() * RESUME_FACTS.length)]);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isReanalyzing]);

    const handleFileUpload = async (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile && uploadedFile.type === 'application/pdf') {
            setIsReanalyzing(true);

            // Artificial delay to show facts/jokes
            setTimeout(async () => {
                try {
                    const results = await analyzeResume(uploadedFile);
                    uploadResume(results);

                    // Add suggestions to global report
                    if (results.missingSkills && results.missingSkills.length > 0) {
                        const suggestions = results.missingSkills.slice(0, 3).map(skill => `Resume Gap: Missing keyword '${skill}'`);
                        addResumeSuggestions(suggestions);
                    }
                } catch (error) {
                    console.error("Analysis error", error);
                } finally {
                    setIsReanalyzing(false);
                }
            }, 4000); // 4s analysis time to show at least 2 facts
        }
    };

    return (
        <div className="h-full flex flex-col relative overflow-hidden bg-slate-950 font-sans selection:bg-indigo-500/30">
            {/* Dynamic Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                        rotate: [0, 45, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-indigo-600/20 blur-[100px] rounded-full mix-blend-screen"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.15, 0.1],
                        x: [0, -50, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen"
                />
            </div>

            {/* Glassmorphic Header */}
            <header className="shrink-0 flex items-center justify-between px-6 py-4 relative z-20 bg-slate-900/40 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                        <FileText size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Resume Intelligence</h2>
                        <p className="text-xs text-slate-400 font-medium">AI-Powered ATS & Skill Analysis</p>
                    </div>
                </div>

                {resumeData && !isReanalyzing && (
                    <label className="cursor-pointer group relative overflow-hidden px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all duration-300 shadow-lg shadow-indigo-900/20 flex items-center gap-2">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        <UploadCloud size={16} />
                        <span className="text-sm font-semibold">Upload New</span>
                        <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
                    </label>
                )}
            </header>

            <div className="flex-grow relative z-10 px-4 py-4 overflow-hidden flex flex-col">
                <AnimatePresence mode='wait'>
                    {isReanalyzing ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            className="h-full w-full flex flex-col items-center justify-center p-4"
                        >
                            {/* Animated Scanner */}
                            <div className="relative w-32 h-32 mb-8">
                                <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full animate-pulse"></div>
                                <motion.div
                                    className="absolute inset-0 border-4 border-t-indigo-500 border-r-indigo-400 border-b-transparent border-l-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                ></motion.div>
                                <motion.div
                                    className="absolute inset-4 bg-indigo-500/10 rounded-full flex items-center justify-center backdrop-blur-sm"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <FileText size={40} className="text-indigo-400" />
                                </motion.div>
                            </div>

                            {/* Facts & Jokes Carousel */}
                            <div className="h-32 w-full max-w-lg text-center relative flex items-center justify-center">
                                <AnimatePresence mode='wait'>
                                    <motion.div
                                        key={loadingMessage.text}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute w-full px-4"
                                    >
                                        <div className="flex items-center justify-center gap-2 text-indigo-300 mb-3">
                                            <div className="p-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                                                {loadingMessage.icon}
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-wider">{loadingMessage.type}</span>
                                        </div>
                                        <p className="text-slate-200 text-lg font-medium leading-relaxed">"{loadingMessage.text}"</p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="mt-8 w-64 bg-slate-800/50 rounded-full h-1.5 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 4, ease: "linear" }}
                                />
                            </div>
                        </motion.div>
                    ) : !resumeData ? (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="h-full w-full flex items-center justify-center p-4"
                        >
                            <label className="group relative w-full max-w-2xl aspect-video rounded-3xl border-2 border-dashed border-slate-700 hover:border-indigo-500/50 transition-all duration-300 bg-slate-900/30 hover:bg-slate-900/50 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                                <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />

                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 p-5 bg-slate-800/80 rounded-2xl mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 border border-slate-700 group-hover:border-indigo-500/30">
                                    <UploadCloud size={48} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Drop your resume here</h3>
                                <p className="text-slate-400 max-w-md text-center mb-8">
                                    Upload your PDF to get instant <span className="text-indigo-400 font-medium">ATS scoring</span>, <span className="text-purple-400 font-medium">skill gap analysis</span>, and <span className="text-emerald-400 font-medium">market insights</span>.
                                </p>

                                <div className="flex gap-4 text-xs text-slate-500 font-mono">
                                    <span className="flex items-center gap-1"><FileText size={12} /> PDF Only</span>
                                    <span className="flex items-center gap-1"><Share2 size={12} /> Secure</span>
                                    <span className="flex items-center gap-1"><TrendingUp size={12} /> Instant</span>
                                </div>
                            </label>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full grid grid-cols-1 md:grid-cols-12 gap-6 overflow-y-auto pr-2 custom-scrollbar pb-10"
                        >
                            {/* Main Stats Column */}
                            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                                {/* Score Card */}
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="p-6 rounded-3xl bg-slate-900/60 border border-white/5 backdrop-blur-md relative overflow-hidden group hover:border-indigo-500/20 transition-colors"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <PieChart size={120} />
                                    </div>

                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                                        Override Match
                                    </h3>

                                    <div className="flex flex-col items-center">
                                        <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                                            <svg className="w-full h-full -rotate-90">
                                                {/* Background Circle */}
                                                <circle cx="96" cy="96" r="80" fill="transparent" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
                                                {/* Progress Circle */}
                                                <motion.circle
                                                    cx="96" cy="96" r="80"
                                                    fill="transparent"
                                                    stroke={resumeData.totalScore > 75 ? "#10b981" : resumeData.totalScore > 50 ? "#f59e0b" : "#f43f5e"}
                                                    strokeWidth="12"
                                                    strokeDasharray={2 * Math.PI * 80}
                                                    strokeDashoffset={2 * Math.PI * 80 * (1 - resumeData.totalScore / 100)}
                                                    strokeLinecap="round"
                                                    initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                                                    animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - resumeData.totalScore / 100) }}
                                                    transition={{ duration: 2, ease: "easeOut" }}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                                <span className="text-5xl font-black text-white tracking-tighter">{resumeData.totalScore}</span>
                                                <span className="text-xs font-bold text-slate-500 uppercase mt-2">ATS Score</span>
                                            </div>
                                        </div>

                                        <div className={`text-center px-4 py-2 rounded-xl border ${resumeData.totalScore > 75
                                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                                : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                            }`}>
                                            <p className="font-bold text-sm">
                                                {resumeData.totalScore > 75 ? "Excellent Profile Structure" : "Optimization Recommended"}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Market Facts Card */}
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border border-white/5 backdrop-blur-md relative overflow-hidden"
                                >
                                    <div className="flex items-center gap-2 mb-4 relative z-10">
                                        <div className="p-1.5 bg-indigo-500/20 rounded-lg text-indigo-400">
                                            <TrendingUp size={16} />
                                        </div>
                                        <h3 className="text-white font-bold text-sm">Market Insight</h3>
                                    </div>
                                    <div className="space-y-3 relative z-10">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{marketTip.title}</p>
                                        <p className={`text-sm font-medium ${marketTip.color} leading-relaxed`}>
                                            "{marketTip.text}"
                                        </p>
                                        <div className="pt-2 flex gap-2">
                                            <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-slate-400 border border-white/5">#career</span>
                                            <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-slate-400 border border-white/5">#growth</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Details Column */}
                            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                                {/* Real Skills Analysis */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="p-6 rounded-3xl bg-slate-900/60 border border-white/5 backdrop-blur-md"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                                                <CheckCircle size={20} />
                                            </div>
                                            <h3 className="text-lg font-bold text-white">Detected Skills & Proficiency</h3>
                                        </div>
                                        <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded-lg">{resumeData.gapAnalysis.length} Analyzed</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {resumeData.gapAnalysis.map((item, index) => (
                                            <div key={index} className="group p-4 rounded-2xl bg-slate-800/30 hover:bg-slate-800/50 border border-white/5 transition-all">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="font-bold text-slate-200 text-sm">{item.skill}</span>
                                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-lg ${item.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${item.score}%` }}
                                                        transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                                                        className={`h-full rounded-full ${item.score > 70 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                                                                item.score > 40 ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
                                                                    'bg-gradient-to-r from-rose-500 to-rose-400'
                                                            }`}
                                                    />
                                                </div>
                                                <div className="mt-2 flex justify-between items-center">
                                                    <span className="text-[10px] text-slate-500">Relevance Score</span>
                                                    <span className="text-[10px] font-mono text-slate-400">{item.score}/100</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Improvement Areas & Facts */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Improvements */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="p-6 rounded-3xl bg-slate-900/60 border border-white/5 backdrop-blur-md"
                                    >
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                                                <AlertCircle size={20} />
                                            </div>
                                            <h3 className="text-base font-bold text-white">Critical Gaps</h3>
                                        </div>

                                        <div className="space-y-3 max-h-[220px] overflow-y-auto custom-scrollbar pr-2">
                                            {resumeData.missingSkills.length > 0 ? (
                                                resumeData.missingSkills.map((skill, idx) => (
                                                    <div key={idx} className="flex gap-3 items-start p-3 rounded-xl bg-white/5 border border-white/5 hover:border-rose-500/30 transition-colors group">
                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 group-hover:scale-125 transition-transform" />
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-200">Missing Keyword: <span className="text-white font-bold">{skill}</span></p>
                                                            <p className="text-[10px] text-slate-400 mt-1">Recruiters often search for this specific term.</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-8 text-center h-full">
                                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3 text-emerald-400">
                                                        <Sparkles size={24} />
                                                    </div>
                                                    <p className="text-emerald-400 font-bold">Excellent!</p>
                                                    <p className="text-slate-500 text-xs mt-1">No critical keyword gaps found.</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>

                                    {/* Fun Fact / Joke */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="p-6 rounded-3xl bg-gradient-to-br from-purple-900/40 to-slate-900/40 border border-white/5 backdrop-blur-md flex flex-col"
                                    >
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                                <Smile size={20} />
                                            </div>
                                            <h3 className="text-base font-bold text-white">Did You Know?</h3>
                                        </div>

                                        <div className="flex-grow flex items-center">
                                            <p className="text-slate-300 italic text-sm leading-loose">
                                                "{RESUME_FACTS[Math.floor(Math.random() * RESUME_FACTS.length)].text}"
                                            </p>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                                            <span className="text-[10px] text-slate-500">Unlocking IQ Points...</span>
                                            <button
                                                onClick={() => setIsReanalyzing(true)}
                                                className="flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                                            >
                                                <RefreshCw size={12} className={isReanalyzing ? "animate-spin" : ""} />
                                                Re-Analyze
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ResumeAnalyzer;
