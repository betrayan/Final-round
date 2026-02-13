import React, { useState, useEffect } from 'react';
import { User, Activity, Clock, Play, Pause, RotateCcw, TrendingUp, AlertCircle, CheckCircle, Brain, HeartPulse, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceInterface from '../components/VoiceInterface';
import { useTimer } from '../hooks/useTimer';
import { useAssessment } from '../context/AssessmentContext';

const HRModule = () => {
    const { checkAssessmentAccess, completeStep } = useAssessment();
    const [difficulty, setDifficulty] = useState('medium');
    const [confidence, setConfidence] = useState(85);
    const [stressLevel, setStressLevel] = useState(45);
    const [sessionStarted, setSessionStarted] = useState(false);

    // Timer hook with 30 minutes default
    const {
        formattedTime,
        isRunning,
        isPaused,
        start,
        pause,
        resume,
        reset
    } = useTimer(1800, () => {
        alert('Session time completed!');
    });

    useEffect(() => {
        checkAssessmentAccess('/hr-module');
    }, []);

    // Simulate real-time sentiment changes
    useEffect(() => {
        if (sessionStarted && isRunning) {
            const interval = setInterval(() => {
                setConfidence(prev => Math.min(100, Math.max(0, prev + (Math.random() > 0.5 ? 2 : -2))));
                setStressLevel(prev => Math.min(100, Math.max(0, prev + (Math.random() > 0.6 ? 2 : -2))));
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [sessionStarted, isRunning]);

    const handleFinish = () => {
        const suggestions = ["Maintain eye contact", "Structure answers with STAR method"];
        completeStep('hr', suggestions);
    };

    const handleStartSession = () => {
        setSessionStarted(true);
        start();
    };

    const handleResetSession = () => {
        if (confirm('Are you sure you want to restart the session?')) {
            reset();
            setSessionStarted(false);
            setConfidence(85);
            setStressLevel(45);
        }
    };

    const getConfidenceLevel = (value) => {
        if (value >= 80) return { label: 'Excellent', color: 'emerald' };
        if (value >= 60) return { label: 'Good', color: 'blue' };
        if (value >= 40) return { label: 'Fair', color: 'amber' };
        return { label: 'Low', color: 'rose' };
    };

    const getStressLevel = (value) => {
        if (value >= 70) return { label: 'High', color: 'rose' };
        if (value >= 40) return { label: 'Moderate', color: 'amber' };
        return { label: 'Low', color: 'emerald' };
    };

    const confidenceInfo = getConfidenceLevel(confidence);
    const stressInfo = getStressLevel(stressLevel);

    return (
        <div className="h-full flex flex-col gap-2 p-2 overflow-hidden bg-slate-950 relative">
            {/* Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <header className="shrink-0 flex items-center justify-between bg-slate-900/40 backdrop-blur-xl border border-white/5 p-2 px-3 rounded-xl relative z-10 h-14">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                            <img src="https://img.freepik.com/free-photo/portrait-young-businesswoman-holding-eyeglasses-hand-against-gray-backdrop_23-2148029483.jpg" className="w-full h-full object-cover opacity-90" alt="HR" />
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-white leading-none">Sarah Jenkins</h2>
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] mt-0.5">
                            HR Lead • TechFlow
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Difficulty */}
                    <div className="hidden md:flex bg-slate-800/80 p-0.5 rounded-lg border border-white/5">
                        {['easy', 'medium', 'hard'].map((level) => (
                            <button
                                key={level}
                                onClick={() => setDifficulty(level)}
                                className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${difficulty === level
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>

                    <div className="h-6 w-px bg-white/10 mx-1 hidden md:block"></div>

                    {/* Timer */}
                    <div className="flex items-center gap-2 bg-slate-800/80 px-2 py-1.5 rounded-lg border border-white/5 text-white font-mono text-sm font-bold">
                        <Clock size={12} className={isRunning ? 'text-indigo-400 animate-pulse' : 'text-slate-500'} />
                        {formattedTime}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-1">
                        {!sessionStarted ? (
                            <button onClick={handleStartSession} className="p-1.5 bg-emerald-500 hover:bg-emerald-400 rounded-md text-white shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
                                <Play size={14} fill="currentColor" />
                            </button>
                        ) : (
                            <>
                                <button onClick={isRunning ? pause : resume} className={`p-1.5 rounded-md text-white transition-all active:scale-95 ${isRunning ? 'bg-amber-500 hover:bg-amber-400' : 'bg-emerald-500 hover:bg-emerald-400'}`}>
                                    {isRunning ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                                </button>
                                <button onClick={handleResetSession} className="p-1.5 bg-slate-600 hover:bg-slate-500 rounded-md text-white transition-all active:scale-95">
                                    <RotateCcw size={14} />
                                </button>
                                <button onClick={handleFinish} className="p-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white transition-all active:scale-95">
                                    <CheckCircle size={14} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-2 min-h-0 relative z-10">
                {/* Visuals & Analytics Column (Smaller) */}
                <div className="lg:col-span-1 flex flex-col gap-2 min-h-0">
                    {/* Compact Analytics Card */}
                    <div className="flex-grow p-3 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/5 shadow-xl flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                        <div className="flex items-center justify-between text-white border-b border-white/5 pb-2 shrink-0">
                            <div className="flex items-center gap-2">
                                <Activity className="text-indigo-400" size={14} />
                                <h4 className="text-xs font-bold">Live Sentiment</h4>
                            </div>
                            <MoreHorizontal size={14} className="text-slate-600" />
                        </div>

                        <div className="space-y-4">
                            {/* Confidence Meter */}
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                                        <Brain size={12} /> Confidence
                                    </div>
                                    <div className={`text-xs font-bold text-${confidenceInfo.color}-400`}>
                                        {confidence}%
                                    </div>
                                </div>
                                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full rounded-full bg-gradient-to-r from-${confidenceInfo.color}-600 to-${confidenceInfo.color}-400`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${confidence}%` }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                </div>
                            </div>

                            {/* Stress Level */}
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                                        <HeartPulse size={12} /> Stress
                                    </div>
                                    <div className={`text-xs font-bold text-${stressInfo.color}-400`}>
                                        {stressLevel}%
                                    </div>
                                </div>
                                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full rounded-full bg-gradient-to-r from-${stressInfo.color}-600 to-${stressInfo.color}-400`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stressLevel}%` }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* AI Insight Overlay */}
                        <div className="mt-auto bg-indigo-500/10 border border-indigo-500/20 p-2 rounded-lg">
                            <div className="flex gap-2 items-start">
                                <Brain size={12} className="text-indigo-400 mt-0.5 shrink-0" />
                                <p className="text-[10px] text-indigo-200 leading-snug">
                                    Maintained good eye contact in the last response. Try to elaborate more on technical challenges.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interaction Area (Voice Interface - Larger) */}
                <div className="lg:col-span-3 h-full min-h-0 flex flex-col rounded-xl overflow-hidden shadow-2xl bg-slate-900/20 backdrop-blur-sm border border-white/5">
                    <VoiceInterface difficulty={difficulty} sessionActive={sessionStarted} />
                </div>
            </div>
        </div>
    );
};

export default HRModule;
