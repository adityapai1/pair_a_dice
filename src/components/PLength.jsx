import React, { useState } from 'react';

const PLength = ({pLen}) => {
  const [longInput, setLongInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePassword = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/generate-sentence/${pLen}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLongInput(data.sentence);
    } catch (error) {
      console.error('Error:', error);
      setError('Error generating password. Please try again.');
      setLongInput('');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(longInput)
      .then(() => alert('Password copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className="bg-gray-800 mt-12 p-4 w-full max-w-2xl rounded-lg">
      <div className="bg-gray-700 p-4 rounded-lg text-white">
        <h2 className="text-lg font-bold mb-2">Generate Password:</h2>
        <div className="flex mb-2">
          <button 
            className={`bg-blue-600 text-white px-3 py-1 rounded-l-md hover:bg-blue-700 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={generatePassword}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
          <input
            type="text"
            value={longInput}
            onChange={(e) => setLongInput(e.target.value)}
            placeholder={error || "Your generated PASSPHRASE will appear here."}
            className="flex-1 px-2 py-1 bg-gray-600 text-white focus:outline-none"
            readOnly
          />
          <button 
            className="bg-gray-600 px-2 py-1 rounded-r-md hover:bg-gray-500 transition duration-300"
            onClick={copyToClipboard}
          >
            📋
          </button>
        </div>
      </div>
    </div>
  );
};

export default PLength;