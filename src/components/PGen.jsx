import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalBox from '../components/modal';

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

const PGen = ({ pLen, setGeneratePressed, setPassphraseGenerated, setEntropy, setStrength }) => {
  const [longInput, setLongInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const generatePassword = async () => {
    setGeneratePressed(true);
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`https://pair-a-dice-backend.vercel.app/generate-sentence/${pLen}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEntropy(data.entropy);
      setLongInput(data.sentence);
      setStrength(data.strength);
      setPassphraseGenerated(true);
    } catch (error) {
      console.error('Error:', error);
      setError('Error generating password. Please try again.');
      setLongInput('');
    } finally {
      setIsLoading(false);
      setGeneratePressed(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(longInput)
      .then(() => {
        toast('Copied to clipboard!', {
          position: "top-right",
          autoClose: 2500,
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
        <h2 className="text-lg font-bold mb-2">Generate Passphrase:</h2>
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
            placeholder={error || "Passphrase will appear here."}
            className="flex-1 px-2 py-1 bg-gray-600 text-white focus:outline-none"
            readOnly
          />
          <button 
            className="bg-gray-600 px-2 py-1 hover:bg-gray-500 transition duration-300"
            onClick={copyToClipboard}
          >
            📋
          </button>
          <button
            className="bg-gray-600 text-white px-3 py-1 rounded-r-md hover:bg-gray-500 transition duration-300"
            onClick={() => setModalShow(true)}
          >
            ℹ️
          </button>
        </div>
      </div>
      <ModalBox show={modalShow} onHide={() => setModalShow(false)}>
        <p className='text-justify'>Pair-a-Dice turns complex security into simple fun! Instead of confusing numbers and symbols, you create a memorable password using random words. It's like building a unique puzzle only you can solve. This clever method tackles the age-old problem of passwords that are either too weak to protect you or too tricky to remember.</p>
        
      </ModalBox>
      
    </div>
  );
};

export default PGen;
