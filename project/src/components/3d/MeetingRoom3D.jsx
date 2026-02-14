
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Float, ContactShadows, SpotLight } from '@react-three/drei';
import Face3D from './Face3D';

const Participants = () => {
    // Mock participants data simulating the GD state
    const participants = [
        { id: 1, name: 'Atlas (AI)', role: 'Moderator', position: [0, 0, -3], rotation: [0, 0, 0], color: "#6366f1", isSpeaking: true }, // Center back
        { id: 2, name: 'Elena', role: 'Candidate', position: [-2.5, 0, -1.5], rotation: [0, 1, 0], color: "#10b981", isSpeaking: false }, // Left
        { id: 3, name: 'Marcus', role: 'Candidate', position: [2.5, 0, -1.5], rotation: [0, -1, 0], color: "#f59e0b", isSpeaking: false }, // Right
    ];

    const tableRef = useRef();

    useFrame((state) => {
        // Subtle room rotation for dynamic feel
        state.camera.position.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.5;
    });

    return (
        <group position={[0, -1, 0]}>
            {/* The Round Table */}
            <mesh ref={tableRef} position={[0, -1.2, -1]} receiveShadow>
                <cylinderGeometry args={[4, 4, 0.2, 64]} />
                <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Holographic Centerpiece */}
            <mesh position={[0, -1, -1]}>
                <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
            </mesh>
            <SpotLight position={[0, 5, -1]} angle={0.5} penumbra={1} intensity={2} color="cyan" />

            {/* Participants */}
            {participants.map(p => (
                <Face3D
                    key={p.id}
                    {...p}
                />
            ))}

            <ContactShadows opacity={0.5} scale={10} blur={2} far={4} color="#000000" />
        </group>
    );
}

const MeetingRoom3D = () => {
    return (
        <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={60} />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

            {/* Fog for depth */}
            <fog attach="fog" args={['#020617', 5, 20]} />

            <Participants />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 1.8}
                minAzimuthAngle={-Math.PI / 4}
                maxAzimuthAngle={Math.PI / 4}
            />
        </Canvas>
    );
};

export default MeetingRoom3D;
