
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars, Float, SpotLight, Sparkles, ContactShadows, Html } from '@react-three/drei';
import EmoRobot from './EmoRobot';

const InterviewerScene = ({ isSpeaking }) => {
    // Generate an initial "Greeting" state
    const [isGreeting, setIsGreeting] = useState(true);
    const [displayedText, setDisplayedText] = useState("");
    const greetingText = "Hi, I'm ready! 👋";

    useEffect(() => {
        // Typing animation
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= greetingText.length) {
                setDisplayedText(greetingText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                // End greeting state after text finishes + delay
                setTimeout(() => setIsGreeting(false), 2000);
            }
        }, 100); // Typing speed

        return () => {
            clearInterval(typingInterval);
        };
    }, []);

    const robotState = {
        isSpeaking: isSpeaking,
        isListening: !isSpeaking && !isGreeting,
        isGreeting: isGreeting
    };

    return (
        // Adjusted position
        <group position={[0, 0.1, 0]}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2} floatingRange={[-0.05, 0.05]}>
                <EmoRobot
                    isSpeaking={robotState.isSpeaking}
                    isListening={robotState.isListening}
                    isGreeting={robotState.isGreeting}
                />
                {/* Greeting Bubble - Adjusted scale and animation */}
                {/* Greeting Text - Move to Top Left of Robot Face */}
                {isGreeting && (
                    <Html position={[-0.8, 1.2, 0]} center transform distanceFactor={5} zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
                        <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded shadow-md border border-indigo-100/50 flex flex-col items-center">
                            <span className="text-indigo-600 font-bold text-[10px] font-mono whitespace-nowrap leading-none">
                                {displayedText}
                            </span>
                        </div>
                    </Html>
                )}
            </Float>
            {/* Sparkles behind to avoid obscuring face */}
            <Sparkles count={30} scale={4} size={2} speed={0.4} opacity={0.3} color="#a78bfa" position={[0, 0, -2]} />

            <SpotLight position={[2, 4, 3]} angle={0.5} penumbra={1} intensity={3} color="#a78bfa" distance={10} />
            <SpotLight position={[-2, 4, 3]} angle={0.5} penumbra={1} intensity={2} color="#34d399" distance={10} />
            <ContactShadows opacity={0.4} scale={10} blur={2.5} far={4} color="#000000" position={[0, -1.6, 0]} />
        </group>
    );
};

const InterviewerScene3D = ({ isSpeaking = true }) => {
    return (
        <Canvas dpr={[1, 2]} shadows>
            {/* "Shoulder View" Camera Setup: Closer Z, Lower FOV (Telephoto), Slight Y offset to frame face */}
            {/* Adjusted camera to looking slightly up at the 'raised' robot */}
            <PerspectiveCamera makeDefault position={[0, 0, 3.8]} fov={30} />

            <ambientLight intensity={0.7} />

            {/* Key light for face clarity */}
            <pointLight position={[0, 2, 3]} intensity={1.5} color="#ffffff" />

            {/* Rim light for separation */}
            <pointLight position={[0, -2, -3]} intensity={2} color="#6366f1" />

            <InterviewerScene isSpeaking={isSpeaking} />
        </Canvas>
    );
};

export default InterviewerScene3D;
