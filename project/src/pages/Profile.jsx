import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
        { id: 3, type: 'Group Discussion', score: 78, date: '2d ago' }
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
        <div className="h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin">
            {/* Compact Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">My Profile</h2>
                    <p className="text-xs text-slate-400">Account & progress</p>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-500 transition-all"
                    >
                        <Edit2 size={16} />
                        Edit
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleCancel}
                            className="px-3 py-2 text-sm bg-slate-700 text-white rounded-lg flex items-center gap-2 hover:bg-slate-600 transition-all"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-3 py-2 text-sm bg-emerald-600 text-white rounded-lg flex items-center gap-2 hover:bg-emerald-500 transition-all"
                        >
                            <Save size={16} />
                            Save
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Column - Profile Card */}
                <div className="lg:col-span-1 space-y-3">
                    {/* Avatar & Basic Info */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/5">
                        <div className="relative w-20 h-20 mx-auto mb-3 group">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                                {getInitials(profileData.name)}
                            </div>
                            {isEditing && (
                                <button onClick={handlePhotoUpload} className="absolute bottom-0 right-0 p-1.5 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 transition-colors">
                                    <Camera size={14} />
                                </button>
                            )}
                        </div>

                        <div className="text-center mb-4">
                            <h3 className="text-lg font-bold text-white mb-0.5">{profileData.name}</h3>
                            <p className="text-indigo-400 text-sm font-medium">{profileData.position}</p>
                            <p className="text-slate-400 text-xs">{profileData.company}</p>
                        </div>

                        <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-2 text-slate-300">
                                <Mail size={14} className="text-slate-500" />
                                <span className="truncate">{profileData.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <Phone size={14} className="text-slate-500" />
                                <span>{profileData.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <MapPin size={14} className="text-slate-500" />
                                <span>{profileData.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2">
                        {stats.map((stat, index) => (
                            <div key={index} className="p-3 rounded-xl bg-slate-900/50 border border-white/5">
                                <div className={`w-8 h-8 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center mb-2`}>
                                    <stat.icon size={16} className={`text-${stat.color}-400`} />
                                </div>
                                <div className="text-lg font-bold text-white">{stat.value}</div>
                                <div className="text-[10px] text-slate-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Details & Activity */}
                <div className="lg:col-span-2 space-y-3">
                    {/* Professional Info */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5">
                        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                            <Briefcase size={16} className="text-indigo-400" />
                            Professional Info
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <InputField
                                label="Company"
                                value={profileData.company}
                                icon={Briefcase}
                                isEditing={isEditing}
                                onChange={(val) => setProfileData({ ...profileData, company: val })}
                            />
                            <InputField
                                label="Position"
                                value={profileData.position}
                                icon={Briefcase}
                                isEditing={isEditing}
                                onChange={(val) => setProfileData({ ...profileData, position: val })}
                            />
                            <InputField
                                label="Experience"
                                value={profileData.experience}
                                icon={Calendar}
                                isEditing={isEditing}
                                onChange={(val) => setProfileData({ ...profileData, experience: val })}
                            />
                            <InputField
                                label="Education"
                                value={profileData.education}
                                icon={GraduationCap}
                                isEditing={isEditing}
                                onChange={(val) => setProfileData({ ...profileData, education: val })}
                            />
                        </div>

                        <div className="mt-3">
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Bio</label>
                            {isEditing ? (
                                <textarea
                                    value={profileData.bio}
                                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                    rows={2}
                                    className="w-full px-3 py-2 text-sm bg-slate-800/50 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                />
                            ) : (
                                <p className="text-xs text-slate-300">{profileData.bio}</p>
                            )}
                        </div>
                    </div>

                    {/* Achievements */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-xl"
                    >
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Award size={20} className="text-indigo-400" />
                            Achievements
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {achievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className={`p-4 rounded-2xl border transition-all ${achievement.earned
                                        ? 'bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/20'
                                        : 'bg-slate-800/30 border-slate-700/50 opacity-50'
                                        }`}
                                >
                                    <div className="text-4xl mb-2">{achievement.icon}</div>
                                    <div className="text-sm font-bold text-white mb-1">{achievement.title}</div>
                                    {achievement.earned && achievement.date && (
                                        <div className="text-xs text-slate-400">{formatDate(achievement.date, 'short')}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5">
                        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                            <Clock size={16} className="text-indigo-400" />
                            Recent Activity
                        </h3>

                        <div className="space-y-2">
                            {recentActivity.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors border border-white/5"
                                >
                                    <div>
                                        <div className="font-semibold text-white text-xs">{activity.type}</div>
                                        <div className="text-[10px] text-slate-400">{activity.date}</div>
                                    </div>
                                    <div className={`text-lg font-bold ${activity.score >= 85 ? 'text-emerald-400' : activity.score >= 70 ? 'text-blue-400' : 'text-amber-400'}`}>
                                        {activity.score}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const InputField = ({ label, value, icon: Icon, isEditing, onChange }) => {
    return (
        <div>
            <label className="block text-[10px] font-semibold text-slate-400 mb-1">{label}</label>
            {isEditing ? (
                <div className="relative">
                    <Icon size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full pl-8 pr-2 py-2 text-xs bg-slate-800/50 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>
            ) : (
                <div className="flex items-center gap-2 text-slate-300 text-xs">
                    <Icon size={14} className="text-slate-500" />
                    <span className="truncate">{value}</span>
                </div>
            )}
        </div>
    );
};


export default Profile;
