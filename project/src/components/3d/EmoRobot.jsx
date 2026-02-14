
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Cylinder, Torus, Html } from '@react-three/drei';
import * as THREE from 'three';

const EmoEyes = ({ expression }) => {
    const leftEyeRef = useRef();
    const rightEyeRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        let targetScaleY = 1;
        let targetScaleX = 1;

        // Expression Logic matches the reference image (Cyans eyes)
        if (expression === 'speaking') {
            targetScaleY = 0.6 + Math.sin(time * 20) * 0.2;
        } else if (expression === 'thinking') {
            // One eye slight squint
            if (leftEyeRef.current) leftEyeRef.current.scale.y = 1;
            if (rightEyeRef.current) rightEyeRef.current.scale.y = 0.4;
            return;
        } else if (expression === 'greeting') {
            // Happy squinting eyes ^ ^ (Inverted U shape simulation via scaling)
            targetScaleY = 0.15;
            targetScaleX = 1.1;
        } else if (expression === 'listening') {
            // Blink occasionally
            if (Math.random() > 0.99) targetScaleY = 0.1;
        } else {
            if (Math.random() > 0.995) targetScaleY = 0.1;
        }

        if (leftEyeRef.current) {
            leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, targetScaleY, 0.25);
            leftEyeRef.current.scale.x = THREE.MathUtils.lerp(leftEyeRef.current.scale.x, targetScaleX, 0.25);
        }
        if (rightEyeRef.current) {
            rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, targetScaleY, 0.25);
            rightEyeRef.current.scale.x = THREE.MathUtils.lerp(rightEyeRef.current.scale.x, targetScaleX, 0.25);
        }
    });

    const eyeColor = expression === 'greeting' ? '#34d399' : '#06b6d4'; // Greenish for welcome, Cyan default

    return (
        <group position={[0, 0.1, 0.52]}>
            {/* Left Eye */}
            <RoundedBox ref={leftEyeRef} args={[0.35, 0.35, 0.02]} radius={0.08} smoothness={4} position={[-0.4, 0, 0]}>
                <meshBasicMaterial color={eyeColor} />
            </RoundedBox>

            {/* Right Eye */}
            <RoundedBox ref={rightEyeRef} args={[0.35, 0.35, 0.02]} radius={0.08} smoothness={4} position={[0.4, 0, 0]}>
                <meshBasicMaterial color={eyeColor} />
            </RoundedBox>
        </group>
    );
};

