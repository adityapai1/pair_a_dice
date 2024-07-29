import React, { useState } from 'react';
import Header from './components/header';
import PLength from './components/PLength';
import PStrong from './components/PStrong';



function App() {
  const [longInput, setLongInput] = useState('');
  const [passwordLength, setPasswordLength] = useState(4);
  const [passwordStrength, setPasswordStrength] = useState(65);

  const [isGeneratePressed,setGeneratePressed] = useState(false);
  const [passphraseGenerated,setPassphraseGenerated] = useState(false);



  return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center text-gray-300">
      <Header />
      
      {/*<PLength longInput={longInput} setLongInput={setLongInput} pLen = {passwordLength} /> */}
      <PLength 
        pLen={passwordLength}
        isGeneratePressed={isGeneratePressed}
        setGeneratePressed={setGeneratePressed}
        passphraseGenerated={passphraseGenerated}
        setPassphraseGenerated={setPassphraseGenerated}
      />
    
      <PStrong
        passwordLength={passwordLength}
        setPasswordLength={setPasswordLength}
        passwordStrength={passwordStrength}
        isGeneratePressed={isGeneratePressed}
        passphraseGenerated={passphraseGenerated}
        setGeneratePressed={setGeneratePressed}
      />
      
    </div>
  );
}

export default App;
