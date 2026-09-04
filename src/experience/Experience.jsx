import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { Model } from "../components/Model";
import { CameraRig } from "./CameraRig";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}

export function Experience({ progressRef }) {
  const keyLightRef = useRef();
  const rimLightRef = useRef();
  const isMobile = useIsMobile();

  return (
    <Canvas
      shadows={!isMobile}
      dpr={isMobile ? [1, 1.2] : [1, 1.8]}
      camera={{ position: [0, 0.6, 4.6], fov: 45 }}
    >
      <color attach="background" args={["#170B2B"]} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} color="#F7F3EA" />
        <directionalLight
          ref={keyLightRef}
          position={[3, 4, 3]}
          intensity={1.5}
          color="#F7F3EA"
          castShadow={!isMobile}
          shadow-mapSize={isMobile ? [512, 512] : [1024, 1024]}
        />
        <directionalLight ref={rimLightRef} position={[-3, 1, -3]} intensity={0.7} color="#9B5DE5" />
        {/* A third fill light stands in for image-based reflections, so we
            don't depend on an external HDR fetch for the base look. */}
        <directionalLight position={[0, 2, -4]} intensity={0.6} color="#291347" />
        <Model progressRef={progressRef} isMobile={isMobile} scale={0.0029} position={[0, -0.02, 0]} />
        <ContactShadows
          position={[0, -0.42, 0]}
          opacity={0.35}
          scale={6}
          blur={isMobile ? 3.2 : 2.4}
          far={2}
          color="#0B0517"
          resolution={isMobile ? 256 : 512}
        />
      </Suspense>
      <CameraRig progressRef={progressRef} keyLightRef={keyLightRef} rimLightRef={rimLightRef} isMobile={isMobile} />
    </Canvas>
  );
}
