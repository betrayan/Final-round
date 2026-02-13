import React, { useEffect, useState, useRef } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import GDLobbyComponent from '../components/GDLobby';
import { MessageSquare, Send, Mic, Users, Settings, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GDArena = () => {
    const { checkAssessmentAccess, completeStep } = useAssessment();
    const [messages, setMessages] = useState([
        { id: 1, user: "Atlas (AI)", text: "I believe the shift is inevitable.", time: "10:02", avatar: "Atlas" },
        { id: 2, user: "Elena", text: "What about entry-level roles?", time: "10:03", avatar: "Elena" },
        { id: 3, user: "You", text: "Roles will shift towards auditing AI.", time: "10:03", isMe: true, avatar: "You" },
        { id: 4, user: "Marcus", text: "Agreed. 'Human in the loop' is key.", time: "10:04", avatar: "Marcus" },
        { id: 5, user: "Atlas (AI)", text: "Precise. Creativity becomes curation.", time: "10:05", avatar: "Atlas" },
    ]);
    const [inputValue, setInputValue] = useState("");
    const chatEndRef = useRef(null);

    useEffect(() => {
        checkAssessmentAccess('/gd-arena');
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleEnd = () => {
        const suggestions = ["Speak more confidently", "Interject less frequently"];
        completeStep('gd', suggestions);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            user: "You",
            text: inputValue,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
            avatar: "You"
        };

        setMessages([...messages, newMessage]);
        setInputValue("");
    };

    return (
        <div className="h-full flex flex-col gap-2 p-2 overflow-hidden bg-slate-950 relative">
            {/* Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen" />
            </div>

            {/* Compact Header */}
            <header className="shrink-0 flex items-center justify-between bg-slate-900/40 backdrop-blur-xl border border-white/5 p-2 px-3 rounded-xl relative z-10 h-12">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-indigo-500/20 rounded-lg text-indigo-400 border border-indigo-500/20">
                        <Users size={16} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-sm font-bold text-white leading-none">GD Arena</h2>
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] mt-0.5">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            Topic: <strong className="text-indigo-300">"AI & Jobs"</strong>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <Settings size={16} />
                    </button>
                    <button
                        onClick={handleEnd}
                        className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                    >
                        <XCircle size={12} /> End
                    </button>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-2 min-h-0 relative z-10">
                {/* Visual Arena (Main Stage) */}
                <div className="lg:col-span-3 h-full min-h-0 flex flex-col rounded-xl overflow-hidden border border-slate-800/60 bg-slate-900/30 backdrop-blur-sm shadow-2xl">
                    <GDLobbyComponent />
                </div>

                {/* Live Transcript & Chat Sidebar */}
                <div className="lg:col-span-1 border border-slate-800/60 bg-slate-900/40 backdrop-blur-md rounded-xl flex flex-col min-h-0 h-full shadow-2xl overflow-hidden">
                    {/* Chat Header */}
                    <div className="p-2 border-b border-white/5 bg-white/5 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-2 text-white text-xs font-bold">
                            <MessageSquare size={14} className="text-indigo-400" />
                            Live Transcript
                        </div>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                            LIVE
                        </span>
                    </div>

                    {/* Chat Messages Area */}
                    <div className="flex-grow overflow-y-auto p-2 space-y-2.5 custom-scrollbar">
                        <AnimatePresence initial={false}>
                            {messages.map((msg) => (
                                <ChatItem key={msg.id} {...msg} />
                            ))}
                        </AnimatePresence>
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-2 border-t border-white/5 bg-slate-900/60 backdrop-blur-lg shrink-0">
                        <form onSubmit={handleSendMessage} className="relative group">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type a point..."
                                className="w-full bg-slate-950/50 border border-white/10 rounded-lg pl-3 pr-8 py-2 text-white text-xs focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="absolute right-1 top-1/2 -translate-y-1/2 p-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={12} />
                            </button>
                        </form>
                        <div className="mt-1 text-center">
                            <button className="text-[9px] text-slate-600 hover:text-indigo-400 flex items-center justify-center gap-1 mx-auto transition-colors">
                                <Mic size={8} /> Voice Input
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChatItem = ({ user, text, time, isMe, avatar, id }) => (
    <motion.div
        initial={{ opacity: 0, y: 5, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
    >
        <div className={`flex items-end gap-1.5 max-w-[95%] ${isMe ? 'flex-row-reverse' : ''}`}>
            <img
                src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${avatar}`}
                alt={user}
                className={`w-6 h-6 rounded-full border shrink-0 bg-slate-800 object-cover ${isMe ? 'border-indigo-500' : 'border-slate-600'}`}
            />

            <div className="flex flex-col gap-0.5 min-w-0">
                <div className={`flex items-center gap-1.5 ${isMe ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10px] font-bold text-slate-400">{user}</span>
                    <span className="text-[9px] text-slate-600">{time}</span>
                </div>
                <div
                    className={`px-2.5 py-1.5 text-xs leading-snug shadow-sm break-words ${isMe
                        ? 'bg-indigo-600 text-white rounded-xl rounded-tr-sm'
                        : 'bg-slate-800 border border-slate-700 text-slate-300 rounded-xl rounded-tl-sm'
                        }`}
                >
                    {text}
                </div>
            </div>
        </div>
    </motion.div>
)

export default GDArena;
