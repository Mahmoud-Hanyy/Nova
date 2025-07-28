import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
  const { nodes, materials } = useGLTF('/sneaker.glb');
  const modelRef = useRef();

  // Subtle auto-rotation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group {...props} dispose={null} ref={modelRef}>
      <mesh geometry={nodes.Shoe_set_02_Sole_0.geometry} material={materials.Sole} />
      <mesh geometry={nodes.Shoe_set_02_Outer_0.geometry} material={materials.Outer} />
      <mesh geometry={nodes.Shoe_set_02_Laces_0.geometry} material={materials.Laces} />
      <mesh geometry={nodes.Shoe_set_02_Inner_0.geometry} material={materials.Inner} />
    </group>
  );
}

useGLTF.preload('/sneaker.glb');