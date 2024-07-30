import React, { useRef, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import tarazoo from '../assets/tarazoo.json';

const strengthColors = {
  'Very Weak': 'bg-red-600',     // Dark Red
  'Weak': 'bg-orange-500',       // Dark Orange
  'Strong': 'bg-green-500',      // Light Green
  'Very Strong': 'bg-sky-500'    // Dark Green
};

const PStrong = ({ passwordLength, setPasswordLength, isGeneratePressed, entropy, strength }) => {
  const lottieRef = useRef();
  const [showEntropy, setShowEntropy] = useState(false);

  useEffect(() => {
    if (lottieRef.current) {
      if (isGeneratePressed) {
        setShowEntropy(false);
        lottieRef.current.setDirection(1);
        lottieRef.current.play();
      } else {
        lottieRef.current.pause();
        lottieRef.current.goToAndStop(10, true);
        if (entropy > 0) {
          setTimeout(() => setShowEntropy(true), 500); // Delay to allow for fade out
        }
      }
    }
  }, [isGeneratePressed, entropy]);

  // Determine the background color class based on strength and showEntropy
  const strengthClass = showEntropy ? (strengthColors[strength] || 'bg-gray-600') : 'bg-gray-700';

  return (
    <div className="bg-gray-800 m-6 p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-center w-full max-w-2xl">
      <div className="w-full max-w-md mb-8 md:mb-0 md:mr-4">
        <h3 className="text-md font-semibold mb-2 text-center">Word Count</h3>
        <div className="bg-gray-700 p-8 h-32 rounded-lg relative shadow-md">
          <input
            type="range"
            min="1"
            max="6"
            step="1"
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-gray-300">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
          </div>
        </div>
      </div>

      {/* Password Strength section */}
      <div className="w-full max-w-md mt-4 md:mt-0">
        <h3 className="text-md font-semibold mb-2 text-center">Password Strength</h3>
        <div 
          className={`p-4 h-32 rounded-lg shadow-md flex items-center justify-center relative transition-colors duration-500 ${strengthClass}`}
        >
          <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${showEntropy ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-2xl font-bold text-white">{strength}</span>
            <span className="text-sm font-light text-gray-300 mt-1">{entropy} Bits</span>
          </div>
          <div className={`absolute inset-0 transition-opacity duration-500 ${showEntropy ? 'opacity-0' : 'opacity-100'}`}>
            <Lottie
              lottieRef={lottieRef}
              animationData={tarazoo}
              loop={isGeneratePressed}
              autoplay={false}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PStrong;