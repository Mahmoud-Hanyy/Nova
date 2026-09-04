import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// The camera does the storytelling now (see CameraRig). The shoe just needs
// to feel alive: a gentle idle bob, a faint scroll-linked lean, and a small
// pointer-parallax tilt - subtle reactions, not the whole show.
export function Model({ progressRef, isMobile = false, ...props }) {
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

    // Scroll-linked choreography gives the shoe a distinct reveal arc:
    // it turns, pitches, and rolls through the camera's changing views.
    const scrollPhase = progress * Math.PI * 2;
    const scrollYaw = progress * 1.8 + Math.sin(scrollPhase) * 0.22;
    const scrollPitch = Math.sin(scrollPhase * 0.5) * 0.16;
    const scrollRoll = Math.sin(scrollPhase + 0.6) * 0.14;
    const scrollLift = Math.sin(scrollPhase) * 0.055;
    const scrollScale = 1 + Math.sin(progress * Math.PI) * 0.08;

    // Pointer parallax tilt
    const pointerYaw = pointer.x * 0.16;
    const pointerPitch = -pointer.y * 0.1;

    const targetRotY = scrollYaw + pointerYaw + idleWobble;
    const targetRotX = scrollPitch + pointerPitch;
    const targetRotZ = scrollRoll + Math.sin(t * 0.55) * 0.018;

    modelRef.current.rotation.y = THREE.MathUtils.damp(modelRef.current.rotation.y, targetRotY, 2.2, delta);
    modelRef.current.rotation.x = THREE.MathUtils.damp(modelRef.current.rotation.x, targetRotX, 2.2, delta);
    modelRef.current.rotation.z = THREE.MathUtils.damp(modelRef.current.rotation.z, targetRotZ, 2.2, delta);
    modelRef.current.position.y = THREE.MathUtils.damp(
      modelRef.current.position.y,
      (props.position?.[1] ?? 0) + bob + scrollLift,
      4,
      delta
    );
    const responsiveScale = isMobile ? 1.12 : 1;
    const nextScale = (props.scale ?? 0.0024) * responsiveScale * scrollScale;
    modelRef.current.scale.x = THREE.MathUtils.damp(modelRef.current.scale.x, nextScale, 3, delta);
    modelRef.current.scale.y = THREE.MathUtils.damp(modelRef.current.scale.y, nextScale, 3, delta);
    modelRef.current.scale.z = THREE.MathUtils.damp(modelRef.current.scale.z, nextScale, 3, delta);
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
