import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook for managing countdown timers
 * @param {number} initialTime - Initial time in seconds
 * @param {function} onComplete - Callback when timer reaches 0
 * @returns {Object} Timer state and control functions
 */
export const useTimer = (initialTime = 0, onComplete = null) => {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    const start = useCallback(() => {
        setIsRunning(true);
        setIsPaused(false);
    }, []);

    const pause = useCallback(() => {
        setIsPaused(true);
        setIsRunning(false);
    }, []);

    const resume = useCallback(() => {
        setIsPaused(false);
        setIsRunning(true);
    }, []);

    const reset = useCallback((newTime = initialTime) => {
        setIsRunning(false);
        setIsPaused(false);
        setTimeRemaining(newTime);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [initialTime]);

    const stop = useCallback(() => {
        setIsRunning(false);
        setIsPaused(false);
        setTimeRemaining(initialTime);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [initialTime]);

    useEffect(() => {
        if (isRunning && !isPaused) {
            intervalRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        setIsRunning(false);
                        if (onComplete) {
                            onComplete();
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, isPaused, onComplete]);

    const formatTime = useCallback((seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, []);

    return {
        timeRemaining,
        formattedTime: formatTime(timeRemaining),
        isRunning,
        isPaused,
        start,
        pause,
        resume,
        reset,
        stop,
        setTime: setTimeRemaining
    };
};
