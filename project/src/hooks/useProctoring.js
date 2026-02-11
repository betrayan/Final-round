import { useState, useEffect, useCallback } from 'react';
import { useToast } from './useToast';

export const useProctoring = (onViolation, onCameraError) => {
    const { warning, error } = useToast();
    const [stream, setStream] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [warnings, setWarnings] = useState(0);

    const checkTabSwitch = useCallback(() => {
        if (document.hidden) {
            setWarnings(prev => {
                const newCount = prev + 1;
                warning(`Warning: Tab switching detected/focus lost! (${newCount}/3)`, 4000);
                if (newCount >= 3 && onViolation) {
                    onViolation('Multiple focus violations detected.');
                }
                return newCount;
            });
        }
    }, [warning, onViolation]);

    const startCamera = useCallback(async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            setStream(mediaStream);
            setCameraActive(true);
        } catch (err) {
            console.error("Camera access denied:", err);
            error("Camera access required for proctoring!", 5000);
            if (onCameraError) onCameraError(err);
        }
    }, [error, onCameraError]);

    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            setCameraActive(false);
        }
    }, [stream]);

    useEffect(() => {
        document.addEventListener('visibilitychange', checkTabSwitch);
        window.addEventListener('blur', checkTabSwitch);

        return () => {
            document.removeEventListener('visibilitychange', checkTabSwitch);
            window.removeEventListener('blur', checkTabSwitch);
            stopCamera();
        };
    }, [checkTabSwitch, stopCamera]);


    return {
        stream,
        cameraActive,
        startCamera,
        stopCamera,
        warnings
    };
};
