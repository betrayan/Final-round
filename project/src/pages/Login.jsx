import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';
import { Hexagon, ArrowRight, Lock, Mail, Cpu, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useGlobal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate network delay for effect
        setTimeout(() => {
            login(email, password);
            // Ensure navigation to the next logical step: Resume Upload
            navigate('/resume');
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex overflow-hidden">
            {/* Left Section - Visuals */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex w-1/2 relative items-center justify-center bg-indigo-600 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-slate-900 opacity-90"></div>

                {/* Abstract Shapes */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] border border-white/10 rounded-full"
                ></motion.div>
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] border border-white/5 rounded-full"
                ></motion.div>

                <div className="relative z-10 p-12 text-white max-w-lg">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8 p-4 bg-white/10 backdrop-blur-lg rounded-2xl w-16 h-16 flex items-center justify-center"
                    >
                        <Cpu size={32} />
                    </motion.div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-5xl font-bold mb-6 leading-tight"
                    >
                        Power Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">Career Growth</span> with AI.
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg text-indigo-100/80 leading-relaxed"
                    >
                        Experience the next generation of recruitment. Automated skill gap analysis, AI-driven insights, and a seamless path to your dream role.
                    </motion.p>
                </div>
            </motion.div>

            {/* Right Section - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                {/* Mobile background ambience */}
                <div className="absolute inset-0 z-0 lg:hidden">
                    <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-indigo-500/20 blur-[100px] rounded-full"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="text-center mb-10 lg:text-left">
                        <div className="inline-flex lg:hidden items-center justify-center p-3 bg-indigo-500/20 rounded-xl mb-4">
                            <Hexagon className="text-indigo-400 fill-indigo-400/20" size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-slate-400">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 block">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all hover:bg-slate-900/80"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-slate-300 block">Password</label>
                                <a href="#" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">Forgot Password?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all hover:bg-slate-900/80"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Sign In <ArrowRight size={18} /></>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center text-slate-500 text-sm">
                        Don't have an account? <a href="#" className="text-indigo-400 hover:text-indigo-300 font-bold ml-1">Create free account</a>
                    </div>
                </motion.div>

                {/* Footer simple link */}
                <div className="absolute bottom-6 text-center w-full lg:w-auto text-slate-600 text-xs">
                    &copy; 2024 NexusAI Inc. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default Login;

