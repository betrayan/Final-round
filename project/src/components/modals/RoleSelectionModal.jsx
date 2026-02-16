
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check, ArrowRight, Target, Layers, X, Plus, Trash2 } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';

// Available Rounds Info (Should match AssessmentContext)
const AVAILABLE_ROUNDS = [
    { id: 'aptitude', name: 'Aptitude Test', time: '15 Mins', type: 'MCQ & Logic' },
    { id: 'technical', name: 'Technical Assessment', time: '30 Mins', type: 'Coding Challenge' },
    { id: 'gd', name: 'Group Discussion', time: '20 Mins', type: 'AI Debate' },
    { id: 'hr', name: 'Face to Face (HR)', time: '15 Mins', type: 'Face-to-Face' }
];

const RoleSelectionModal = () => {
    const { isRoleModalOpen, setIsRoleModalOpen, startAssessment } = useAssessment();
    const [role, setRole] = useState('');
    const [examName, setExamName] = useState('');

    // Custom Schedule Selection
    const [selectedRounds, setSelectedRounds] = useState([]);

    if (!isRoleModalOpen) return null;

    const toggleRound = (roundId) => {
        if (selectedRounds.includes(roundId)) {
            setSelectedRounds(prev => prev.filter(id => id !== roundId));
        } else {
            setSelectedRounds(prev => [...prev, roundId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (role.trim() && examName.trim() && selectedRounds.length > 0) {
            // Pass the custom ordered list of rounds
            startAssessment(role, examName, selectedRounds);
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
                        className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 animate-gradient-x"></div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsRoleModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded-full z-10"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-6 shrink-0">
                            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <span className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                                    <Target size={20} />
                                </span>
                                Configure Assessment
                            </h2>
                            <p className="text-slate-400 text-sm pl-11">
                                Customize your exam session by selecting rounds and setting goals.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">

                            {/* Top Inputs: Role & Exam Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        Target Position
                                    </label>
                                    <input
                                        type="text"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        placeholder="e.g. SDE 1"
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-600 text-sm"
                                        required
                                        autoFocus
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        Session Name
                                    </label>
                                    <input
                                        type="text"
                                        value={examName}
                                        onChange={(e) => setExamName(e.target.value)}
                                        placeholder="e.g. Mock Interview 1"
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-600 text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Round Selection */}
                            <div className="space-y-3">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                                    <span>Select Rounds (Click to Add/Remove)</span>
                                    <span className="text-emerald-400">{selectedRounds.length} Selected</span>
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {AVAILABLE_ROUNDS.map((round) => {
                                        const isSelected = selectedRounds.includes(round.id);
                                        const selectionIndex = selectedRounds.indexOf(round.id) + 1;

                                        return (
                                            <button
                                                key={round.id}
                                                type="button"
                                                onClick={() => toggleRound(round.id)}
                                                className={`p-3 rounded-xl border flex items-center justify-between transition-all group ${isSelected
                                                        ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                                                        : 'bg-slate-800/30 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3 text-left">
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'
                                                        }`}>
                                                        {isSelected ? selectionIndex : <Plus size={12} />}
                                                    </div>
                                                    <div>
                                                        <h4 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                                                            {round.name}
                                                        </h4>
                                                        <p className="text-[10px] text-slate-500">{round.type}</p>
                                                    </div>
                                                </div>
                                                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${isSelected ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-500 border-slate-700'
                                                    }`}>
                                                    {round.time}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Selected Schedule Preview */}
                            {selectedRounds.length > 0 && (
                                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <Layers size={14} className="text-emerald-400" />
                                        Your Session Schedule
                                    </h3>
                                    <div className="space-y-2 relative">
                                        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-700/50"></div>
                                        {selectedRounds.map((roundId, idx) => {
                                            const round = AVAILABLE_ROUNDS.find(r => r.id === roundId);
                                            return (
                                                <div key={idx} className="relative flex items-center gap-3 pl-8 animate-in fade-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${idx * 0.1}s` }}>
                                                    <div className="absolute left-[0.2rem] w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900 z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                                    <div className="flex-grow flex justify-between items-center text-xs bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
                                                        <span className="text-slate-200 font-medium">{round.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleRound(round.id)}
                                                            className="text-slate-500 hover:text-rose-400 transition-colors"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                        </form>

                        <div className="mt-4 shrink-0 pt-4 border-t border-slate-800">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={!role || !examName || selectedRounds.length === 0}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Start Custom Assessment
                                <ArrowRight size={18} />
                            </button>
                            {selectedRounds.length === 0 && (
                                <p className="text-center text-[10px] text-rose-400 mt-2">
                                    * Please select at least one round to proceed
                                </p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RoleSelectionModal;
