import React from 'react';

function ModalBox({ show, onHide, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div 
        className={`
          bg-gray-800 text-white rounded-lg p-8 max-w-lg w-full m-4
          transform transition-all duration-3000 ease-in-out
          ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Why Pair-a-Dice? </h2>
          <button
            onClick={onHide}
            className="text-gray-400 hover:text-white focus:outline-none transition duration-3000 ease-in-out"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          {children}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onHide}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalBox;