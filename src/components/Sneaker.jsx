import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/sneaker.glb');
  return (
    <group {...props} dispose={null} scale={0.01} position={[0, -1, 0]} rotation={[0, Math.PI / 4, 0]}>
      <mesh geometry={nodes.Shoe_set_02_Sole_0.geometry} material={materials.Sole} />
      <mesh geometry={nodes.Shoe_set_02_Outer_0.geometry} material={materials.Outer} />
      <mesh geometry={nodes.Shoe_set_02_Laces_0.geometry} material={materials.Laces} />
      <mesh geometry={nodes.Shoe_set_02_Inner_0.geometry} material={materials.Inner} />
    </group>
  );
}

useGLTF.preload('/sneaker.glb')
