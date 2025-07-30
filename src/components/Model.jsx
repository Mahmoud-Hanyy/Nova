import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
  const { nodes, materials } = useGLTF('/sneaker-compressed.glb')
  const modelRef = useRef();

  useFrame(() => {
    modelRef.current.rotation.x += 0.01
    modelRef.current.rotation.y += 0.01
    modelRef.current.rotation.z += 0.01
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

// Preload the model for faster loading
useGLTF.preload('/sneaker.glb');