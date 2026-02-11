import React, { useState } from 'react';
import { useGlobal } from '../context/GlobalContext';
import { useAssessment } from '../context/AssessmentContext';
import { UploadCloud, FileText, CheckCircle, PieChart, BarChart2, AlertCircle, ArrowRight, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeResume } from '../utils/resumeAnalyzer';

const ResumeAnalyzer = () => {
    const { resumeData, uploadResume } = useGlobal();
    const { addResumeSuggestions } = useAssessment();
    const [isReanalyzing, setIsReanalyzing] = useState(false);
    const [file, setFile] = useState(null);

    const handleFileUpload = async (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile && uploadedFile.type === 'application/pdf') {
            setFile(uploadedFile);
            setIsReanalyzing(true);

            setTimeout(async () => {
                const results = await analyzeResume(uploadedFile);
                uploadResume(results);

                // Add suggestions to global report
                if (results.missingSkills && results.missingSkills.length > 0) {
                    const suggestions = results.missingSkills.slice(0, 3).map(skill => `Resume Gap: Missing keyword '${skill}'`);
                    addResumeSuggestions(suggestions);
                }

                setIsReanalyzing(false);
                setFile(null);
            }, 2000);
        }
    };

    return (
        <div className="h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">Resume Intelligence</h2>
                    <p className="text-xs text-slate-400">ATS compatibility & skill gaps</p>
                </div>
                <label className="cursor-pointer px-3 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-2 transition-all active:scale-95">
                    <UploadCloud size={16} />
                    <span>Upload Resume</span>
                    <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
                </label>
            </header>

            {isReanalyzing ? (
                <div className="h-[300px] flex flex-col items-center justify-center bg-slate-900/50 rounded-2xl border border-white/5">
                    <div className="relative w-20 h-20 mb-4">
                        <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                        <motion.div
                            className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        ></motion.div>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">Analyzing Resume...</h3>
                    <p className="text-xs text-slate-400">Parsing skills and experience</p>
                </div>
            ) : !resumeData ? (
                <div className="h-[300px] flex flex-col items-center justify-center bg-slate-900/50 rounded-2xl border border-dashed border-slate-700 hover:border-indigo-500/50 transition-colors">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                        <FileText size={32} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">No Resume Data</h3>
                    <p className="text-xs text-slate-400 mb-4">Upload your resume to generate report</p>
                    <label className="cursor-pointer px-4 py-2 text-sm bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors">
                        Upload PDF
                        <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
                    </label>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-4"
                >
                    {/* Score Card */}
                    <motion.div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 flex flex-col items-center text-center">
                        <h3 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">ATS Score</h3>
                        <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                            <svg className="w-full h-full transform-rotate-90">
                                <circle cx="64" cy="64" r="56" fill="transparent" stroke="#1e293b" strokeWidth="10" />
                                <motion.circle
                                    cx="64" cy="64" r="56"
                                    fill="transparent"
                                    stroke={resumeData.totalScore > 75 ? "#10b981" : resumeData.totalScore > 50 ? "#f59e0b" : "#f43f5e"}
                                    strokeWidth="10"
                                    strokeDasharray={2 * Math.PI * 56}
                                    strokeDashoffset={2 * Math.PI * 56 * (1 - resumeData.totalScore / 100)}
                                    strokeLinecap="round"
                                    initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                                    animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - resumeData.totalScore / 100) }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-white">{resumeData.totalScore}</span>
                                <span className="text-[10px] text-slate-400">/ 100</span>
                            </div>
                        </div>
                        <p className={`text-xs font-medium ${resumeData.totalScore > 75 ? "text-emerald-400" : "text-amber-400"}`}>
                            {resumeData.totalScore > 75 ? "Excellent" : "Needs Work"}
                        </p>
                    </motion.div>

                    {/* Skills Detected */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400">
                                <CheckCircle size={16} />
                            </div>
                            <h3 className="text-sm font-bold text-white">Detected Skills</h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {resumeData.foundSkills.length > 0 ? (
                                resumeData.foundSkills.map((skill, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="px-2 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-lg text-xs font-medium hover:bg-emerald-500/20 transition-colors cursor-default"
                                    >
                                        {skill}
                                    </motion.span>
                                ))
                            ) : (
                                <p className="text-slate-500 italic text-xs">No specific technical skills detected.</p>
                            )}
                        </div>
                    </div>

                    {/* Gap Analysis */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-rose-500/10 rounded-lg text-rose-400">
                                <AlertCircle size={16} />
                            </div>
                            <h3 className="text-sm font-bold text-white">Missing Keywords</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {resumeData.missingSkills.length > 0 ? (
                                resumeData.missingSkills.slice(0, 6).map((skill, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                        <span className="text-slate-300 font-medium text-xs">{skill}</span>
                                        <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 px-1.5 py-0.5 rounded">Critical</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-emerald-400 font-medium text-xs">Great job! No critical gaps found.</p>
                            )}
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400">
                                <BarChart2 size={16} />
                            </div>
                            <h3 className="text-sm font-bold text-white">Insights</h3>
                        </div>
                        <ul className="space-y-2 flex-grow">
                            <li className="flex gap-2 text-xs text-slate-300">
                                <div className="mt-1 w-1 h-1 rounded-full bg-indigo-500 flex-shrink-0"></div>
                                <p>Add quantitative results (e.g., "Improved performance by 20%").</p>
                            </li>
                            <li className="flex gap-2 text-xs text-slate-300">
                                <div className="mt-1 w-1 h-1 rounded-full bg-indigo-500 flex-shrink-0"></div>
                                <p>Use standard headers like "Experience" and "Skills".</p>
                            </li>
                        </ul>
                        <button className="mt-4 w-full py-2 text-xs bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium border border-white/10 transition-colors flex items-center justify-center gap-2">
                            <Download size={14} /> Download Report
                        </button>
                    </div>

                </motion.div>
            )}
        </div>
    );
};

export default ResumeAnalyzer;
