import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { Model } from "../components/Model";
import { CameraRig } from "./CameraRig";

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < 768 : false,
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
            dpr={isMobile ? [1, 1.15] : [1, 1.5]}
            camera={{ position: [0, 0.6, 4.6], fov: 45 }}
            gl={{ alpha: true, antialias: !isMobile, powerPreference: "high-performance" }}
            onCreated={({ gl }) => gl.setClearColor("#191a17", 0)}
        >
            <Suspense fallback={null}>
                <ambientLight intensity={0.38} color="#F1E8D7" />
                <directionalLight
                    ref={keyLightRef}
                    position={[3, 4, 3]}
                    intensity={0.9}
                    color="#F1E8D7"
                    castShadow={!isMobile}
                    shadow-mapSize={isMobile ? [512, 512] : [1024, 1024]}
                />
                <directionalLight
                    ref={rimLightRef}
                    position={[-3, 1, -3]}
                    intensity={0.4}
                    color="#D3EF4A"
                />
                {/* A third fill light stands in for image-based reflections, so we
            don't depend on an external HDR fetch for the base look. */}
                <directionalLight
                    position={[0, 2, -4]}
                    intensity={0.3}
                    color="#33352C"
                />
                <Model
                    progressRef={progressRef}
                    isMobile={isMobile}
                    scale={0.0029}
                    position={[0, -0.02, 0]}
                />
                {!isMobile && <ContactShadows
                    position={[0, -0.42, 0]}
                    opacity={0.35}
                    scale={6}
                    blur={2.4}
                    far={2}
                    color="#11120F"
                    resolution={512}
                />}
            </Suspense>
            <CameraRig
                progressRef={progressRef}
                keyLightRef={keyLightRef}
                rimLightRef={rimLightRef}
                isMobile={isMobile}
            />
        </Canvas>
    );
}
