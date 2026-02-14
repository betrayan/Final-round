
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Cylinder, MeshDistortMaterial, Float, Sparkles, Html } from '@react-three/drei';

const Robot = (props) => {
    const headRef = useRef();
    const bodyRef = useRef();
    const leftArmRef = useRef();
    const rightArmRef = useRef();
    const leftAntennaRef = useRef();
    const rightAntennaRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (headRef.current) {
            headRef.current.rotation.y = Math.sin(time / 2) * 0.1;
            headRef.current.rotation.x = Math.sin(time / 3) * 0.05;
        }
        if (leftArmRef.current && rightArmRef.current) {
            leftArmRef.current.rotation.z = Math.sin(time * 2) * 0.2 - 0.5;
            rightArmRef.current.rotation.z = -Math.sin(time * 2) * 0.2 + 0.5;
        }
    });

    return (
        <group {...props}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Head */}
                <group position={[0, 1.2, 0]} ref={headRef}>
                    <Sphere args={[0.7, 32, 32]}>
                        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.8} />
                    </Sphere>

                    {/* Eyes */}
                    <Sphere position={[-0.25, 0.1, 0.6]} args={[0.08, 32, 32]}>
                        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
                    </Sphere>
                    <Sphere position={[0.25, 0.1, 0.6]} args={[0.08, 32, 32]}>
                        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
                    </Sphere>

                    {/* Antennas */}
                    <group ref={leftAntennaRef} position={[-0.4, 0.6, 0]} rotation={[0, 0, 0.3]}>
                        <Cylinder args={[0.02, 0.02, 0.5]} />
                        <Sphere position={[0, 0.3, 0]} args={[0.08]}>
                            <meshStandardMaterial color="#ff0055" emissive="#ff0055" />
                        </Sphere>
                    </group>

                    <group ref={rightAntennaRef} position={[0.4, 0.6, 0]} rotation={[0, 0, -0.3]}>
                        <Cylinder args={[0.02, 0.02, 0.5]} />
                        <Sphere position={[0, 0.3, 0]} args={[0.08]}>
                            <meshStandardMaterial color="#ff0055" emissive="#ff0055" />
                        </Sphere>
                    </group>
                </group>

                {/* Body */}
                <group position={[0, 0, 0]} ref={bodyRef}>
                    <Box args={[1.2, 1.4, 0.8]}> {/* Rounded Box would be better but Box is standard */}
                        <meshStandardMaterial color="#eeeeee" roughness={0.3} metalness={0.6} />
                    </Box>
                    {/* Screen on chest */}
                    <Box position={[0, 0.2, 0.41]} args={[0.8, 0.5, 0.05]}>
                        <meshStandardMaterial color="#222" />
                    </Box>
                    <mesh position={[0, 0.2, 0.44]}>
                        <planeGeometry args={[0.7, 0.4]} />
                        <MeshDistortMaterial speed={4} distort={0.2} color="#00ff88" emissive="#00ff88" />
                    </mesh>
                </group>

                {/* Arms */}
                <group position={[-0.7, 0.3, 0]} ref={leftArmRef}>
                    <Cylinder args={[0.15, 0.15, 1]} rotation={[0, 0, 0.2]}>
                        <meshStandardMaterial color="#cccccc" metalness={0.5} />
                    </Cylinder>
                    <Sphere position={[0, -0.6, 0]} args={[0.2]}>
                        <meshStandardMaterial color="#333" />
                    </Sphere>
                </group>
                <group position={[0.7, 0.3, 0]} ref={rightArmRef}>
                    <Cylinder args={[0.15, 0.15, 1]} rotation={[0, 0, -0.2]}>
                        <meshStandardMaterial color="#cccccc" metalness={0.5} />
                    </Cylinder>
                    <Sphere position={[0, -0.6, 0]} args={[0.2]}>
                        <meshStandardMaterial color="#333" />
                    </Sphere>
                </group>

                {/* Legs (Floating Jets) */}
                <group position={[-0.3, -0.8, 0]}>
                    <Cylinder args={[0.1, 0.2, 0.4]} />
                    <mesh position={[0, -0.3, 0]}>
                        <coneGeometry args={[0.15, 0.5, 32]} />
                        <meshBasicMaterial color="#00aaff" transparent opacity={0.6} />
                    </mesh>
                </group>
                <group position={[0.3, -0.8, 0]}>
                    <Cylinder args={[0.1, 0.2, 0.4]} />
                    <mesh position={[0, -0.3, 0]}>
                        <coneGeometry args={[0.15, 0.5, 32]} />
                        <meshBasicMaterial color="#00aaff" transparent opacity={0.6} />
                    </mesh>
                </group>

                <Sparkles count={50} scale={4} size={4} speed={0.4} opacity={0.5} color="#00aaff" />
            </Float>
        </group>
    );
};

export default Robot;
