import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getSceneSegment, lerpVec3, lerp } from "./scenes";

// Smoothstep easing so motion through each waypoint has weight instead of
// snapping linearly - gives the camera moves a more cinematic feel.
const smoothstep = (t) => t * t * (3 - 2 * t);

export function CameraRig({ progressRef, keyLightRef, rimLightRef, isMobile }) {
  const { camera, size } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0.6, 4.6));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const keyColor = useRef(new THREE.Color("#8ea2ff"));
  const rimColor = useRef(new THREE.Color("#4338ca"));
  const currentViewOffset = useRef(0);
  const prevProgress = useRef(0);
  const currentRoll = useRef(0);

  // Pull the camera back a bit on narrow/portrait viewports so the shoe
  // never crops out of frame at any of the scene waypoints.
  const distanceScale = isMobile ? 1.35 : 1;

  useFrame((state, delta) => {
    const progress = progressRef.current ?? 0;
    const { a, b, t } = getSceneSegment(progress);
    const eased = smoothstep(t);

    const pos = lerpVec3(a.camera.position, b.camera.position, eased);
    const look = lerpVec3(a.camera.target, b.camera.target, eased);
    const fov = lerp(a.fov, b.fov, eased);

    targetLookAt.current.set(...look);

    // Scale the camera's distance from its look-at point, not just its raw
    // position, so the framing stays centered on the model.
    const rawPos = new THREE.Vector3(...pos);
    const dir = rawPos.clone().sub(targetLookAt.current).multiplyScalar(distanceScale);
    targetPos.current.copy(targetLookAt.current).add(dir);

    // A slow, constant idle drift so the camera never feels perfectly
    // static, even when scrolling is paused - a subtle handheld quality.
    const time = state.clock.elapsedTime;
    const driftX = Math.sin(time * 0.35) * 0.05;
    const driftY = Math.cos(time * 0.27) * 0.035;

    // Damp (frame-rate independent lerp) for a weighted, cinematic chase
    // rather than an instant snap to the scrubbed scroll value.
    const lambda = 3.2;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPos.current.x + driftX, lambda, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPos.current.y + driftY, lambda, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.current.z, lambda, delta);

    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookAt.current.x, lambda, delta);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookAt.current.y, lambda, delta);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookAt.current.z, lambda, delta);
    camera.lookAt(currentLookAt.current);

    // Scroll-velocity camera roll - scrolling fast banks the camera
    // slightly, like it's reacting to the motion, then settles level again
    // as scrolling slows. Computed after lookAt so it layers cleanly on
    // top rather than accumulating frame over frame.
    const rawVelocity = delta > 0 ? (progress - prevProgress.current) / delta : 0;
    prevProgress.current = progress;
    const targetRoll = THREE.MathUtils.clamp(rawVelocity * -3.5, -0.11, 0.11);
    currentRoll.current = THREE.MathUtils.damp(currentRoll.current, targetRoll, 4.5, delta);
    camera.rotateZ(currentRoll.current);

    if (camera.isPerspectiveCamera) {
      camera.fov = THREE.MathUtils.damp(camera.fov, fov, lambda, delta);

      // Text-left scenes get the shoe rendered off-axis into the right
      // portion of frame, instead of dead-center behind empty space, using
      // a real asymmetric camera frustum (not just cropping/panning the
      // canvas, which would distort the model).
      const targetOffset = isMobile ? 0 : lerp(a.viewOffset ?? 0, b.viewOffset ?? 0, eased);
      currentViewOffset.current = THREE.MathUtils.damp(currentViewOffset.current, targetOffset, lambda, delta);

      if (Math.abs(currentViewOffset.current) > 0.001 && size.width > 0 && size.height > 0) {
        camera.setViewOffset(
          size.width,
          size.height,
          currentViewOffset.current * size.width,
          0,
          size.width,
          size.height
        );
      } else {
        camera.clearViewOffset();
      }

      camera.updateProjectionMatrix();
    }

    // Lighting mood shifts with the scene too
    if (keyLightRef.current) {
      const targetKeyIntensity = lerp(a.light.keyIntensity, b.light.keyIntensity, eased);
      keyColor.current.set(a.light.keyColor).lerp(new THREE.Color(b.light.keyColor), eased);
      keyLightRef.current.intensity = THREE.MathUtils.damp(
        keyLightRef.current.intensity,
        targetKeyIntensity,
        lambda,
        delta
      );
      keyLightRef.current.color.copy(keyColor.current);
    }
    if (rimLightRef.current) {
      const targetRimIntensity = lerp(a.light.rimIntensity, b.light.rimIntensity, eased);
      rimColor.current.set(a.light.rimColor).lerp(new THREE.Color(b.light.rimColor), eased);
      rimLightRef.current.intensity = THREE.MathUtils.damp(
        rimLightRef.current.intensity,
        targetRimIntensity,
        lambda,
        delta
      );
      rimLightRef.current.color.copy(rimColor.current);
    }
  });

  return null;
}
