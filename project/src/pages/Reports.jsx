import React from 'react';
import { useAssessment } from '../context/AssessmentContext';
import ScoreChart from '../components/ScoreChart';
import { Download, Share2, TrendingUp, AlertTriangle, BookOpen, BarChart2 } from 'lucide-react';

const Reports = () => {
    const { resumeSuggestions } = useAssessment();

    return (
        <div className="h-full flex flex-col overflow-hidden bg-slate-950 p-3 relative">
            {/* Compact Header */}
            <div className="flex justify-between items-center mb-3 shrink-0 h-10 border-b border-white/5 pb-2">
                <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <BarChart2 size={18} className="text-indigo-400" />
                        Analytics
                    </h2>
                    <p className="text-[10px] text-slate-400">Performance insights</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-2 py-1.5 text-[10px] bg-slate-800 text-slate-300 border border-white/10 rounded-lg flex items-center gap-1.5 hover:bg-slate-700 transition-colors font-medium">
                        <Share2 size={12} /> Share
                    </button>
                    <button className="px-2 py-1.5 text-[10px] bg-indigo-600 text-white rounded-lg flex items-center gap-1.5 hover:bg-indigo-500 transition-colors font-medium shadow-lg shadow-indigo-500/20">
                        <Download size={12} /> Export
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-1 pb-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-full">

                    {/* Left Column - Visual Breakdown & Chart */}
                    <div className="flex flex-col gap-3 h-full">
                        <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 flex-1 flex flex-col min-h-[50%]">
                            <h3 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                                <TrendingUp size={12} className="text-indigo-400" />
                                IRS™ Composition
                            </h3>
                            <div className="flex-1 min-h-0 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <ScoreChart />
                                </div>
                            </div>
                        </div>

                        {/* Resume & Assessment Suggestions (Moved here for better balance) */}
                        <div className="p-3 rounded-xl bg-indigo-900/10 border border-indigo-500/10 flex-1 flex flex-col min-h-0">
                            <div className="flex items-center gap-1.5 mb-2 shrink-0">
                                <BookOpen className="text-indigo-400" size={12} />
                                <h3 className="text-xs font-bold text-white">Assessment & Resume Suggestions</h3>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                                {resumeSuggestions && resumeSuggestions.length > 0 ? (
                                    <ul className="space-y-1.5">
                                        {resumeSuggestions.map((suggestion, index) => (
                                            <li key={index} className="flex items-start gap-1.5 text-[10px] text-slate-300 leading-snug">
                                                <span className="text-indigo-400 mt-0.5">•</span>
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mb-2">
                                            <BookOpen size={14} className="text-slate-500" />
                                        </div>
                                        <p className="text-[10px] text-slate-500">Complete assessments to get personalized suggestions.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - AI Insights & Learning Path */}
                    <div className="flex flex-col gap-3 h-full">
                        <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-1">
                            <h3 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5 sticky top-0 bg-slate-950 z-10 py-1">
                                <AlertTriangle size={12} className="text-amber-400" />
                                Key Insights
                            </h3>
                            <InsightCard
                                icon={TrendingUp}
                                color="text-emerald-400"
                                bg="bg-emerald-500/10"
                                border="border-emerald-500/20"
                                title="Strong Growth"
                                desc="Technical vocabulary score increased by 15% over last 3 sessions."
                            />
                            <InsightCard
                                icon={AlertTriangle}
                                color="text-amber-400"
                                bg="bg-amber-500/10"
                                border="border-amber-500/20"
                                title="Attention Area"
                                desc="Filler word usage is 20% higher in high-pressure scenarios."
                            />
                            <InsightCard
                                icon={BookOpen}
                                color="text-blue-400"
                                bg="bg-blue-500/10"
                                border="border-blue-500/20"
                                title="Knowledge Gap"
                                desc="Consider reviewing System Design concepts for better score stability."
                            />
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 flex-1 flex flex-col min-h-0">
                            <div className="flex items-center gap-1.5 mb-2 shrink-0">
                                <BookOpen className="text-indigo-400" size={12} />
                                <h3 className="text-xs font-bold text-white">Recommended Learning Path</h3>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                                <ul className="space-y-1.5">
                                    <PathItem title="System Design Patterns" duration="45min" level="Advanced" />
                                    <PathItem title="Handling Conflict" duration="20min" level="Intermediate" />
                                    <PathItem title="Mock Interview Strategy" duration="1hr" level="All Levels" />
                                    <PathItem title="Data Structures Refresher" duration="30min" level="Beginner" />
                                    <PathItem title="Negotiation Tactics" duration="15min" level="Intermediate" />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InsightCard = ({ icon: Icon, color, bg, border, title, desc }) => (
    <div className={`p-2.5 rounded-xl ${bg || 'bg-slate-900/50'} border ${border || 'border-white/5'} flex gap-2.5 items-start transition-all hover:bg-opacity-80`}>
        <div className={`p-1.5 rounded-lg bg-black/20 ${color} shrink-0`}>
            <Icon size={14} />
        </div>
        <div>
            <h4 className={`text-[11px] font-bold ${color} mb-0.5`}>{title}</h4>
            <p className="text-slate-300 text-[10px] leading-relaxed">{desc}</p>
        </div>
    </div>
)

const PathItem = ({ title, duration, level }) => (
    <li className="flex justify-between items-center p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/50 transition-all cursor-pointer border border-white/5 group">
        <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-slate-200 text-[10px] group-hover:text-white transition-colors">{title}</span>
            <span className="text-[8px] text-slate-500">{level}</span>
        </div>

        <span className="text-[9px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/10">{duration}</span>
    </li>
)

export default Reports;
