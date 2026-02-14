import React from 'react';
import { Mic, MicOff, Users, MessageSquare, MoreHorizontal, Video } from 'lucide-react';
import MeetingRoom3D from './3d/MeetingRoom3D';

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

            {/* 3D Meeting Room View */}
            <div className="relative flex-grow rounded-2xl overflow-hidden bg-slate-900/50 border border-white/5 shadow-inner">
                <div className="absolute inset-0 z-0">
                    <MeetingRoom3D />
                </div>

                {/* Optional minimal overlay for participant names if they aren't clear in 3D */}
                {/* Keeping the controls separate below */}
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
