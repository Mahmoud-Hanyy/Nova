import { useEffect, useRef } from "react";
import { useProgress } from "@react-three/drei";

// Tied to the real THREE.js loading manager (via drei's useProgress), so
// this reflects actual GLB/texture download progress instead of a fake
// fixed-duration timer.
const Loader = ({ onComplete }) => {
  const { progress, active, loaded, total } = useProgress();
  const firedRef = useRef(false);

  useEffect(() => {
    if (!firedRef.current && !active && total > 0 && loaded >= total) {
      firedRef.current = true;
      const t = setTimeout(() => onComplete && onComplete(), 350);
      return () => clearTimeout(t);
    }
  }, [active, loaded, total, onComplete]);

  return (
    <div className="fixed inset-0 bg-charcoal flex flex-col items-center justify-center z-50">
      <div className="relative mb-8">
        <div className="w-16 h-16 border-2 border-clay/25 rounded-full"></div>
        <div className="absolute inset-0 w-16 h-16 border-2 border-clay border-t-transparent rounded-full animate-spin"></div>
      </div>

      <div className="w-80 max-w-sm mx-4 mb-6">
        <div className="font-display flex justify-between text-xs tracking-widest uppercase text-stone mb-2">
          <span>Loading Nova</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-charcoal-soft rounded-full h-[3px]">
          <div
            className="bg-clay h-[3px] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <p className="font-display text-cream text-lg font-medium tracking-tight">Preparing the reveal...</p>
    </div>
  );
};

export default Loader;
