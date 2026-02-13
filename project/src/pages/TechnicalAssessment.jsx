import React, { useState, useEffect } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { Code, Play, CheckCircle, ChevronRight, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VoiceInterface from '../components/VoiceInterface';
import Stepper from '../components/Stepper';

const TechnicalAssessment = () => {
    const { checkAssessmentAccess, completeStep } = useAssessment();
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    useEffect(() => {
        checkAssessmentAccess('/technical');
    }, []);

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(prev => prev + 1);
        } else {
            const suggestions = ["Deepen knowledge of React hooks", "Practice performance optimization"];
            completeStep('technical', suggestions);
        }
    };

    return (
        <div className="h-full flex flex-col gap-2 p-2 relative overflow-hidden bg-slate-950">
            {/* Deep Space Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 blur-[100px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-900/10 blur-[80px] rounded-full mix-blend-screen" />
            </div>

            <header className="shrink-0 flex justify-between items-center bg-slate-900/50 p-3 rounded-xl border border-white/5 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
                        <Terminal size={18} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white leading-none">Technical Assessment</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">Hard</span>
                            <span className="text-[10px] text-slate-500">Advanced React Patterns</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Stepper currentStep={step} totalSteps={totalSteps} label="" />
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-emerald-900/20 transition-all hover:scale-105 active:scale-95"
                    >
                        {step === totalSteps ? (
                            <>Finish <CheckCircle size={14} /></>
                        ) : (
                            <>Next <ChevronRight size={14} /></>
                        )}
                    </button>
                </div>
            </header>

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-0 relative z-10">
                {/* Left: Code / Question (Scrollable internally) */}
                <div className="flex flex-col gap-2 h-full min-h-0">
                    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-3 flex-shrink-0 backdrop-blur-sm">
                        <h3 className="text-xs font-bold text-cyan-400 mb-1 uppercase tracking-wider">Problem {step}</h3>
                        <p className="text-slate-300 text-xs leading-relaxed">
                            {step === 1 && "Implement a custom hook `useThrottle` that throttles a function execution. The hook should accept a function and a delay, returning a throttled version."}
                            {step === 2 && "Refactor this component to use the Composition pattern instead of Prop Drilling."}
                            {step === 3 && "Identify and fix the memory leak in the provided useEffect hook."}
                            {step === 4 && "Optimize the rendering performance of this wide list using virtualization."}
                        </p>
                    </div>

                    <div className="flex-grow bg-[#1e1e1e] rounded-xl border border-white/10 flex flex-col overflow-hidden shadow-2xl">
                        <div className="h-7 bg-[#252526] flex items-center px-3 text-[10px] text-slate-500 gap-2 border-b border-black">
                            <Code size={10} />
                            <span>solution.js</span>
                        </div>
                        <div className="flex-grow relative">
                            <textarea
                                className="w-full h-full bg-[#1e1e1e] text-slate-300 font-mono text-xs p-3 resize-none focus:outline-none custom-scrollbar"
                                spellCheck="false"
                                defaultValue={`function solution() {\n  // Write your code for Question ${step} here\n  \n  return true;\n}`}
                            />
                        </div>
                    </div>
                </div>

                {/* Right: AI Interviewer */}
                <div className="h-full min-h-0 overflow-hidden rounded-xl bg-slate-900/30 border border-white/5 backdrop-blur-sm">
                    <VoiceInterface />
                </div>
            </div>
        </div>
    );
};

export default TechnicalAssessment;
