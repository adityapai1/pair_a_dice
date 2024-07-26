// PasswordGenerator.js
import React from 'react';

const PLength = ({ longInput, setLongInput }) => {
  return (
    <div className="bg-gray-800 mt-12 p-4 w-full max-w-2xl rounded-lg">
      <div className="bg-gray-700 p-4 rounded-lg text-white">
        <h2 className="text-lg font-bold mb-2">Generate Password:</h2>
        <div className="flex mb-2">
          <button 
            className="bg-blue-600 text-white px-3 py-1 rounded-l-md hover:bg-blue-700 transition duration-300"
          >
            Generate
          </button>
          <input
            type="text"
            value={longInput}
            onChange={(e) => setLongInput(e.target.value)}
            placeholder="Your generated PASSPHRASE will appear here."
            className="flex-1 px-2 py-1 bg-gray-600 text-white focus:outline-none"
          />
          <button 
            className="bg-gray-600 px-2 py-1 rounded-r-md hover:bg-gray-500 transition duration-300"
          >
          📋
          </button>
        </div>
      </div>
    </div>
  );
};

export default PLength;