const EmoRobot = ({ isSpeaking, isListening, isGreeting }) => {
    const headRef = useRef();
    const groupRef = useRef();

    // Determine current state/expression
    let expression = 'idle';
    if (isGreeting) expression = 'greeting';
    else if (isSpeaking) expression = 'speaking';
    else if (isListening) expression = 'listening'; // User is speaking
    else expression = 'thinking'; // Silence gap

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Bobbing Body (Floating feel)
        if (groupRef.current) {
            groupRef.current.position.y = -0.5 + Math.sin(time * 1.5) * 0.05;
        }

        // Head Animation
        if (headRef.current) {
            if (expression === 'greeting') {
                // Happy head tilt
                headRef.current.rotation.z = Math.sin(time * 4) * 0.1;
                headRef.current.rotation.y = Math.sin(time * 2) * 0.1;
                // Look up slightly
                headRef.current.rotation.x = -0.1;
            } else if (expression === 'listening') {
                // Look attentively
                headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, Math.sin(time) * 0.05, 0.1);
                headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, Math.sin(time * 0.5) * 0.02, 0.1);
                headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0, 0.1);
            } else if (expression === 'speaking') {
                // Energetic speaking bounce
                headRef.current.rotation.x = Math.sin(time * 12) * 0.03;
                headRef.current.rotation.z = Math.sin(time * 4) * 0.02;
            } else if (expression === 'thinking') {
                // Look up/around
                headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -0.15, 0.05);
                headRef.current.rotation.z = Math.sin(time * 2) * 0.05;
            } else {
                headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0, 0.1);
            }
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
            <group ref={headRef}>
                {/* HEAD UNIT - The main "Monitor" shape */}
                {/* Outer Shell (Dark Grey) */}
                <RoundedBox args={[1.6, 1.4, 1.0]} radius={0.4} smoothness={8}>
                    <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.6} />
                </RoundedBox>

                {/* Face Screen (Glossy Black, Inset) */}
                <RoundedBox args={[1.35, 1.15, 0.1]} radius={0.2} smoothness={4} position={[0, 0.05, 0.48]}>
                    <meshStandardMaterial color="#000000" roughness={0.05} metalness={0.9} />
                </RoundedBox>

                {/* The Eyes */}
                <EmoEyes expression={expression} />

                {/* Mouth / Tongue (Only when speaking or feeling cheeky) */}
                {isSpeaking && (
                    <group position={[0, -0.35, 0.52]}>
                        <Torus args={[0.08, 0.03, 16, 32]} rotation={[0, 0, 0]} scale={[1, 0.6, 1]}>
                            <meshBasicMaterial color="#f43f5e" />
                        </Torus>
                    </group>
                )}

                {/* HEADPHONES (Purple/Blue from reference) */}
                <group position={[0.82, 0, 0]}>
                    {/* Ear Cup */}
                    <Cylinder args={[0.25, 0.25, 0.3]} rotation={[0, 0, Math.PI / 2]}>
                        <meshStandardMaterial color="#4f46e5" roughness={0.2} metalness={0.5} />
                    </Cylinder>
                    {/* Light Ring */}
                    <Torus args={[0.18, 0.02, 16, 32]} rotation={[0, Math.PI / 2, 0]} position={[0.16, 0, 0]}>
                        <meshStandardMaterial color={expression === 'greeting' ? '#34d399' : '#a78bfa'} emissive={expression === 'greeting' ? '#34d399' : '#a78bfa'} emissiveIntensity={2} />
                    </Torus>
                </group>
                <group position={[-0.82, 0, 0]}>
                    {/* Ear Cup */}
                    <Cylinder args={[0.25, 0.25, 0.3]} rotation={[0, 0, Math.PI / 2]}>
                        <meshStandardMaterial color="#4f46e5" roughness={0.2} metalness={0.5} />
                    </Cylinder>
                    {/* Light Ring */}
                    <Torus args={[0.18, 0.02, 16, 32]} rotation={[0, Math.PI / 2, 0]} position={[-0.16, 0, 0]}>
                        <meshStandardMaterial color={expression === 'greeting' ? '#34d399' : '#a78bfa'} emissive={expression === 'greeting' ? '#34d399' : '#a78bfa'} emissiveIntensity={2} />
                    </Torus>
                </group>

                {/* Headphone Band */}
                <Torus args={[0.9, 0.08, 16, 64]} arc={Math.PI} rotation={[0, 0, 0]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#4338ca" />
                </Torus>
            </group>

            {/* LEGS & FEET (Attached directly to head bottom like EMO) */}
            <group position={[0, -0.8, 0]}>
                {/* Right Leg */}
                <group position={[0.4, 0, 0]}>
                    <Cylinder args={[0.12, 0.12, 0.6]} position={[0, 0.1, 0]}>
                        <meshStandardMaterial color="#1e293b" />
                    </Cylinder>
                    {/* Foot */}
                    <RoundedBox args={[0.4, 0.2, 0.5]} radius={0.05} smoothness={4} position={[0, -0.2, 0.1]}>
                        <meshStandardMaterial color="#334155" />
                    </RoundedBox>
                    {/* Foot Light */}
                    <RoundedBox args={[0.1, 0.1, 0.05]} position={[0, -0.2, 0.36]}>
                        <meshBasicMaterial color={expression === 'greeting' ? '#34d399' : '#06b6d4'} />
                    </RoundedBox>
                </group>

                {/* Left Leg */}
                <group position={[-0.4, 0, 0]}>
                    <Cylinder args={[0.12, 0.12, 0.6]} position={[0, 0.1, 0]}>
                        <meshStandardMaterial color="#1e293b" />
                    </Cylinder>
                    {/* Foot */}
                    <RoundedBox args={[0.4, 0.2, 0.5]} radius={0.05} smoothness={4} position={[0, -0.2, 0.1]}>
                        <meshStandardMaterial color="#334155" />
                    </RoundedBox>
                    {/* Foot Light */}
                    <RoundedBox args={[0.1, 0.1, 0.05]} position={[0, -0.2, 0.36]}>
                        <meshBasicMaterial color={expression === 'greeting' ? '#34d399' : '#06b6d4'} />
                    </RoundedBox>
                </group>
            </group>
        </group>
    );
};

export default EmoRobot;
