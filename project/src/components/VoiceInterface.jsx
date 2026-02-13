import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, RefreshCw, AudioWaveform, ChevronRight } from 'lucide-react';

const VoiceAssessment = ({ difficulty, sessionActive }) => {
    const [mode, setMode] = useState('low');
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [question, setQuestion] = useState("Explain the concept of Dependency Injection in software engineering.");

    const recognitionRef = useRef(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript + ' ';
                    }
                }
                if (finalTranscript) {
                    setTranscript(prev => prev + finalTranscript);
                }
            };
        }
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            console.warn("Speech Recognition not supported/simulated.");
            setIsListening(!isListening);
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const speakQuestion = () => {
        const utterance = new SpeechSynthesisUtterance(question);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 rounded-xl p-1 h-full flex flex-col shadow-2xl relative overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

            {/* Main Interface Content */}
            <div className="bg-slate-950/50 backdrop-blur-3xl rounded-lg p-3 h-full flex flex-col relative z-10 w-full">

                {/* Compact Header */}
                <div className="flex justify-between items-center mb-3 shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gradient-to-br from-sky-500 to-blue-600 rounded-md shadow-lg shadow-sky-500/20">
                            <AudioWaveform className="text-white" size={14} />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-white tracking-tight leading-none">Voice Processor</h2>
                            <span className="text-[9px] font-semibold text-emerald-400 uppercase tracking-widest flex items-center gap-1 mt-0.5">
                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                                Online
                            </span>
                        </div>
                    </div>
                </div>

                {/* AI Visualizer / Question Area - Flexible Height */}
                <div className={`flex-grow relative rounded-xl mb-3 overflow-hidden transition-all duration-500 border border-white/5 flex flex-col justify-center items-center ${isListening ? 'bg-indigo-900/10' : 'bg-slate-900/50'}`}>
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

                    <div className="relative z-10 w-full px-4 text-center">
                        {difficulty === 'hard' ? (
                            <div className="flex flex-col items-center">
                                {/* Animated Orb/Wave for Hard Mode */}
                                <div className="relative w-20 h-20 flex items-center justify-center mb-4">
                                    <div className={`absolute inset-0 bg-indigo-500 rounded-full blur-[30px] opacity-20 animate-pulse`}></div>
                                    <div className={`w-12 h-12 rounded-full bg-slate-900 border border-indigo-500/50 flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(99,102,241,0.3)]`}>
                                        <Volume2 className="text-indigo-400 w-5 h-5" />
                                    </div>
                                    <div className="absolute inset-0 border border-indigo-500/30 rounded-full animate-[ping_2s_linear_infinite]"></div>
                                    <div className="absolute inset-2 border border-indigo-500/20 rounded-full animate-[ping_2s_linear_infinite_1s]"></div>
                                </div>
                                <p className="text-slate-400 font-medium text-xs tracking-wide">Listen carefully...</p>
                                <button onClick={speakQuestion} className="mt-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold rounded-full transition-colors">
                                    Replay Audio
                                </button>
                            </div>
                        ) : (
                            <div className="max-w-xl mx-auto">
                                <p className="text-base md:text-lg font-medium text-slate-200 leading-snug font-light">
                                    "{question}"
                                </p>
                                <button
                                    onClick={speakQuestion}
                                    className="mt-3 inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors text-xs font-semibold group"
                                >
                                    <Volume2 size={12} className="group-hover:scale-110 transition-transform" />
                                    Read Aloud
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Unified Controls & Transcript Bar */}
                <div className="bg-black/20 rounded-xl p-1.5 flex items-center gap-2 border border-white/5 backdrop-blur-sm shrink-0 h-14">
                    <button
                        onClick={toggleListening}
                        className={`flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center transition-all bg-gradient-to-br shadow-lg ${isListening ? 'from-rose-500 to-red-600 shadow-rose-900/30' : 'from-indigo-500 to-blue-600 shadow-indigo-900/30 hover:scale-105'}`}
                    >
                        {isListening ? (
                            <div className="flex gap-0.5 items-center h-3">
                                {[1, 2, 3].map(i => <div key={i} className="w-0.5 bg-white animate-[bounce_1s_infinite]" style={{ animationDelay: `${i * 0.1}s` }}></div>)}
                            </div>
                        ) : (
                            <Mic className="text-white w-5 h-5" />
                        )}
                    </button>

                    <div className="flex-grow h-full bg-white/5 rounded-lg border border-white/5 px-3 py-2 overflow-y-auto custom-scrollbar relative flex items-center">
                        {transcript ? (
                            <p className="text-slate-300 text-xs font-mono leading-tight">{transcript}</p>
                        ) : (
                            <span className="text-slate-600 text-xs italic w-full text-center">
                                {isListening ? "Listening..." : "Tap mic to answer..."}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <button className="p-1.5 text-emerald-400 hover:bg-white/5 rounded-md transition-colors" title="Submit">
                            <ChevronRight size={16} />
                        </button>
                        <button
                            onClick={() => setTranscript('')}
                            className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                            title="Clear"
                        >
                            <RefreshCw size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default VoiceAssessment;
