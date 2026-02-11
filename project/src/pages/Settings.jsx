import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Settings as SettingsIcon, Bell, Volume2, Mic, Video, Globe,
    Moon, Sun, Monitor, Lock, Eye, EyeOff, Key, Trash2,
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

    const [showPassword, setShowPassword] = useState(false);

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        console.log('Saving settings:', settings);
        showToast('Settings saved successfully!', 'success');
    };

    const handleExportData = () => {
        console.log('Exporting user data...');
        const dataStr = JSON.stringify(settings, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'nexusai-data.json';
        link.click();
        showToast('Data exported successfully!', 'success');
    };

    const handleImportData = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const imported = JSON.parse(event.target.result);
                        setSettings(imported);
                        showToast('Data imported successfully!', 'success');
                    } catch (error) {
                        showToast('Invalid file format!', 'error');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    };

    const handleResetSettings = () => {
        if (confirm('Reset all settings to default?')) {
            setSettings({
                theme: 'dark',
                accentColor: 'indigo',
                fontSize: 'medium',
                emailNotifications: true,
                pushNotifications: true,
                weeklyReports: true,
                achievementAlerts: true,
                voiceRate: 1.0,
                voicePitch: 1.0,
                volume: 0.8,
                micSensitivity: 'medium',
                cameraQuality: 'high',
                recordSessions: false,
                language: 'en',
                timezone: 'America/Los_Angeles',
                dateFormat: 'MM/DD/YYYY',
                profileVisibility: 'private',
                showProgress: true,
                dataCollection: true
            });
            showToast('Settings reset to defaults!', 'success');
        }
    };

    const handleDeleteAccount = () => {
        if (confirm('DELETE your account? This cannot be undone!')) {
            showToast('Account deletion initiated. Contact support to complete.', 'error');
        }
    };

    const handleChangePassword = () => {
        showToast('Change password feature coming soon!', 'info');
    };

    return (
        <div className="h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin">
            {/* Compact Header */}
            <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-white">Settings</h2>
                <p className="text-xs text-slate-400">Customize your experience</p>
            </div>

            <div className="space-y-3">{/* All settings sections go here */}
                {/* Appearance */}
                <SettingsSection title="Appearance" icon={Monitor}>
                    <SettingRow label="Theme">
                        <div className="flex gap-2">
                            {['light', 'dark', 'system'].map((theme) => (
                                <button
                                    key={theme}
                                    onClick={() => updateSetting('theme', theme)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${settings.theme === theme
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                        }`}
                                >
                                    {theme === 'light' && <Sun size={16} className="inline mr-1" />}
                                    {theme === 'dark' && <Moon size={16} className="inline mr-1" />}
                                    {theme === 'system' && <Monitor size={16} className="inline mr-1" />}
                                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                                </button>
                            ))}
                        </div>
                    </SettingRow>

                    <SettingRow label="Accent Color">
                        <div className="flex gap-2">
                            {['indigo', 'purple', 'cyan', 'emerald', 'rose'].map((color) => (
                                <button
                                    key={color}
                                    onClick={() => updateSetting('accentColor', color)}
                                    className={`w-8 h-8 rounded-full bg-${color}-500 ${settings.accentColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''
                                        }`}
                                />
                            ))}
                        </div>
                    </SettingRow>

                    <SettingRow label="Font Size">
                        <select
                            value={settings.fontSize}
                            onChange={(e) => updateSetting('fontSize', e.target.value)}
                            className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
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
                        label="Email Notifications"
                        description="Receive updates and reminders via email"
                        checked={settings.emailNotifications}
                        onChange={(val) => updateSetting('emailNotifications', val)}
                    />
                    <ToggleRow
                        label="Push Notifications"
                        description="Get real-time alerts on your device"
                        checked={settings.pushNotifications}
                        onChange={(val) => updateSetting('pushNotifications', val)}
                    />
                    <ToggleRow
                        label="Weekly Progress Reports"
                        description="Summary of your weekly performance"
                        checked={settings.weeklyReports}
                        onChange={(val) => updateSetting('weeklyReports', val)}
                    />
                    <ToggleRow
                        label="Achievement Alerts"
                        description="Get notified when you earn new badges"
                        checked={settings.achievementAlerts}
                        onChange={(val) => updateSetting('achievementAlerts', val)}
                    />
                </SettingsSection>

                {/* Audio & Voice */}
                <SettingsSection title="Audio & Voice" icon={Volume2}>
                    <SettingRow label="Voice Speed">
                        <div className="flex items-center gap-4 w-64">
                            <input
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                value={settings.voiceRate}
                                onChange={(e) => updateSetting('voiceRate', parseFloat(e.target.value))}
                                className="flex-1"
                            />
                            <span className="text-sm text-slate-300 w-8">{settings.voiceRate.toFixed(1)}x</span>
                        </div>
                    </SettingRow>

                    <SettingRow label="Voice Pitch">
                        <div className="flex items-center gap-4 w-64">
                            <input
                                type="range"
                                min="0"
                                max="2"
                                step="0.1"
                                value={settings.voicePitch}
                                onChange={(e) => updateSetting('voicePitch', parseFloat(e.target.value))}
                                className="flex-1"
                            />
                            <span className="text-sm text-slate-300 w-8">{settings.voicePitch.toFixed(1)}</span>
                        </div>
                    </SettingRow>

                    <SettingRow label="Volume">
                        <div className="flex items-center gap-4 w-64">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={settings.volume}
                                onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
                                className="flex-1"
                            />
                            <span className="text-sm text-slate-300 w-8">{Math.round(settings.volume * 100)}%</span>
                        </div>
                    </SettingRow>

                    <SettingRow label="Microphone Sensitivity">
                        <select
                            value={settings.micSensitivity}
                            onChange={(e) => updateSetting('micSensitivity', e.target.value)}
                            className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </SettingRow>
                </SettingsSection>

                {/* Video Settings */}
                <SettingsSection title="Video" icon={Video}>
                    <SettingRow label="Camera Quality">
                        <select
                            value={settings.cameraQuality}
                            onChange={(e) => updateSetting('cameraQuality', e.target.value)}
                            className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="low">Low (480p)</option>
                            <option value="medium">Medium (720p)</option>
                            <option value="high">High (1080p)</option>
                        </select>
                    </SettingRow>

                    <ToggleRow
                        label="Record Practice Sessions"
                        description="Automatically save video recordings of your sessions"
                        checked={settings.recordSessions}
                        onChange={(val) => updateSetting('recordSessions', val)}
                    />
                </SettingsSection>

                {/* Language & Region */}
                <SettingsSection title="Language & Region" icon={Globe}>
                    <SettingRow label="Language">
                        <select
                            value={settings.language}
                            onChange={(e) => updateSetting('language', e.target.value)}
                            className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="hi">Hindi</option>
                        </select>
                    </SettingRow>

                    <SettingRow label="Timezone">
                        <select
                            value={settings.timezone}
                            onChange={(e) => updateSetting('timezone', e.target.value)}
                            className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="America/Los_Angeles">Pacific Time (PT)</option>
                            <option value="America/Denver">Mountain Time (MT)</option>
                            <option value="America/Chicago">Central Time (CT)</option>
                            <option value="America/New_York">Eastern Time (ET)</option>
                        </select>
                    </SettingRow>

                    <SettingRow label="Date Format">
                        <select
                            value={settings.dateFormat}
                            onChange={(e) => updateSetting('dateFormat', e.target.value)}
                            className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                    </SettingRow>
                </SettingsSection>

                {/* Privacy & Security */}
                <SettingsSection title="Privacy & Security" icon={Lock}>
                    <SettingRow label="Profile Visibility">
                        <select
                            value={settings.profileVisibility}
                            onChange={(e) => updateSetting('profileVisibility', e.target.value)}
                            className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            <option value="friends">Friends Only</option>
                        </select>
                    </SettingRow>

                    <ToggleRow
                        label="Show Progress to Others"
                        description="Allow others to see your learning progress"
                        checked={settings.showProgress}
                        onChange={(val) => updateSetting('showProgress', val)}
                    />

                    <ToggleRow
                        label="Data Collection"
                        description="Help improve NexusAI by sharing anonymous usage data"
                        checked={settings.dataCollection}
                        onChange={(val) => updateSetting('dataCollection', val)}
                    />

                    <div className="pt-3 border-t border-white/5">
                        <button onClick={handleChangePassword} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-2 transition-colors">
                            <Key size={14} />
                            Change Password
                        </button>
                    </div>
                </SettingsSection>

                {/* Data Management */}
                <SettingsSection title="Data Management" icon={Download}>
                    <div className="space-y-3">
                        <button
                            onClick={handleExportData}
                            className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl flex items-center justify-between transition-colors border border-white/5"
                        >
                            <span className="flex items-center gap-2">
                                <Download size={18} />
                                Export My Data
                            </span>
                        </button>

                        <button
                            onClick={handleImportData}
                            className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl flex items-center justify-between transition-colors border border-white/5"
                        >
                            <span className="flex items-center gap-2">
                                <Upload size={18} />
                                Import Data
                            </span>
                        </button>

                        <button
                            onClick={handleResetSettings}
                            className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl flex items-center justify-between transition-colors border border-white/5"
                        >
                            <span className="flex items-center gap-2">
                                <RefreshCw size={18} />
                                Reset to Defaults
                            </span>
                        </button>

                        <button
                            onClick={handleDeleteAccount}
                            className="w-full px-4 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl flex items-center justify-between transition-colors border border-rose-500/20"
                        >
                            <span className="flex items-center gap-2">
                                <Trash2 size={18} />
                                Delete Account
                            </span>
                        </button>
                    </div>
                </SettingsSection>

                {/* Save Button */}
                <div className="flex justify-end pt-2">
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-500 transition-all"
                    >
                        <Save size={16} />
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

const SettingsSection = ({ title, icon: Icon, children }) => (
    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5">
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            <Icon size={16} className="text-indigo-400" />
            {title}
        </h3>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

const SettingRow = ({ label, children }) => (
    <div className="flex items-center justify-between py-1">
        <span className="text-slate-300 font-medium text-sm">{label}</span>
        <div>{children}</div>
    </div>
);

const ToggleRow = ({ label, description, checked, onChange }) => (
    <div className="flex items-start justify-between py-1">
        <div className="flex-1">
            <div className="text-slate-300 font-medium text-sm">{label}</div>
            {description && <div className="text-[10px] text-slate-500">{description}</div>}
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`ml-4 relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
        >
            <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'
                    }`}
            />
        </button>
    </div>
);

export default Settings;
