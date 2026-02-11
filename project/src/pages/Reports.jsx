import React from 'react';
import { useAssessment } from '../context/AssessmentContext';
import ScoreChart from '../components/ScoreChart';
import { Download, Share2, TrendingUp, AlertTriangle, BookOpen } from 'lucide-react';

const Reports = () => {
    const { resumeSuggestions } = useAssessment();

    return (
        <div className="h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin">
            <header className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">Analytics</h2>
                    <p className="text-xs text-slate-400">Performance insights</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-2 text-xs bg-white/5 border border-white/10 text-white rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors">
                        <Share2 size={14} /> Share
                    </button>
                    <button className="px-3 py-2 text-xs bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-500 transition-colors">
                        <Download size={14} /> Export
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Visual Breakdown */}
                <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5">
                    <h3 className="text-base font-bold text-white mb-3">IRS™ Composition</h3>
                    <div className="h-[250px]">
                        <ScoreChart />
                    </div>
                </div>

                {/* AI Insights */}
                <div className="space-y-3">
                    <InsightCard
                        icon={TrendingUp}
                        color="text-emerald-400"
                        title="Strong Growth"
                        desc="Technical vocabulary score increased by 15% over last 3 sessions."
                    />
                    <InsightCard
                        icon={AlertTriangle}
                        color="text-amber-400"
                        title="Attention Area"
                        desc="Filler word usage is 20% higher in high-pressure scenarios."
                    />
                    <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                        <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="text-indigo-400" size={16} />
                            <h3 className="text-sm font-bold text-white">Learning Path</h3>
                        </div>
                        <ul className="space-y-2">
                            <PathItem title="System Design Patterns" duration="45min" />
                            <PathItem title="Handling Conflict" duration="20min" />
                            <PathItem title="Mock Interview" duration="1hr" />
                        </ul>
                    </div>
                </div>
            </div>

            {/* Resume & Assessment Suggestions */}
            <div className="lg:col-span-2 p-4 rounded-2xl bg-indigo-900/10 border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="text-indigo-400" size={16} />
                    <h3 className="text-sm font-bold text-white">Assessment & Resume Suggestions</h3>
                </div>
                {resumeSuggestions.length > 0 ? (
                    <ul className="space-y-2">
                        {resumeSuggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs text-slate-300">
                                <span className="text-indigo-400 mt-0.5">•</span>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-xs text-slate-500">Complete assessments to get personalized suggestions.</p>
                )}
            </div>
        </div>

    );
};

const InsightCard = ({ icon: Icon, color, title, desc }) => (
    <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 flex gap-3 items-start">
        <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
            <Icon size={18} />
        </div>
        <div>
            <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
            <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
        </div>
    </div>
)

const PathItem = ({ title, duration }) => (
    <li className="flex justify-between items-center p-2 rounded-lg bg-black/20 hover:bg-white/5 transition-colors cursor-pointer">
        <span className="font-medium text-slate-200 text-xs">{title}</span>
        <span className="text-[10px] text-slate-500">{duration}</span>
    </li>
)

export default Reports;
