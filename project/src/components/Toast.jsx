import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const Toast = ({ toasts, removeToast }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5" />;
            case 'error':
                return <XCircle className="w-5 h-5" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5" />;
            case 'info':
            default:
                return <Info className="w-5 h-5" />;
        }
    };

    const getStyles = (type) => {
        const baseStyles = 'border-l-4';
        switch (type) {
            case 'success':
                return `${baseStyles} border-emerald-500 bg-emerald-500/10 text-emerald-400`;
            case 'error':
                return `${baseStyles} border-rose-500 bg-rose-500/10 text-rose-400`;
            case 'warning':
                return `${baseStyles} border-amber-500 bg-amber-500/10 text-amber-400`;
            case 'info':
            default:
                return `${baseStyles} border-blue-500 bg-blue-500/10 text-blue-400`;
        }
    };

    return (
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none max-w-md">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: -20, x: 100 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className={`${getStyles(toast.type)} backdrop-blur-xl rounded-xl p-4 pr-10 shadow-2xl pointer-events-auto max-w-sm relative`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                                {getIcon(toast.type)}
                            </div>
                            <p className="text-sm font-medium text-white flex-1">
                                {toast.message}
                            </p>
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Toast;
