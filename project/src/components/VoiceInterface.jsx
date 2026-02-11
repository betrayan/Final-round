import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, RefreshCw, AudioWaveform, ChevronRight } from 'lucide-react';

const VoiceAssessment = () => {
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
            setIsListening(!isListening); // Fake toggle for UI demo
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
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 rounded-3xl p-1 h-full flex flex-col shadow-2xl relative overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

            {/* Main Interface Content */}
            <div className="bg-slate-950/50 backdrop-blur-3xl rounded-[20px] p-6 h-full flex flex-col relative z-10">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg shadow-lg shadow-sky-500/20">
                            <AudioWaveform className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white tracking-tight">Voice Processor</h2>
                            <span className="text-center text-[10px] font-semibold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Online
                            </span>
                        </div>
                    </div>

                    <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/5">
                        {['low', 'medium', 'hard'].map((m) => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${mode === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                {/* AI Visualizer / Question Area */}
                <div className={`flex-grow relative rounded-2xl mb-6 overflow-hidden transition-all duration-500 border border-white/5 ${isListening ? 'bg-indigo-900/10' : 'bg-slate-900/50'}`}>
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        {mode === 'hard' ? (
                            <div className="text-center z-10">
                                {/* Animated Orb/Wave for Hard Mode */}
                                <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                                    <div className={`absolute inset-0 bg-indigo-500 rounded-full blur-[40px] opacity-20 animate-pulse`}></div>
                                    <div className={`w-20 h-20 rounded-full bg-slate-900 border-2 border-indigo-500/50 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(99,102,241,0.3)]`}>
                                        <Volume2 className="text-indigo-400 w-8 h-8" />
                                    </div>
                                    {/* Ripples */}
                                    <div className="absolute inset-0 border border-indigo-500/30 rounded-full animate-[ping_2s_linear_infinite]"></div>
                                    <div className="absolute inset-4 border border-indigo-500/20 rounded-full animate-[ping_2s_linear_infinite_1s]"></div>
                                </div>
                                <p className="text-slate-400 font-medium tracking-wide">Listen carefully to the instructor...</p>
                                <button onClick={speakQuestion} className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-full transition-colors">
                                    Play Question Audio
                                </button>
                            </div>
                        ) : (
                            <div className="p-8 text-center z-10 max-w-2xl">
                                <p className="text-xl md:text-2xl font-medium text-slate-200 leading-relaxed font-light">
                                    "{question}"
                                </p>
                                <button
                                    onClick={speakQuestion}
                                    className="mt-6 inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-semibold group"
                                >
                                    <Volume2 size={16} className="group-hover:scale-110 transition-transform" />
                                    Read Aloud
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Controls & Transcript */}
                <div className="bg-black/20 rounded-2xl p-2 flex items-center gap-4 border border-white/5 backdrop-blur-sm">
                    <button
                        onClick={toggleListening}
                        className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center transition-all bg-gradient-to-br shadow-lg ${isListening ? 'from-rose-500 to-red-600 shadow-rose-900/30 ring-2 ring-rose-500/50' : 'from-indigo-500 to-blue-600 shadow-indigo-900/30 hover:scale-105'}`}
                    >
                        {isListening ? (
                            <div className="flex gap-1 items-center h-4">
                                {[1, 2, 3, 4].map(i => <div key={i} className="w-1 bg-white animate-[bounce_1s_infinite]" style={{ animationDelay: `${i * 0.1}s` }}></div>)}
                            </div>
                        ) : (
                            <Mic className="text-white w-7 h-7" />
                        )}
                    </button>

                    <div className="flex-grow h-16 bg-white/5 rounded-lg border border-white/5 p-3 overflow-y-auto custom-scrollbar relative">
                        {transcript ? (
                            <p className="text-slate-300 text-sm font-mono">{transcript}</p>
                        ) : (
                            <div className="flex items-center h-full text-slate-600 text-sm italic gap-2">
                                {isListening ? <span className="animate-pulse">Listening for input...</span> : <span>Press microphone to start answering...</span>}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <button className="p-2 text-emerald-400 hover:bg-white/5 rounded-lg transition-colors" title="Submit Answer">
                            <ChevronRight size={20} />
                        </button>
                        <button
                            onClick={() => setTranscript('')}
                            className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            title="Clear"
                        >
                            <RefreshCw size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default VoiceAssessment;
