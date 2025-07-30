import { useState, useEffect } from "react";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  const loadingStages = [
    { progress: 20, text: "Loading assets..." },
    { progress: 45, text: "Connecting to server..." },
    { progress: 70, text: "Preparing content..." },
    { progress: 90, text: "Almost ready..." },
    { progress: 100, text: "Complete!" },
  ];

  useEffect(() => {
    const totalDuration = 7000; // 7 seconds
    const intervalTime = 100; // Update every 100ms for smooth animation
    const totalSteps = totalDuration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / totalSteps) * 100, 100);

      setProgress(newProgress);

      // Update loading text based on progress - simplified logic
      if (newProgress >= 90) {
        setLoadingText("Almost ready...");
      } else if (newProgress >= 70) {
        setLoadingText("Preparing content...");
      } else if (newProgress >= 45) {
        setLoadingText("Connecting to server...");
      } else if (newProgress >= 20) {
        setLoadingText("Loading assets...");
      }

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setProgress(100);
        setLoadingText("Complete!");
        setTimeout(() => onComplete && onComplete(), 500);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center z-50">
      {/* Main spinner */}
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-blue-500/30 rounded-full"></div>
        <div className="absolute inset-0 w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Progress bar */}
      <div className="w-80 max-w-sm mx-4 mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{loadingText}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Loading text */}
      <p className="text-white text-xl font-semibold animate-pulse">
        Loading...
      </p>

      {/* Dots animation */}
      <div className="flex space-x-1 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
