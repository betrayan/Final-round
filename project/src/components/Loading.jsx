import React from 'react';
import { motion } from 'framer-motion';

// Main Loading Spinner Component
export const LoadingSpinner = ({ size = 'md', text = '' }) => {
    const sizes = {
        sm: 'w-6 h-6',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24'
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <motion.div
                className={`${sizes[size]} border-4 border-purple-500/20 border-t-purple-500 rounded-full`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            {text && (
                <motion.p
                    className="text-sm font-semibold text-purple-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    {text}
                </motion.p>
            )}
        </div>
    );
};

// Full Page Loading
export const PageLoader = () => {
    return (
        <div className="fixed inset-0 bg-[#0a0118] flex items-center justify-center z-50">
            <div className="text-center">
                <motion.div
                    className="w-20 h-20 mb-6 mx-auto"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl shadow-2xl shadow-purple-500/50"></div>
                </motion.div>

                <motion.h2
                    className="text-2xl font-bold text-gradient mb-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Loading...
                </motion.h2>

                <p className="text-purple-400 text-sm">Getting things ready for you ✨</p>
            </div>
        </div>
    );
};

// Skeleton Loader for Cards
export const SkeletonCard = () => {
    return (
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-purple-500/20 animate-pulse">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl skeleton"></div>
                <div className="flex-1">
                    <div className="h-4 bg-purple-500/20 rounded skeleton mb-2 w-3/4"></div>
                    <div className="h-3 bg-purple-500/10 rounded skeleton w-1/2"></div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-3 bg-purple-500/10 rounded skeleton w-full"></div>
                <div className="h-3 bg-purple-500/10 rounded skeleton w-5/6"></div>
                <div className="h-3 bg-purple-500/10 rounded skeleton w-4/6"></div>
            </div>
        </div>
    );
};

// Shimmer Effect Component
export const ShimmerEffect = ({ className = '' }) => {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        </div>
    );
};

// Pulsing Dot Loader
export const DotLoader = () => {
    return (
        <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                    }}
                />
            ))}
        </div>
    );
};

// Progress Bar Component
export const ProgressBar = ({ progress = 0, text = '' }) => {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-purple-400">{text}</span>
                <span className="text-sm font-bold text-white">{progress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-900/60 rounded-full overflow-hidden border border-purple-500/20">
                <motion.div
                    className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
};

export default LoadingSpinner;
