import React from 'react';
import { motion } from 'framer-motion';

/**
 * Skeleton Loader Component for Loading States
 */
const Skeleton = ({ variant = 'text', className = '', width = 'w-full', height = 'h-4', count = 1, animate = true }) => {
    const baseClasses = 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded';

    const variants = {
        text: 'h-4',
        title: 'h-8',
        avatar: 'w-12 h-12 rounded-full',
        card: 'h-32',
        button: 'h-10',
        chart: 'h-64'
    };

    const skeletonClass = `${baseClasses} ${variants[variant] || height} ${width} ${className}`;

    const SkeletonElement = () => (
        <motion.div
            className={skeletonClass}
            animate={animate ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            } : {}}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear'
            }}
            style={{
                backgroundSize: '200% 100%'
            }}
        />
    );

    if (count === 1) {
        return <SkeletonElement />;
    }

    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonElement key={index} />
            ))}
        </div>
    );
};

export const CardSkeleton = () => (
    <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-4">
            <Skeleton variant="avatar" />
            <div className="flex-1">
                <Skeleton variant="title" width="w-2/3" className="mb-2" />
                <Skeleton variant="text" width="w-1/2" />
            </div>
        </div>
        <Skeleton variant="text" count={3} className="mb-2" />
    </div>
);

export const DashboardSkeleton = () => (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div className="flex-1">
                <Skeleton variant="title" width="w-1/3" className="mb-2" />
                <Skeleton variant="text" width="w-1/4" />
            </div>
            <Skeleton variant="button" width="w-32" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-6 rounded-3xl bg-slate-900/50 border border-white/5">
                    <Skeleton variant="avatar" className="mb-4" />
                    <Skeleton variant="text" className="mb-2" />
                    <Skeleton variant="title" width="w-2/3" />
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <CardSkeleton />
            </div>
            <div>
                <CardSkeleton />
            </div>
        </div>
    </div>
);

export default Skeleton;
