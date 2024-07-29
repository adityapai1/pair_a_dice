  import React, { useRef, useEffect } from 'react';
  import Lottie from 'lottie-react';
  import tarazoo from '../assets/tarazoo.json';

  const PStrong = ({ passwordLength, setPasswordLength, passwordStrength, isGeneratePressed, passphraseGenerated, setGeneratePressed }) => {
    const lottieRef = useRef();

    useEffect(() => {
      if (lottieRef.current) {
        if (isGeneratePressed) {
          lottieRef.current.setDirection(1);
          lottieRef.current.play();
        } else {
          lottieRef.current.pause();
          lottieRef.current.goToAndStop(10, true);
        }
      }
    }, [isGeneratePressed]);

    return (
      <div className="bg-gray-800 m-6 p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-center w-full max-w-2xl">
        <div className="w-full max-w-md mb-8 md:mb-0 md:mr-4">
          <h3 className="text-md font-semibold mb-2 text-center">Password Length</h3>
          <div className="bg-gray-700 p-8 h-32 rounded-lg relative shadow-md">
            <input
              type="range"
              min="2"
              max="6"
              step="1"
              value={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-gray-300">
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-md mt-4 md:mt-0">
          <h3 className="text-md font-semibold mb-2 text-center">Password Strength</h3>
          <div className="bg-gray-700 p-4 h-32 rounded-lg shadow-md flex items-center justify-center">
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
    );
  };

  export default PStrong;


