import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom CSS to override React-Toastify styles
const customToastStyle = `
  .Toastify__toast-container {
    width: 250px;
  }
  .Toastify__toast {
    background-color: #2d3748;
    color: white;
    font-size: 14px;
    padding: 10px 15px;
    border-radius: 4px;
  }
  .Toastify__progress-bar {
    background: #3b82f6;
  }
`;

const PLength = ({ pLen, isGeneratePressed, setGeneratePressed, passphraseGenerated, setPassphraseGenerated, setEntropy, setTimeToCrack }) => {
  const [longInput, setLongInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateTimeToCrack = (entropyBits, attemptsPerSecond = 1_000_000_000) => {
    const SECONDS_IN_A_YEAR = 31_536_000;
    const combinations = 2 ** entropyBits;
    const time_seconds = combinations / attemptsPerSecond;
    const time_years = time_seconds / SECONDS_IN_A_YEAR;

    if (time_years >= 1_000_000_000) {
      return `${(time_years / 1_000_000_000).toFixed(2)} billion years`;
    } else if (time_years >= 1_000_000) {
      return `${(time_years / 1_000_000).toFixed(2)} million years`;
    } else if (time_years >= 1_000) {
      return `${(time_years / 1_000).toFixed(2)} thousand years`;
    } else {
      return `${time_years.toFixed(2)} years`;
    }
  };

  const generatePassword = async () => {
    setGeneratePressed(true);  // Start looping
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/generate-sentence/${pLen}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEntropy(data.entropy);
      setLongInput(data.sentence);
      setTimeToCrack(calculateTimeToCrack(data.entropy));

      setPassphraseGenerated(true);
    } catch (error) {
      console.error('Error:', error);
      setError('Error generating password. Please try again.');
      setLongInput('');
    } finally {
      setIsLoading(false);
      setGeneratePressed(false);  // Stop looping after generation is complete
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(longInput)
      .then(() => {
        toast('Copied to clipboard!', {
          position: "top-right",
          autoClose: 5000, // Increased to 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className="bg-gray-800 mt-12 p-4 w-full max-w-2xl rounded-lg">
      <style>{customToastStyle}</style>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
            className="bg-gray-600 px-2 py-1 rounded-r-md hover:bg-gray-500 transition duration-100"
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


