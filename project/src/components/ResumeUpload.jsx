import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, Loader2, ArrowRight, X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';
import { analyzeResume } from '../utils/resumeAnalyzer';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeUploadComponent = () => {
    const { uploadResume } = useGlobal();
    const navigate = useNavigate();

    const [step, setStep] = useState('upload');
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (file) => {
        if (file.type === 'application/pdf') {
            setFile(file);
            setError(null);
        } else {
            setError("Please upload a PDF file.");
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;

        setStep('analyzing');
        setError(null);

        try {
            const [results] = await Promise.all([
                analyzeResume(file),
                new Promise(resolve => setTimeout(resolve, 2000))
            ]);

            setAnalysisResult(results);
            uploadResume(results);
            setStep('complete');

        } catch (err) {
            console.error(err);
            setError("Could not parse PDF. Please ensure it's a standard text-based PDF.");
            setStep('upload');
        }
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center p-4 overflow-hidden">
            <motion.div
                layout
                className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl"
            >
                {/* Subtle Top Border */}
                <div className="h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

                <div className="p-6 md:p-8">
                    <AnimatePresence mode='wait'>
                        {step === 'upload' && (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center space-y-1">
                                    <h2 className="text-2xl font-bold text-white">Upload Your Resume</h2>
                                    <p className="text-sm text-slate-400">We'll analyze your skills and match opportunities</p>
                                </div>

                                <div
                                    className={`relative group border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer text-center ${isDragging ? 'border-indigo-500 bg-indigo-500/10' :
                                        file ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-700 hover:border-indigo-400 hover:bg-slate-800/50'
                                        }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => !file && document.getElementById('resume-input').click()}
                                >
                                    <input
                                        id="resume-input"
                                        type="file"
                                        className="hidden"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                    />

                                    {file ? (
                                        <div className="flex flex-col items-center">
                                            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-3">
                                                <FileText size={28} />
                                            </div>
                                            <p className="text-base font-medium text-white">{file.name}</p>
                                            <p className="text-xs text-slate-400 mb-4">{(file.size / 1024).toFixed(1)} KB</p>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                                    className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                                >
                                                    Change
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleAnalyze(); }}
                                                    className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
                                                >
                                                    Analyze <ArrowRight size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center py-4">
                                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${isDragging ? 'bg-indigo-500 text-white scale-110' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700 group-hover:text-indigo-400'}`}>
                                                <UploadCloud size={32} />
                                            </div>
                                            <p className="text-base font-medium text-slate-200 mb-1">Drag & drop your PDF here</p>
                                            <p className="text-xs text-slate-500">or click to browse</p>
                                        </div>
                                    )}
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center justify-center gap-2 text-rose-400 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20"
                                    >
                                        <AlertCircle size={16} />
                                        <span className="text-xs font-medium">{error}</span>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {step === 'analyzing' && (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-10 text-center"
                            >
                                <div className="relative w-20 h-20 mb-6">
                                    <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    ></motion.div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Loader2 size={28} className="text-indigo-400 animate-pulse" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Analyzing your profile...</h3>
                                <p className="text-sm text-slate-400 max-w-xs">Extracting skills and experience</p>
                            </motion.div>
                        )}

                        {step === 'complete' && (
                            <motion.div
                                key="complete"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-6"
                            >
                                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Analysis Complete!</h2>
                                <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
                                    We found <strong className="text-emerald-400">{analysisResult?.foundSkills?.length || 0} skills</strong> and identified areas for growth.
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/dashboard')}
                                    className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 mx-auto text-sm"
                                >
                                    Go to Dashboard <ArrowRight size={18} />
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default ResumeUploadComponent;
