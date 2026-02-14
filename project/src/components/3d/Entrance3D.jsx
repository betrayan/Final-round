
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Sphere, MeshDistortMaterial, Float, Stars, Sparkles } from '@react-three/drei';

const Portal = (props) => {
    const outerRingRef = useRef();
    const innerSphereRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (outerRingRef.current) {
            outerRingRef.current.rotation.z = time * 0.2;
            outerRingRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
        }
    });

    return (
        <group {...props}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Outer Ring - Stone/Tech Arch */}
                <Torus ref={outerRingRef} args={[2.5, 0.2, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial
                        color="#444"
                        roughness={0.4}
                        metalness={0.8}
                        emissive="#222"
                    />
                </Torus>

                {/* Inner Portal - Distorted Glowing Sphere */}
                <Sphere args={[2, 64, 64]}>
                    <MeshDistortMaterial
                        color="#6c00ff"
                        emissive="#aa00ff"
                        emissiveIntensity={1}
                        roughness={0.1}
                        metalness={1}
                        distort={0.4}
                        speed={2}
                    />
                </Sphere>

                {/* Connecting Elements */}
                {[...Array(6)].map((_, i) => (
                    <Torus
                        key={i}
                        args={[2.2, 0.05, 16, 100]}
                        rotation={[Math.PI / 2, 0, (i * Math.PI) / 3]}
                    >
                        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
                    </Torus>
                ))}

                <Sparkles count={100} scale={8} size={6} speed={0.4} opacity={0.6} color="#ce82ff" />
            </Float>
        </group>
    );
};

export default Portal;
