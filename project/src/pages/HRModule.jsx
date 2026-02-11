import React, { useState, useEffect } from 'react';
import { User, Activity, Clock, Play, Pause, RotateCcw, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import VoiceInterface from '../components/VoiceInterface';
import { useTimer } from '../hooks/useTimer';

const HRModule = () => {
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

    // Simulate real-time sentiment changes
    useEffect(() => {
        if (sessionStarted && isRunning) {
            const interval = setInterval(() => {
                setConfidence(prev => Math.min(100, prev + (Math.random() > 0.5 ? 1 : -1)));
                setStressLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() > 0.6 ? 1 : -1))));
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [sessionStarted, isRunning]);

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
        <div className="h-full flex flex-col gap-4 p-4 overflow-hidden">
            <header className="shrink-0 flex flex-col md:flex-row justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Behavioral Interview</h2>
                    <p className="text-slate-400">STAR Method Analysis Enabled</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Difficulty Selector */}
                    <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/5">
                        {['easy', 'medium', 'hard'].map((level) => (
                            <button
                                key={level}
                                onClick={() => setDifficulty(level)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${difficulty === level
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>

                    {/* Timer */}
                    <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                        <Clock className={`${isRunning ? 'text-indigo-400 animate-pulse' : 'text-slate-400'}`} size={20} />
                        <span className="text-xl font-mono text-white min-w-[80px]">{formattedTime}</span>

                        {!sessionStarted ? (
                            <button
                                onClick={handleStartSession}
                                className="ml-2 p-1.5 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors"
                                title="Start Session"
                            >
                                <Play size={16} className="text-white" />
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={isRunning ? pause : resume}
                                    className="ml-2 p-1.5 bg-indigo-500 hover:bg-indigo-400 rounded-lg transition-colors"
                                    title={isRunning ? 'Pause' : 'Resume'}
                                >
                                    {isRunning ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" />}
                                </button>
                                <button
                                    onClick={handleResetSession}
                                    className="p-1.5 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors"
                                    title="Reset Session"
                                >
                                    <RotateCcw size={16} className="text-white" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
                {/* Avatar / Visuals */}
                <div className="lg:col-span-1 space-y-4 overflow-y-auto scrollbar-thin pr-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="aspect-[3/4] rounded-3xl bg-slate-800 relative overflow-hidden group border border-white/10 shadow-2xl"
                    >
                        <img
                            src="https://img.freepik.com/free-photo/portrait-young-businesswoman-holding-eyeglasses-hand-against-gray-backdrop_23-2148029483.jpg"
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                            alt="HR Avatar"
                        />
                        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <h3 className="text-xl font-bold text-white">Sarah Jenkins</h3>
                            <p className="text-indigo-300 text-sm">HR Lead @ TechFlow</p>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-xs text-slate-300">Active</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Real-time Sentiment Analysis */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 shadow-xl"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Activity className="text-rose-400" size={20} />
                            <h4 className="font-bold text-white">Real-time Analytics</h4>
                        </div>

                        <div className="space-y-5">
                            {/* Confidence Meter */}
                            <div>
                                <div className="flex justify-between text-xs text-slate-400 mb-2">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp size={14} />
                                        <span>Confidence</span>
                                    </div>
                                    <span className={`font-semibold text-${confidenceInfo.color}-400`}>
                                        {confidenceInfo.label}
                                    </span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden relative">
                                    <motion.div
                                        className={`h-full bg-${confidenceInfo.color}-500`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${confidence}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                                <div className="text-right text-xs text-slate-500 mt-1">{confidence}%</div>
                            </div>

                            {/* Stress Level */}
                            <div>
                                <div className="flex justify-between text-xs text-slate-400 mb-2">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle size={14} />
                                        <span>Stress Level</span>
                                    </div>
                                    <span className={`font-semibold text-${stressInfo.color}-400`}>
                                        {stressInfo.label}
                                    </span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden relative">
                                    <motion.div
                                        className={`h-full bg-${stressInfo.color}-500`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stressLevel}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                                <div className="text-right text-xs text-slate-500 mt-1">{stressLevel}%</div>
                            </div>

                            {/* Tips */}
                            {sessionStarted && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="pt-4 border-t border-white/5"
                                >
                                    <h5 className="text-xs font-semibold text-slate-400 mb-2">💡 Quick Tips</h5>
                                    <ul className="text-xs text-slate-500 space-y-1">
                                        <li>• Maintain steady eye contact</li>
                                        <li>• Use the STAR framework</li>
                                        <li>• Take brief pauses to think</li>
                                        <li>• Keep answers under 2 minutes</li>
                                    </ul>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Interaction Area */}
                <div className="lg:col-span-2 h-full min-h-0 flex flex-col">
                    <VoiceInterface difficulty={difficulty} sessionActive={sessionStarted} />
                </div>
            </div>
        </div>
    );
};

export default HRModule;
