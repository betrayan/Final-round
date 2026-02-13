import React, { useState } from 'react';
import { useGlobal } from '../context/GlobalContext';
import {
    User, Mail, Phone, MapPin, Briefcase, GraduationCap, Calendar,
    Edit2, Camera, Award, Target, TrendingUp, Clock, Save, X
} from 'lucide-react';
import { formatDate, getInitials } from '../utils/helpers';
import { useToast } from '../context/ToastContext';

const Profile = () => {
    const { user } = useGlobal();
    const { showToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || 'Alex Johnson',
        email: user?.email || 'alex.johnson@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        position: 'Senior Software Engineer',
        company: 'Tech Innovations Inc.',
        experience: '5+ years',
        education: 'B.S. Computer Science, MIT',
        linkedin: 'linkedin.com/in/alexjohnson',
        github: 'github.com/alexjohnson',
        bio: 'Passionate software engineer with expertise in full-stack development, AI/ML, and cloud architecture. Always eager to learn and solve complex problems.'
    });

    const stats = [
        { label: 'Sessions', value: '142', icon: Target, color: 'indigo' },
        { label: 'Hours', value: '42h', icon: Clock, color: 'cyan' },
        { label: 'Score', value: '82%', icon: TrendingUp, color: 'emerald' },
        { label: 'Badges', value: '12', icon: Award, color: 'purple' }
    ];

    const achievements = [
        { id: 1, title: 'First Steps', icon: '🎯', earned: true, date: '2024-01-15' },
        { id: 2, title: 'Week Streak', icon: '🔥', earned: true, date: '2024-02-01' },
        { id: 3, title: 'Perfect Score', icon: '⭐', earned: true, date: '2024-02-05' },
        { id: 4, title: 'Tech Master', icon: '🧙‍♂️', earned: false, date: null },
        { id: 5, title: 'Comm Pro', icon: '💬', earned: false, date: null },
        { id: 6, title: 'Speed', icon: '⚡', earned: true, date: '2024-01-28' }
    ];

    const recentActivity = [
        { id: 1, type: 'Technical Test', score: 85, date: '2h ago' },
        { id: 2, type: 'HR Interview', score: 92, date: '1d ago' },
        { id: 3, type: 'Group Discussion', score: 78, date: '2d ago' },
        { id: 4, type: 'Resume Analysis', score: 88, date: '3d ago' },
        { id: 5, type: 'System Design', score: 72, date: '4d ago' },
    ];

    const handleSave = () => {
        setIsEditing(false);
        showToast('Profile updated successfully!', 'success');
    };

    const handleCancel = () => {
        setIsEditing(false);
        showToast('Changes discarded', 'info');
    };

    const handlePhotoUpload = () => {
        showToast('Photo upload feature coming soon!', 'info');
    };

    return (
        <div className="h-full flex flex-col overflow-hidden bg-slate-950 p-2 relative">
            {/* Compact Header */}
            <div className="flex justify-between items-center mb-2 shrink-0 h-10 border-b border-white/5 pb-1">
                <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <User size={18} className="text-indigo-400" />
                        My Profile
                    </h2>
                    <p className="text-[10px] text-slate-400">Account & progress</p>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-2 py-1 text-xs bg-indigo-600 text-white rounded-lg flex items-center gap-1.5 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 font-bold"
                    >
                        <Edit2 size={12} />
                        Edit
                    </button>
                ) : (
                    <div className="flex gap-1.5">
                        <button
                            onClick={handleCancel}
                            className="px-2 py-1 text-xs bg-slate-700 text-white rounded-lg flex items-center gap-1.5 hover:bg-slate-600 transition-all font-bold"
                        >
                            <X size={12} />
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-2 py-1 text-xs bg-emerald-600 text-white rounded-lg flex items-center gap-1.5 hover:bg-emerald-500 transition-all font-bold"
                        >
                            <Save size={12} />
                            Save
                        </button>
                    </div>
                )}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-1 pb-1">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 h-full">
                    {/* Left Column - Avatar & Basic Info (3 cols) */}
                    <div className="col-span-1 md:col-span-3 lg:col-span-3 flex flex-col gap-2">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/5 flex flex-col items-center justify-center text-center">
                            <div className="relative w-16 h-16 mb-2 group">
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white shadow-xl shadow-indigo-500/20 border-2 border-white/10">
                                    {getInitials(profileData.name)}
                                </div>
                                {isEditing && (
                                    <button onClick={handlePhotoUpload} className="absolute bottom-0 right-0 p-1 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 transition-colors shadow-lg">
                                        <Camera size={10} />
                                    </button>
                                )}
                            </div>

                            <div className="mb-2 w-full">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                        className="w-full bg-slate-800/50 border border-white/10 rounded text-xs text-center p-1 text-white mb-1"
                                    />
                                ) : (
                                    <h3 className="text-sm font-bold text-white mb-0.5">{profileData.name}</h3>
                                )}
                                <p className="text-indigo-400 text-[10px] font-medium">{profileData.position}</p>
                                <p className="text-slate-400 text-[9px]">{profileData.company}</p>
                            </div>

                            <div className="space-y-1.5 w-full">
                                <ContactRow icon={Mail} value={profileData.email} isEditing={isEditing} onChange={(val) => setProfileData({ ...profileData, email: val })} />
                                <ContactRow icon={Phone} value={profileData.phone} isEditing={isEditing} onChange={(val) => setProfileData({ ...profileData, phone: val })} />
                                <ContactRow icon={MapPin} value={profileData.location} isEditing={isEditing} onChange={(val) => setProfileData({ ...profileData, location: val })} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-1.5">
                            {stats.map((stat, index) => (
                                <div key={index} className="p-2 rounded-xl bg-slate-900/50 border border-white/5 flex flex-col items-center justify-center">
                                    <div className={`w-6 h-6 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center mb-1`}>
                                        <stat.icon size={12} className={`text-${stat.color}-400`} />
                                    </div>
                                    <div className="text-sm font-bold text-white leading-none">{stat.value}</div>
                                    <div className="text-[9px] text-slate-500 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Middle Column - Details (5 cols) */}
                    <div className="col-span-1 md:col-span-5 lg:col-span-5 flex flex-col gap-2">
                        <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 flex-grow">
                            <h3 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5 border-b border-white/5 pb-1.5">
                                <Briefcase size={12} className="text-indigo-400" />
                                Professional Details
                            </h3>

                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <InputField label="Company" value={profileData.company} icon={Briefcase} isEditing={isEditing} onChange={(val) => setProfileData({ ...profileData, company: val })} />
                                    <InputField label="Position" value={profileData.position} icon={Briefcase} isEditing={isEditing} onChange={(val) => setProfileData({ ...profileData, position: val })} />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <InputField label="Experience" value={profileData.experience} icon={Calendar} isEditing={isEditing} onChange={(val) => setProfileData({ ...profileData, experience: val })} />
                                    <InputField label="Education" value={profileData.education} icon={GraduationCap} isEditing={isEditing} onChange={(val) => setProfileData({ ...profileData, education: val })} />
                                </div>

                                <div>
                                    <label className="block text-[9px] font-semibold text-slate-500 mb-0.5">Bio</label>
                                    {isEditing ? (
                                        <textarea
                                            value={profileData.bio}
                                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                            rows={2}
                                            className="w-full px-2 py-1 text-[10px] bg-slate-800/50 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                        />
                                    ) : (
                                        <p className="text-[10px] text-slate-300 leading-relaxed bg-slate-800/30 p-1.5 rounded-lg border border-white/5">{profileData.bio}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 h-48 overflow-y-auto custom-scrollbar">
                            <h3 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5 border-b border-white/5 pb-1.5 sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10 pt-1">
                                <Award size={12} className="text-indigo-400" />
                                Achievements
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {achievements.map((achievement) => (
                                    <div
                                        key={achievement.id}
                                        className={`p-1.5 rounded-lg border transition-all flex flex-col items-center justify-center text-center ${achievement.earned
                                            ? 'bg-emerald-500/5 border-emerald-500/20'
                                            : 'bg-slate-800/20 border-slate-700/30 opacity-40'
                                            }`}
                                    >
                                        <div className="text-lg mb-0.5">{achievement.icon}</div>
                                        <div className="text-[9px] font-bold text-slate-200 leading-tight">{achievement.title}</div>
                                        {achievement.earned && achievement.date && (
                                            <div className="text-[8px] text-emerald-500/70 mt-0.5">{formatDate(achievement.date, 'short')}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Activity (4 cols) */}
                    <div className="col-span-1 md:col-span-4 lg:col-span-4 flex flex-col gap-2">
                        <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 h-full overflow-hidden flex flex-col">
                            <h3 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5 shrink-0 border-b border-white/5 pb-1.5">
                                <Clock size={12} className="text-indigo-400" />
                                Recent Activity
                            </h3>
                            <div className="flex-grow overflow-y-auto custom-scrollbar pr-1 space-y-1.5">
                                {recentActivity.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-center justify-between p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800/60 transition-colors border border-white/5 group"
                                    >
                                        <div>
                                            <div className="font-semibold text-slate-200 text-[10px] group-hover:text-white transition-colors">{activity.type}</div>
                                            <div className="text-[9px] text-slate-500 flex items-center gap-1">
                                                <Clock size={8} />
                                                {activity.date}
                                            </div>
                                        </div>
                                        <div className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${activity.score >= 85 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                activity.score >= 70 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            }`}>
                                            {activity.score}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-2 pt-2 border-t border-white/5 text-center">
                                <button className="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors">View All Activity</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactRow = ({ icon: Icon, value, isEditing, onChange }) => (
    <div className="flex items-center gap-1.5 text-xs w-full">
        <div className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center shrink-0">
            <Icon size={10} className="text-slate-400" />
        </div>
        {isEditing ? (
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 bg-slate-800/50 border border-white/10 rounded px-1.5 py-0.5 text-[10px] text-slate-200 focus:outline-none focus:border-indigo-500"
            />
        ) : (
            <span className="text-slate-300 text-[10px] truncate">{value}</span>
        )}
    </div>
);


const InputField = ({ label, value, icon: Icon, isEditing, onChange }) => {
    return (
        <div>
            <label className="block text-[9px] font-semibold text-slate-500 mb-0.5">{label}</label>
            {isEditing ? (
                <div className="relative">
                    <Icon size={10} className="absolute left-1.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full pl-5 pr-1.5 py-1 text-[10px] bg-slate-800/50 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>
            ) : (
                <div className="flex items-center gap-1.5 text-slate-300 text-[10px] bg-slate-800/30 p-1 rounded-lg border border-white/5">
                    <Icon size={10} className="text-slate-500" />
                    <span className="truncate font-medium">{value}</span>
                </div>
            )}
        </div>
    );
};

export default Profile;
