import React, { useEffect } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import GDLobbyComponent from '../components/GDLobby';
import { MessageSquare } from 'lucide-react';

const GDArena = () => {
    const { checkAssessmentAccess, completeStep } = useAssessment();

    useEffect(() => {
        checkAssessmentAccess('/gd-arena');
    }, []);

    const handleEnd = () => {
        const suggestions = ["Speak more confidently", "Interject less frequently"];
        completeStep('gd', suggestions);
    };

    return (
        <div className="h-full flex flex-col gap-4 p-4 overflow-hidden">
            <header className="shrink-0 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Group Discussion Arena</h2>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Topic: <strong>"Impact of AI on Creative Jobs"</strong>
                    </div>
                </div>
                <button
                    onClick={handleEnd}
                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 rounded-lg text-sm font-bold transition-all"
                >
                    End Discussion
                </button>
            </header>

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
                {/* Main Arena */}
                <div className="lg:col-span-2 h-full min-h-0 flex flex-col glass-panel rounded-2xl overflow-hidden border border-slate-800/50">
                    <GDLobbyComponent />
                </div>

                {/* Sidebar / Transcript */}
                <div className="lg:col-span-1 glass-panel border border-slate-800/50 rounded-2xl p-4 flex flex-col min-h-0 h-full">
                    <div className="flex items-center gap-2 mb-4 text-white font-bold shrink-0">
                        <MessageSquare size={18} /> Live Transcript
                    </div>
                    <div className="flex-grow overflow-y-auto space-y-4 pr-2 scrollbar-thin text-sm">
                        <ChatItem user="Atlas (AI)" text="I believe the shift is inevitable, but it forces evolution rather than replacement." time="10:02" />
                        <ChatItem user="Elena" text="That's a valid point, but what about entry-level roles?" time="10:03" />
                        <ChatItem user="You" text="Entry level roles will likely shift towards auditing AI outputs." time="10:03" isMe />
                        <ChatItem user="Marcus" text="Agreed. The 'human in the loop' becomes the junior role." time="10:04" />
                        <ChatItem user="Atlas (AI)" text="Precisely. Creativity becomes about curation and direction." time="10:05" />
                        <ChatItem user="You" text="But we need to ensure the training data is diverse." time="10:06" isMe />
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 shrink-0">
                        <input type="text" placeholder="Type a point..." className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChatItem = ({ user, text, time, isMe }) => (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
        <div className={`flex items-center gap-2 mb-1 ${isMe ? 'flex-row-reverse' : ''}`}>
            <span className="text-xs font-bold text-slate-300">{user}</span>
            <span className="text-[10px] text-slate-500">{time}</span>
        </div>
        <div className={`p-3 rounded-2xl max-w-[90%] ${isMe ? 'bg-indigo-600/20 text-indigo-100 rounded-tr-none' : 'bg-white/5 text-slate-300 rounded-tl-none'}`}>
            {text}
        </div>
    </div>
)

export default GDArena;
