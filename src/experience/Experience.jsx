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
      <color attach="background" args={["#1C1A17"]} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} color="#F5E6D3" />
        <directionalLight
          ref={keyLightRef}
          position={[3, 4, 3]}
          intensity={1.3}
          color="#E8C9A0"
          castShadow={!isMobile}
          shadow-mapSize={isMobile ? [512, 512] : [1024, 1024]}
        />
        <directionalLight ref={rimLightRef} position={[-3, 1, -3]} intensity={0.6} color="#8F4F38" />
        {/* A third fill light stands in for image-based reflections, so we
            don't depend on an external HDR fetch for the base look. */}
        <directionalLight position={[0, 2, -4]} intensity={0.45} color="#EDE4D6" />
        <Model progressRef={progressRef} scale={0.0024} position={[0, -0.02, 0]} />
        <ContactShadows
          position={[0, -0.42, 0]}
          opacity={0.5}
          scale={6}
          blur={isMobile ? 3.2 : 2.4}
          far={2}
          color="#131110"
          resolution={isMobile ? 256 : 512}
        />
      </Suspense>
      <CameraRig progressRef={progressRef} keyLightRef={keyLightRef} rimLightRef={rimLightRef} isMobile={isMobile} />
    </Canvas>
  );
}
