
import React, { useState, useEffect } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { Code, Play, CheckCircle, ChevronRight, Terminal, RefreshCw, Cpu, MonitorPlay } from 'lucide-react';
import Stepper from '../components/Stepper';

const QUESTIONS = [
    {
        id: 1,
        title: "Two Sum",
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
        examples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
        ],
        expectedOutput: "[0,1]",
        starterCode: {
            python: "def twoSum(nums, target):\n    # Write your code here\n    pass",
            java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n}",
            c: "int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Write your code here\n    return 0;\n}"
        }
    },
    {
        id: 2,
        title: "Palindrome Number",
        description: "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.",
        examples: [
            { input: "x = 121", output: "true" },
            { input: "x = -121", output: "false" }
        ],
        expectedOutput: "true",
        starterCode: {
            python: "def isPalindrome(x):\n    # Write your code here\n    pass",
            java: "class Solution {\n    public boolean isPalindrome(int x) {\n        // Write your code here\n        return false;\n    }\n}",
            c: "bool isPalindrome(int x) {\n    // Write your code here\n    return false;\n}"
        }
    },
    {
        id: 3,
        title: "Valid Parentheses",
        description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        examples: [
            { input: "s = '()[]{}'", output: "true" },
            { input: "s = '(]'", output: "false" }
        ],
        expectedOutput: "true",
        starterCode: {
            python: "def isValid(s):\n    # Write your code here\n    pass",
            java: "class Solution {\n    public boolean isValid(String s) {\n        // Write your code here\n        return false;\n    }\n}",
            c: "bool isValid(char * s) {\n    // Write your code here\n    return false;\n}"
        }
    },
    {
        id: 4,
        title: "Merge Sorted Array",
        description: "You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order. Merge `nums2` into `nums1` as one sorted array.",
        examples: [
            { input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", output: "[1,2,2,3,5,6]" }
        ],
        expectedOutput: "[1,2,2,3,5,6]",
        starterCode: {
            python: "def merge(nums1, m, nums2, n):\n    # Write your code here\n    pass",
            java: "class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        // Write your code here\n    }\n}",
            c: "void merge(int* nums1, int nums1Size, int m, int* nums2, int nums2Size, int n) {\n    // Write your code here\n}"
        }
    }
];

