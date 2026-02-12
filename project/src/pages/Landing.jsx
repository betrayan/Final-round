import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Hexagon, ArrowRight, CheckCircle2, ShieldCheck, Zap, Globe, Users, Award, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Landing = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <div className="min-h-screen bg-[#030712] text-white selection:bg-indigo-500/30 overflow-hidden font-sans">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    style={{ y: y1, x: -100 }}
                    className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px]"
                />
                <motion.div
                    style={{ y: y2, x: 100 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[100px]"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-900/5 rounded-full blur-[150px] animate-pulse" />
            </div>

            {/* Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                            <Hexagon className="text-indigo-500 relative z-10 transition-transform group-hover:rotate-12" size={32} strokeWidth={2.5} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Nexus<span className="text-indigo-400">AI</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <NavLink to="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</NavLink>
                        <NavLink to="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Solutions</NavLink>
                        <NavLink to="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Pricing</NavLink>
                    </div>

                    <div className="flex gap-4">
                        <NavLink to="/login" className="px-5 py-2.5 rounded-full text-slate-300 hover:text-white text-sm font-semibold transition-all hover:bg-white/5">
                            Log In
                        </NavLink>
                        <NavLink to="/login" className="group px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2">
                            Get Started
                            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </NavLink>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative pt-48 pb-20 lg:pt-60 lg:pb-32 px-6 z-10"
            >
                <div className="max-w-5xl mx-auto text-center relative">
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-8 hover:bg-indigo-500/20 transition-colors cursor-default"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        AI-Powered Professional Readiness
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400">
                            Master Your
                        </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400">
                            Professional Presence
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
                    >
                        The world's most advanced AI platform simulating technical interviews, group discussions, and behavioral assessments in real-time.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                    >
                        <NavLink to="/login" className="group relative px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-lg shadow-xl shadow-white/10 hover:shadow-white/20 transition-all flex items-center gap-3 overflow-hidden">
                            <span className="relative z-10">Start Assessment</span>
                            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </NavLink>

                        <button className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-lg border border-white/10 backdrop-blur-sm transition-all flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Users size={16} className="text-indigo-400" />
                            </div>
                            View Demo
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="border-y border-white/5 bg-white/[0.02] backdrop-blur-sm relative z-10"
            >
                <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <StatItem value="10k+" label="Active Users" />
                    <StatItem value="500+" label="Companies Hiring" />
                    <StatItem value="98%" label="Success Rate" />
                    <StatItem value="24/7" label="AI Availability" />
                </div>
            </motion.div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for Excellence</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">Comprehensive tools designed to elevate every aspect of your professional profile.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Zap}
                        title="Real-time Voice Analysis"
                        desc="Get instant feedback on your tone, pace, filler words, and confidence levels using advanced audio processing."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={ShieldCheck}
                        title="Industry Benchmarks"
                        desc="Your performance is scored against top performers in verified FAANG and Fortune 500 benchmarks."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={CheckCircle2}
                        title="Personalized Roadmap"
                        desc="Our AI generates a custom 30-day curriculum to strictly close your specific skill gaps."
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={Globe}
                        title="Global Standards"
                        desc="Assessment criteria calibrated to international hiring standards across 50+ countries."
                        delay={0.4}
                    />
                    <FeatureCard
                        icon={Users}
                        title="Mock Interviews"
                        desc="Practice with hyper-realistic AI personas representing differnet interview styles and difficulty levels."
                        delay={0.5}
                    />
                    <FeatureCard
                        icon={Award}
                        title="Certification"
                        desc="Earn verifiable certificates upon clearing distinct skill assessment milestones."
                        delay={0.6}
                    />
                </div>
            </div>

            {/* Call to Action */}
            <div className="max-w-5xl mx-auto px-6 pb-32 relative z-10">
                <div className="relative rounded-3xl overflow-hidden p-12 text-center border border-indigo-500/30 bg-gradient-to-b from-indigo-900/20 to-slate-900/50">
                    <div className="absolute inset-0 bg-indigo-600/10 blur-[100px]" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to accelerate your career?</h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Join thousands of professionals mastering their craft with NexusAI today.</p>
                        <NavLink to="/login" className="inline-flex px-10 py-5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-xl shadow-indigo-500/20 transition-all items-center gap-2 transform hover:scale-105">
                            Get Started Now <ArrowRight size={20} />
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-[#020617] relative z-10">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <Hexagon className="text-indigo-500" size={32} />
                                <span className="text-xl font-bold">NexusAI</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Empowering the next generation of professionals with AI-driven insights and preparation tools.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-6">Platform</h4>
                            <ul className="space-y-3 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Enterprise</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-6">Company</h4>
                            <ul className="space-y-3 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-6">Legal</h4>
                            <ul className="space-y-3 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/5 pt-8 text-center text-slate-600 text-sm">
                        <p>© 2026 NexusAI. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all group relative overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
            <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all border border-indigo-500/10">
                <Icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">{title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
        </div>
    </motion.div>
);

const StatItem = ({ value, label }) => (
    <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">{value}</div>
        <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
);

export default Landing;
