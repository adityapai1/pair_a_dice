import React from 'react';
import SemiCircleProgressBar from "react-progressbar-semicircle";

const PStrong = ({ passwordLength, setPasswordLength, passwordStrength }) => {
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
          <SemiCircleProgressBar
            percentage={passwordStrength}
            showPercentValue
            stroke="#10b981" // Green color
            strokeWidth={10}
            background="#374151" // Gray background
            diameter={120}
          />
        </div>
        <div className="flex justify-between mt-2 text-gray-300">
          <span>POOR</span>
          <span>GOOD</span>
        </div>
      </div>
    </div>
  );
};

export default PStrong;