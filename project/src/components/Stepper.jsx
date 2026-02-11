import React from 'react';

const Stepper = ({ currentStep, totalSteps, label }) => {
    return (
        <div className="w-full mb-8">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Progress</span>
                    <p className="text-sm text-slate-300 font-medium mt-1">{label}</p>
                </div>
                <span className="text-2xl font-bold text-white opacity-50">{currentStep}<span className="text-base text-slate-500 font-normal">/{totalSteps}</span></span>
            </div>

            <div className="h-2 bg-slate-800 rounded-full overflow-hidden flex">
                {[...Array(totalSteps)].map((_, index) => (
                    <div
                        key={index}
                        className={`h-full transition-all duration-500 border-r border-slate-900 last:border-0 ${index < currentStep ? 'bg-indigo-500' : 'bg-transparent'
                            }`}
                        style={{ width: `${100 / totalSteps}%` }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Stepper;
