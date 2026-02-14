
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Cloud } from '@react-three/drei';

const GlobalBackground = () => {
    const sceneRef = useRef();

    useFrame((state) => {
        if (sceneRef.current) {
            sceneRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
        }
    })

    return (
        <group ref={sceneRef}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            {/* Use simple points or very low-poly geometry for broad background movement */}
            {/* Could add a nebulas cloud effect if performance allows, but Stars is safer for global use */}
        </group>
    );
};

export default GlobalBackground;
