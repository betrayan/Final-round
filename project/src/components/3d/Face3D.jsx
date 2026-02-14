
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Float, Image as DreiImage, Html } from '@react-three/drei';
import * as THREE from 'three';

const Face3D = ({ position, rotation, color = "#4f46e5", isSpeaking, name, role, imageUrl }) => {
    const groupRef = useRef();
    const ringRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Floating animation
        if (groupRef.current) {
            groupRef.current.position.y = position[1] + Math.sin(time) * 0.1;
        }

        // Speaking animation (Bounce/Glow pulse)
        if (isSpeaking && ringRef.current) {
            ringRef.current.scale.setScalar(1.1 + Math.sin(time * 10) * 0.05);
            ringRef.current.material.opacity = 0.8 + Math.sin(time * 10) * 0.2;
        } else if (ringRef.current) {
            ringRef.current.scale.setScalar(1);
            ringRef.current.material.opacity = 0.5;
        }
    });

    // Use DiceBear 'bottts' for a cute robot look, or 'avataaars' for human
    // Use 'bottts' style as it fits a 3D robot/tech theme better than flat human vectors
    const seed = name || 'User';
    const finalImage = imageUrl || `https://api.dicebear.com/9.x/bottts/svg?seed=${seed}&backgroundColor=transparent`;

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Holographic Container/Ring */}
                <mesh ref={ringRef} position={[0, 0, -0.05]} rotation={[0, 0, 0]}>
                    <circleGeometry args={[0.7, 32]} />
                    <meshBasicMaterial color={isSpeaking ? "#34d399" : color} transparent opacity={0.2} />
                </mesh>

                {/* The "Screen" or Image Holder */}
                <DreiImage
                    url={finalImage}
                    scale={[1.2, 1.2]}
                    transparent
                    opacity={1}
                    position={[0, 0.1, 0.05]} // Slightly forward
                    side={THREE.DoubleSide}
                    toneMapped={false}
                />

                {/* Backing Plate (Robot Head Shape) */}
                <mesh position={[0, 0.1, 0]}>
                    <circleGeometry args={[0.6, 32]} />
                    <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
                </mesh>

                {/* Tech Frame */}
                <mesh position={[0, 0.1, -0.01]}>
                    <ringGeometry args={[0.6, 0.65, 32]} />
                    <meshStandardMaterial color="#334155" emissive="#1e293b" />
                </mesh>

                {/* Tech Decor - Antennae / Ears */}
                <Cylinder args={[0.02, 0.02, 0.4]} position={[0.5, 0.1, 0]} rotation={[0, 0, Math.PI / 3]}>
                    <meshStandardMaterial color="#475569" />
                </Cylinder>
                <Sphere args={[0.05]} position={[0.65, 0.35, 0]}>
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
                </Sphere>
                <Cylinder args={[0.02, 0.02, 0.4]} position={[-0.5, 0.1, 0]} rotation={[0, 0, -Math.PI / 3]}>
                    <meshStandardMaterial color="#475569" />
                </Cylinder>
                <Sphere args={[0.05]} position={[-0.65, 0.35, 0]}>
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
                </Sphere>
            </Float>

            {/* Neck/Base */}
            <Cylinder args={[0.08, 0.15, 0.3]} position={[0, -0.6, 0]}>
                <meshStandardMaterial color="#334155" />
            </Cylinder>

            {/* Name Tag */}
            {name && (
                <Html position={[0, 0.9, 0]} center transform sprite>
                    <div className="flex flex-col items-center">
                        <div className={`px-3 py-1 rounded-full border backdrop-blur-md transition-all duration-300 ${isSpeaking ? 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_15px_rgba(52,211,153,0.3)]' : 'bg-slate-900/60 border-white/10'}`}>
                            <span className={`text-[10px] font-bold whitespace-nowrap flex items-center gap-1 ${isSpeaking ? 'text-emerald-300' : 'text-slate-200'}`}>
                                {name}
                                {isSpeaking && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                            </span>
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
};

export default Face3D;
