import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check, ArrowRight, Target, Layers } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';

const RoleSelectionModal = () => {
    const { isRoleModalOpen, setIsRoleModalOpen, startAssessment } = useAssessment();
    const [role, setRole] = useState('');
    const [mode, setMode] = useState('sequence'); // 'sequence' or 'standalone'

    if (!isRoleModalOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (role.trim()) {
            startAssessment(role, mode);
        }
    };

    return (
        <AnimatePresence>
            {isRoleModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 animate-gradient-x"></div>

                        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                                <Target size={20} />
                            </span>
                            Select Your Role
                        </h2>

                        <p className="text-slate-400 text-sm mb-6 pl-11">
                            Choose your target job profile to customize the assessment experience.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Role Input */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    Target Position
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        placeholder="e.g. Frontend Developer"
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-600"
                                        required
                                        autoFocus
                                    />
                                    <div className="absolute right-3 top-3 text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                                        Required
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-wrap mt-2">
                                    {['Frontend Dev', 'UX Designer', 'Data Scientist', 'Product Manager'].map(r => (
                                        <button
                                            key={r}
                                            type="button"
                                            onClick={() => setRole(r)}
                                            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-md border border-slate-700 transition-colors"
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Mode Selection */}
                            <div className="space-y-3">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    Assessment Mode
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setMode('sequence')}
                                        className={`p-3 rounded-xl border flex flex-col gap-2 transition-all text-left ${mode === 'sequence'
                                                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 ring-1 ring-emerald-500/50'
                                                : 'bg-slate-800/30 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 font-bold text-sm">
                                            <Layers size={16} /> Full Assessment
                                        </div>
                                        <p className="text-[10px] opacity-80 leading-relaxed">
                                            Complete all rounds in order: Aptitude → Tech → GD → HR.
                                        </p>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setMode('standalone')}
                                        className={`p-3 rounded-xl border flex flex-col gap-2 transition-all text-left ${mode === 'standalone'
                                                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 ring-1 ring-emerald-500/50'
                                                : 'bg-slate-800/30 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 font-bold text-sm">
                                            <Target size={16} /> Single Round
                                        </div>
                                        <p className="text-[10px] opacity-80 leading-relaxed">
                                            Practice specific modules directly without following the sequence.
                                        </p>
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] mt-4"
                            >
                                {mode === 'sequence' ? 'Start Full Assessment' : 'Start Practice Session'}
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RoleSelectionModal;
