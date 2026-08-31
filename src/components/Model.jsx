import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// The camera does the storytelling now (see CameraRig). The shoe just needs
// to feel alive: a gentle idle bob, a faint scroll-linked lean, and a small
// pointer-parallax tilt - subtle reactions, not the whole show.
export function Model({ progressRef, ...props }) {
  const { nodes, materials } = useGLTF("/sneaker-compressed.glb", "/draco/");
  const modelRef = useRef();
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!modelRef.current) return;
    const progress = progressRef?.current ?? 0;
    const t = state.clock.elapsedTime;

    // Idle breathing bob + a slow idle wobble, so the shoe never sits
    // perfectly frozen even when scroll and pointer are both still.
    const bob = Math.sin(t * 0.8) * 0.018;
    const idleWobble = Math.sin(t * 0.45) * 0.035;

    // Scroll-linked turn - camera still leads the composition, but the
    // shoe now visibly rotates through the journey instead of just leaning.
    const scrollYaw = progress * 0.85;
    const scrollTilt = Math.sin(progress * Math.PI) * 0.09;

    // Pointer parallax tilt
    const pointerYaw = pointer.x * 0.16;
    const pointerPitch = -pointer.y * 0.1;

    const targetRotY = scrollYaw + pointerYaw + idleWobble;
    const targetRotX = scrollTilt + pointerPitch;

    modelRef.current.rotation.y = THREE.MathUtils.damp(modelRef.current.rotation.y, targetRotY, 2.2, delta);
    modelRef.current.rotation.x = THREE.MathUtils.damp(modelRef.current.rotation.x, targetRotX, 2.2, delta);
    modelRef.current.position.y = THREE.MathUtils.damp(
      modelRef.current.position.y,
      (props.position?.[1] ?? 0) + bob,
      4,
      delta
    );
  });

  return (
    <group {...props} dispose={null} ref={modelRef}>
      <mesh geometry={nodes.Shoe_set_02_Sole_0.geometry} material={materials.Sole} castShadow receiveShadow />
      <mesh geometry={nodes.Shoe_set_02_Outer_0.geometry} material={materials.Outer} castShadow receiveShadow />
      <mesh geometry={nodes.Shoe_set_02_Laces_0.geometry} material={materials.Laces} castShadow receiveShadow />
      <mesh geometry={nodes.Shoe_set_02_Inner_0.geometry} material={materials.Inner} castShadow receiveShadow />
    </group>
  );
}

// Preload the model for faster loading - this fires as soon as this module
// is imported, so loading starts the moment the app boots, not after the
// loading screen finishes.
useGLTF.preload("/sneaker-compressed.glb", "/draco/");
