import React, { useState } from 'react';
import Header from './components/header';
import PLength from './components/PLength';
import PStrong from './components/PStrong';



function App() {
  const [longInput, setLongInput] = useState('');
  const [passwordLength, setPasswordLength] = useState(4);
  const [passwordStrength, setPasswordStrength] = useState(65);

  return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center text-gray-300">
      <Header />
      
      {/* <PLength/> */}

      <PLength longInput={longInput} setLongInput={setLongInput} />

    
      
      <PStrong
        passwordLength={passwordLength}
        setPasswordLength={setPasswordLength}
        passwordStrength={passwordStrength}
      />
      
      
    </div>
  );
}

export default App;
