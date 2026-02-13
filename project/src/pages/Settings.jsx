import React, { useState } from 'react';
import {
    Settings as SettingsIcon, Bell, Volume2, Mic, Video, Globe,
    Moon, Sun, Monitor, Lock, Key, Trash2,
    Save, Download, Upload, RefreshCw
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Settings = () => {
    const { showToast } = useToast();
    const [settings, setSettings] = useState({
        // Appearance
        theme: 'dark',
        accentColor: 'indigo',
        fontSize: 'medium',

        // Notifications
        emailNotifications: true,
        pushNotifications: true,
        weeklyReports: true,
        achievementAlerts: true,

        // Audio & Voice
        voiceRate: 1.0,
        voicePitch: 1.0,
        volume: 0.8,
        micSensitivity: 'medium',

        // Video
        cameraQuality: 'high',
        recordSessions: false,

        // Language & Region
        language: 'en',
        timezone: 'America/Los_Angeles',
        dateFormat: 'MM/DD/YYYY',

        // Privacy
        profileVisibility: 'private',
        showProgress: true,
        dataCollection: true
    });

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        console.log('Saving settings:', settings);
        showToast('Settings saved successfully!', 'success');
    };

    return (
        <div className="h-full flex flex-col overflow-hidden bg-slate-950 p-3 relative">
            {/* Compact Header */}
            <div className="flex justify-between items-center mb-3 shrink-0 h-10 border-b border-white/5 pb-2">
                <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <SettingsIcon size={18} className="text-indigo-400" />
                        Settings
                    </h2>
                    <p className="text-[10px] text-slate-400">Customize your experience</p>
                </div>
                <button
                    onClick={handleSave}
                    className="px-3 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg flex items-center gap-1.5 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
                >
                    <Save size={14} />
                    Save Changes
                </button>
            </div>

            {/* Scrollable Compact Grid */}
            <div className="flex-1 overflow-y-auto pr-1 pb-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

                    {/* Appearance */}
                    <SettingsSection title="Appearance" icon={Monitor}>
                        <SettingRow label="Theme">
                            <div className="flex gap-1">
                                {['light', 'dark', 'system'].map((theme) => (
                                    <button
                                        key={theme}
                                        onClick={() => updateSetting('theme', theme)}
                                        className={`p-1.5 rounded-md text-[10px] font-bold transition-all ${settings.theme === theme
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                            }`}
                                        title={theme}
                                    >
                                        {theme === 'light' && <Sun size={12} />}
                                        {theme === 'dark' && <Moon size={12} />}
                                        {theme === 'system' && <Monitor size={12} />}
                                    </button>
                                ))}
                            </div>
                        </SettingRow>

                        <SettingRow label="Accent">
                            <div className="flex gap-1.5">
                                {['indigo', 'purple', 'cyan', 'emerald', 'rose'].map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => updateSetting('accentColor', color)}
                                        className={`w-4 h-4 rounded-full bg-${color}-500 ${settings.accentColor === color ? 'ring-1 ring-white ring-offset-1 ring-offset-slate-900 scale-110' : ''
                                            }`}
                                    />
                                ))}
                            </div>
                        </SettingRow>

                        <SettingRow label="Font Size">
                            <select
                                value={settings.fontSize}
                                onChange={(e) => updateSetting('fontSize', e.target.value)}
                                className="px-2 py-1 bg-slate-800 border border-white/10 rounded-md text-[10px] text-slate-200 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </SettingRow>
                    </SettingsSection>

                    {/* Notifications */}
                    <SettingsSection title="Notifications" icon={Bell}>
                        <ToggleRow
                            label="Email"
                            checked={settings.emailNotifications}
                            onChange={(val) => updateSetting('emailNotifications', val)}
                        />
                        <ToggleRow
                            label="Push Alerts"
                            checked={settings.pushNotifications}
                            onChange={(val) => updateSetting('pushNotifications', val)}
                        />
                        <ToggleRow
                            label="Weekly Reports"
                            checked={settings.weeklyReports}
                            onChange={(val) => updateSetting('weeklyReports', val)}
                        />
                        <ToggleRow
                            label="Achievement Alerts"
                            checked={settings.achievementAlerts}
                            onChange={(val) => updateSetting('achievementAlerts', val)}
                        />
                    </SettingsSection>

                    {/* Audio & Voice */}
                    <SettingsSection title="Audio & Voice" icon={Volume2}>
                        <SettingRow label="Speed">
                            <input
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                value={settings.voiceRate}
                                onChange={(e) => updateSetting('voiceRate', parseFloat(e.target.value))}
                                className="w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </SettingRow>

                        <SettingRow label="Pitch">
                            <input
                                type="range"
                                min="0"
                                max="2"
                                step="0.1"
                                value={settings.voicePitch}
                                onChange={(e) => updateSetting('voicePitch', parseFloat(e.target.value))}
                                className="w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </SettingRow>

                        <SettingRow label="Volume">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={settings.volume}
                                onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
                                className="w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </SettingRow>

                        <SettingRow label="Mic Sens.">
                            <select
                                value={settings.micSensitivity}
                                onChange={(e) => updateSetting('micSensitivity', e.target.value)}
                                className="px-2 py-1 bg-slate-800 border border-white/10 rounded-md text-[10px] text-slate-200 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Med</option>
                                <option value="high">High</option>
                            </select>
                        </SettingRow>
                    </SettingsSection>

                    {/* Video Settings */}
                    <SettingsSection title="Video" icon={Video}>
                        <SettingRow label="Quality">
                            <select
                                value={settings.cameraQuality}
                                onChange={(e) => updateSetting('cameraQuality', e.target.value)}
                                className="px-2 py-1 bg-slate-800 border border-white/10 rounded-md text-[10px] text-slate-200 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="low">480p</option>
                                <option value="medium">720p</option>
                                <option value="high">1080p</option>
                            </select>
                        </SettingRow>

                        <ToggleRow
                            label="Auto-Record"
                            checked={settings.recordSessions}
                            onChange={(val) => updateSetting('recordSessions', val)}
                        />
                    </SettingsSection>

                    {/* Language & Region */}
                    <SettingsSection title="Region" icon={Globe}>
                        <SettingRow label="Language">
                            <select
                                value={settings.language}
                                onChange={(e) => updateSetting('language', e.target.value)}
                                className="px-2 py-1 bg-slate-800 border border-white/10 rounded-md text-[10px] text-slate-200 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                            </select>
                        </SettingRow>

                        <SettingRow label="Timezone">
                            <select
                                value={settings.timezone}
                                onChange={(e) => updateSetting('timezone', e.target.value)}
                                className="px-2 py-1 bg-slate-800 border border-white/10 rounded-md text-[10px] text-slate-200 focus:outline-none focus:border-indigo-500 max-w-[100px]"
                            >
                                <option value="America/Los_Angeles">PT</option>
                                <option value="America/New_York">ET</option>
                            </select>
                        </SettingRow>
                    </SettingsSection>

                    {/* Privacy & Security */}
                    <SettingsSection title="Privacy" icon={Lock}>
                        <SettingRow label="Profile">
                            <select
                                value={settings.profileVisibility}
                                onChange={(e) => updateSetting('profileVisibility', e.target.value)}
                                className="px-2 py-1 bg-slate-800 border border-white/10 rounded-md text-[10px] text-slate-200 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </SettingRow>

                        <ToggleRow
                            label="Shared Progress"
                            checked={settings.showProgress}
                            onChange={(val) => updateSetting('showProgress', val)}
                        />

                        <div className="pt-2 border-t border-white/5 flex justify-end">
                            <button className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
                                <Key size={10} />
                                Change Pwd
                            </button>
                        </div>
                    </SettingsSection>

                    {/* Data Management */}
                    <SettingsSection title="Data" icon={Download}>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-white/5 text-[10px]">
                                <Download size={12} /> Export
                            </button>
                            <button className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-white/5 text-[10px]">
                                <Upload size={12} /> Import
                            </button>
                            <button className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-white/5 text-[10px]">
                                <RefreshCw size={12} /> Reset
                            </button>
                            <button className="px-2 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-rose-500/20 text-[10px]">
                                <Trash2 size={12} /> Delete
                            </button>
                        </div>
                    </SettingsSection>
                </div>
            </div>
        </div>
    );
};

const SettingsSection = ({ title, icon: Icon, children }) => (
    <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 h-full">
        <h3 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
            <Icon size={12} className="text-indigo-400" />
            {title}
        </h3>
        <div className="space-y-1.5">
            {children}
        </div>
    </div>
);

const SettingRow = ({ label, children }) => (
    <div className="flex items-center justify-between py-0.5">
        <span className="text-slate-400 font-medium text-[10px]">{label}</span>
        <div>{children}</div>
    </div>
);

const ToggleRow = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-between py-0.5">
        <span className="text-slate-400 font-medium text-[10px]">{label}</span>
        <button
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-3.5 w-7 items-center rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
        >
            <span
                className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-3.5' : 'translate-x-0.5'
                    }`}
            />
        </button>
    </div>
);

export default Settings;
