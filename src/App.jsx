import { Suspense, useRef } from 'react'; // Added useRef here
import { Canvas, useFrame } from '@react-three/fiber'; // Added useFrame here
import { OrbitControls } from '@react-three/drei';
import { Model } from './components/Sneaker';

// Rotating component (now properly inside Canvas scope)
function RotatingShoe() {
  const shoeRef = useRef();
  
  useFrame(() => {
    if (shoeRef.current) {
      shoeRef.current.rotation.y += 0.005;
    }
  });

  return <Model ref={shoeRef} />;
}

export default function App() {
  return (
    <Canvas shadows>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.5} 
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        
        <RotatingShoe />
        
        {/* Shadow plane */}
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -1.5, 0]} 
          receiveShadow
        >
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
      </Suspense>
      <OrbitControls 
        enablePan={false} // Disable panning for better UX
        minPolarAngle={Math.PI / 6} // Limit vertical rotation
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}