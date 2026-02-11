import React from 'react';
import { Mic, MicOff, Users, MessageSquare, MoreHorizontal, Video } from 'lucide-react';

const participants = [
    { id: 1, name: 'Atlas (AI)', role: 'Moderator', status: 'speaking', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Atlas' },
    { id: 2, name: 'Elena', role: 'Candidate', status: 'listening', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Elena' },
    { id: 3, name: 'Marcus', role: 'Candidate', status: 'thinking', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Marcus' },
    { id: 4, name: 'You', role: 'User', status: 'muted', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=You' },
];

const GDLobby = () => {
    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-full flex flex-col relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400 border border-pink-500/20">
                        <Users size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">Discussion Lobby</h2>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            4 Active Participants
                        </div>
                    </div>
                </div>
                <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-white border border-white/10 transition-colors">
                    Leave Lobby
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
                {participants.map((p) => (
                    <div key={p.id} className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${p.status === 'speaking' ? 'ring-2 ring-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]' : 'border border-white/5 bg-slate-900/40 hover:bg-slate-900/60'}`}>
                        {/* Status Overlay */}
                        <div className="absolute top-3 right-3 z-10">
                            {p.status === 'muted' ? (
                                <div className="bg-black/50 backdrop-blur-md p-1.5 rounded-full text-white/50 border border-white/10">
                                    <MicOff size={12} />
                                </div>
                            ) : (
                                <div className={`bg-black/50 backdrop-blur-md p-1.5 rounded-full border border-white/10 ${p.status === 'speaking' ? 'text-indigo-400' : 'text-white/80'}`}>
                                    <Mic size={12} className={p.status === 'speaking' ? 'animate-pulse' : ''} />
                                </div>
                            )}
                        </div>

                        {/* Avatar */}
                        <div className="absolute inset-x-0 top-0 bottom-12 flex items-center justify-center p-4">
                            <div className="relative w-24 h-24">
                                <img src={p.avatar} alt={p.name} className="w-full h-full rounded-full object-cover bg-slate-800 shadow-xl" />
                                {p.status === 'speaking' && (
                                    <>
                                        <span className="absolute inset-0 rounded-full border-2 border-indigo-500 animate-[ping_2s_linear_infinite]"></span>
                                        <span className="absolute inset-0 rounded-full border border-indigo-500 animate-[ping_2s_linear_infinite_1s]"></span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-3 pt-6">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="font-bold text-white text-sm leading-tight">{p.name}</h3>
                                    <p className="text-[10px] text-indigo-300 font-medium uppercase tracking-wide">{p.role}</p>
                                </div>
                                {p.status === 'speaking' && (
                                    <div className="flex gap-0.5 h-3 items-end">
                                        <span className="w-0.5 h-2 bg-indigo-400 animate-pulse"></span>
                                        <span className="w-0.5 h-3 bg-indigo-400 animate-pulse delay-75"></span>
                                        <span className="w-0.5 h-1.5 bg-indigo-400 animate-pulse delay-150"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="mt-4 flex gap-3 justify-center">
                <button className="h-10 w-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition-colors border border-white/10">
                    <Video size={18} />
                </button>
                <button className="h-10 w-10 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-900/50 transition-colors">
                    <Mic size={18} />
                </button>
                <button className="h-10 w-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition-colors border border-white/10">
                    <MessageSquare size={18} />
                </button>
            </div>
        </div>
    );
};
export default GDLobby;
