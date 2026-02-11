import React from 'react';
import { NavLink } from 'react-router-dom';
import { Hexagon, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const Landing = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            {/* Navbar */}
            <nav className="fixed w-full z-50 backdrop-blur-md border-b border-white/10 bg-slate-950/50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Hexagon className="text-indigo-500 fill-indigo-500/20" size={32} />
                        <span className="text-2xl font-bold tracking-tight">Nexus<span className="text-indigo-400">AI</span></span>
                    </div>
                    <div className="flex gap-4">
                        <NavLink to="/login" className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold transition-all">
                            Login
                        </NavLink>
                        <NavLink to="/login" className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all">
                            Get Started
                        </NavLink>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium uppercase tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                        AI-Powered Professional Readiness
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                        Master Your Professional <br /> Presence.
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        The world's most advanced AI platform for simulate technical interviews, group discussions, and behavioral assessments in real-time.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <NavLink to="/login" className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-xl shadow-indigo-500/20 transition-all flex items-center gap-2">
                            Start Assessment <ArrowRight size={20} />
                        </NavLink>
                        <button className="px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg border border-white/10 transition-all">
                            View Demo
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Zap}
                        title="Real-time Voice Analysis"
                        desc="Get instant feedback on your tone, pace, filler words, and confidence levels."
                    />
                    <FeatureCard
                        icon={ShieldCheck}
                        title="Industry Standard Metrics"
                        desc="Scored against top performers in verified FAANG and Fortune 500 benchmarks."
                    />
                    <FeatureCard
                        icon={CheckCircle2}
                        title="Personalized Roadmap"
                        desc="AI generates a custom curriculum to close your specific skill gaps."
                    />
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-slate-950 py-12 text-center text-slate-500 text-sm">
                <p>© 2026 NexusAI. By accessing this platform, you agree to our GDPR-compliant Data Usage Policy.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
        <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
)

export default Landing;
