import React, { useState, useEffect } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { Code, Play, CheckCircle } from 'lucide-react';
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
        <div className="h-[calc(100vh-4rem)] flex flex-col">
            <header className="mb-3 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-white">Technical Assessment</h2>
                    <p className="text-slate-400 text-xs">Topic: <strong>Advanced React Patterns</strong> • Difficulty: <strong>Hard</strong></p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleNext} className="px-4 py-2 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center gap-2">
                        {step === totalSteps ? (
                            <>Finish <CheckCircle size={14} /></>
                        ) : (
                            <>Run & Next <Play size={14} /></>
                        )}
                    </button>
                </div>
            </header>

            <Stepper currentStep={step} totalSteps={totalSteps} label={`Question ${step} of ${totalSteps}`} />

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
                {/* Left: Code / Question */}
                <div className="flex flex-col gap-3 h-full overflow-hidden">
                    <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex-shrink-0">
                        <h3 className="text-sm font-bold text-white mb-2">Problem Statement {step}</h3>
                        <p className="text-slate-300 leading-relaxed text-xs">
                            {step === 1 && "Implement a custom hook `useThrottle` that throttles a function execution. The hook should accept a function and a delay, returning a throttled version."}
                            {step === 2 && "Refactor this component to use the Composition pattern instead of Prop Drilling."}
                            {step === 3 && "Identify and fix the memory leak in the provided useEffect hook."}
                            {step === 4 && "Optimize the rendering performance of this wide list using virtualization."}
                        </p>
                    </div>

                    <div className="flex-grow bg-[#1e1e1e] rounded-xl border border-white/10 p-3 font-mono text-xs text-slate-300 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-7 bg-[#252526] flex items-center px-3 text-[10px] text-slate-500 gap-2">
                            <Code size={10} /> editor.js
                        </div>
                        <textarea className="w-full h-full bg-transparent resize-none focus:outline-none pt-7" defaultValue={`function solution() {\n  // Write your code for Question ${step} here\n}`} />
                    </div>
                </div>

                {/* Right: AI Interviewer */}
                <div className="h-full">
                    <VoiceInterface />
                </div>
            </div>
        </div>
    );
};

export default TechnicalAssessment;