const TechnicalAssessment = () => {
    const { checkAssessmentAccess, completeStep } = useAssessment();
    const [step, setStep] = useState(1);
    const [language, setLanguage] = useState('python');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const currentQuestion = QUESTIONS[step - 1];

    useEffect(() => {
        checkAssessmentAccess('/technical');
    }, []);

    useEffect(() => {
        setCode(currentQuestion.starterCode[language]);
        setOutput(null);
    }, [step, language]);

    const handleRunCode = () => {
        setIsRunning(true);
        // Simulate code execution delay
        setTimeout(() => {
            const isSuccess = Math.random() > 0.3; // Random success for demo

            setOutput({
                status: isSuccess ? 'Success' : 'Error',
                message: isSuccess ? 'All test cases passed!' : 'Test case failed: Input mismatch',
                actualOutput: isSuccess ? currentQuestion.expectedOutput : 'undefined',
                executionTime: '42ms'
            });
            setIsRunning(false);
        }, 1500);
    };

    const handleNext = () => {
        if (step < QUESTIONS.length) {
            setStep(prev => prev + 1);
        } else {
            const suggestions = ["Deepen knowledge of Algorithms", "Practice more LeetCode patterns"];
            completeStep('technical', suggestions);
        }
    };

    return (
        <div className="h-full flex flex-col gap-2 p-2 relative overflow-hidden bg-slate-950 text-slate-200">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
            </div>

            {/* Header */}
            <header className="shrink-0 flex justify-between items-center bg-slate-900/50 p-3 rounded-xl border border-white/5 relative z-10 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
                        <Terminal size={18} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white leading-none">Coding Challenge</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">Level {step}</span>
                            <span className="text-[10px] text-slate-500">Algorithm & Data Structures</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Stepper currentStep={step} totalSteps={QUESTIONS.length} label="" />
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-emerald-900/20 transition-all hover:scale-105 active:scale-95"
                    >
                        {step === QUESTIONS.length ? (
                            <>Finish <CheckCircle size={14} /></>
                        ) : (
                            <>Next <ChevronRight size={14} /></>
                        )}
                    </button>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 relative z-10">

                {/* Left Panel: Problem Statement */}
                <div className="lg:col-span-5 flex flex-col gap-3 min-h-0">
                    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 flex-grow flex flex-col backdrop-blur-sm overflow-hidden">
                        <div className="flex items-center gap-2 mb-4">
                            <h3 className="text-lg font-bold text-white">{step}. {currentQuestion.title}</h3>
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[10px] font-bold border border-amber-500/20">Medium</span>
                        </div>

                        <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 space-y-4">
                            <p className="text-sm text-slate-300 leading-relaxed font-normal">
                                {currentQuestion.description}
                            </p>

                            <div className="space-y-3">
                                {currentQuestion.examples.map((ex, idx) => (
                                    <div key={idx} className="bg-slate-950/50 rounded-lg p-3 border border-white/5">
                                        <p className="text-xs font-bold text-slate-400 mb-1">Example {idx + 1}:</p>
                                        <div className="space-y-1 font-mono text-xs">
                                            <div className="flex gap-2">
                                                <span className="text-slate-500 select-none">Input:</span>
                                                <span className="text-emerald-400">{ex.input}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-slate-500 select-none">Output:</span>
                                                <span className="text-cyan-400">{ex.output}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-lg p-3">
                                <p className="text-xs font-bold text-indigo-300 mb-1">Expected Output Format:</p>
                                <p className="text-xs text-indigo-200/70 font-mono">{currentQuestion.expectedOutput}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Code Editor */}
                <div className="lg:col-span-7 flex flex-col gap-3 min-h-0">
                    <div className="bg-[#1e1e1e] rounded-xl border border-white/10 flex flex-col flex-grow shadow-2xl overflow-hidden relative">
                        {/* Editor Toolbar */}
                        <div className="h-10 bg-[#252526] flex items-center justify-between px-3 border-b border-black shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <Code size={14} />
                                    <span className="font-bold">Code Editor</span>
                                </div>
                                <div className="h-4 w-px bg-white/10"></div>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="bg-transparent text-xs text-emerald-400 font-bold focus:outline-none cursor-pointer"
                                >
                                    <option value="python">Python 3</option>
                                    <option value="java">Java 17</option>
                                    <option value="c">C (GCC)</option>
                                </select>
                            </div>

                            <button
                                onClick={() => setCode(currentQuestion.starterCode[language])}
                                className="text-slate-500 hover:text-slate-300 transition-colors"
                                title="Reset Code"
                            >
                                <RefreshCw size={14} />
                            </button>
                        </div>

                        {/* Textarea Area */}
                        <div className="flex-grow relative group">
                            <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#1e1e1e] border-r border-white/5 flex flex-col items-end pt-3 gap-[1.15rem] pr-2 select-none text-slate-600 font-mono text-xs opacity-50">
                                {[...Array(20)].map((_, i) => <span key={i}>{i + 1}</span>)}
                            </div>
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full h-full bg-[#1e1e1e] text-slate-300 font-mono text-sm pl-12 p-3 resize-none focus:outline-none custom-scrollbar leading-relaxed"
                                spellCheck="false"
                            />
                        </div>

                        {/* Action Bar */}
                        <div className="bg-[#2d2d2d] p-2 flex justify-end gap-2 border-t border-black">
                            <button className="px-3 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-all">
                                Custom Testcase
                            </button>
                            <button
                                onClick={handleRunCode}
                                disabled={isRunning}
                                className="px-4 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isRunning ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
                                Run Code
                            </button>
                        </div>
                    </div>

                    {/* Output Console */}
                    <div className="h-32 bg-[#1e1e1e] rounded-xl border border-white/10 p-3 flex flex-col overflow-hidden shrink-0">
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                            <MonitorPlay size={14} className="text-slate-400" />
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Console Output</span>
                        </div>

                        <div className="flex-grow overflow-y-auto font-mono text-xs">
                            {isRunning ? (
                                <div className="flex items-center gap-2 text-slate-400 h-full justify-center opacity-70">
                                    <Cpu size={16} className="animate-bounce" />
                                    Compiling & Executing...
                                </div>
                            ) : output ? (
                                <div className="space-y-2">
                                    <div className={`flex items-center gap-2 font-bold ${output.status === 'Success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {output.status === 'Success' ? <CheckCircle size={14} /> : <div className="w-3.5 h-3.5 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500">!</div>}
                                        {output.message}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div className="bg-black/30 p-2 rounded border border-white/5">
                                            <span className="text-slate-500 block mb-1">Your Output:</span>
                                            <span className={output.status === 'Success' ? 'text-emerald-300' : 'text-rose-300'}>
                                                {output.actualOutput}
                                            </span>
                                        </div>
                                        <div className="bg-black/30 p-2 rounded border border-white/5">
                                            <span className="text-slate-500 block mb-1">Expected:</span>
                                            <span className="text-slate-300">{currentQuestion.expectedOutput}</span>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 mt-1">Runtime: {output.executionTime}</p>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-2">
                                    <p>Run your code to see output</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicalAssessment;
