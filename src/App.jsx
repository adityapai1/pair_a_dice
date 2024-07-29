import React, { useState } from 'react';
import Header from './components/header';
import PLength from './components/PLength';
import PStrong from './components/PStrong';

function App() {
  const [longInput, setLongInput] = useState('');
  const [passwordLength, setPasswordLength] = useState(4);
  const [passwordStrength, setPasswordStrength] = useState(65);
  const [isGeneratePressed, setGeneratePressed] = useState(false);
  const [passphraseGenerated, setPassphraseGenerated] = useState(false);
  const [entropy, setEntropy] = useState(0);
  const [timeToCrack, setTimeToCrack] = useState('');

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center text-gray-300">
      <Header />
      <PLength
        pLen={passwordLength}
        isGeneratePressed={isGeneratePressed}
        setGeneratePressed={setGeneratePressed}
        passphraseGenerated={passphraseGenerated}
        setPassphraseGenerated={setPassphraseGenerated}
        setEntropy={setEntropy}
        setTimeToCrack={setTimeToCrack}
      />
      <PStrong
        passwordLength={passwordLength}
        setPasswordLength={setPasswordLength}
        passwordStrength={passwordStrength}
        isGeneratePressed={isGeneratePressed}
        passphraseGenerated={passphraseGenerated}
        entropy={entropy}
        timeToCrack={timeToCrack}
        setGeneratePressed={setGeneratePressed}
      />
    </div>
  );
}

export default App;

// import React, { useState } from 'react';
// import Header from './components/header';
// import PLength from './components/PLength';
// import PStrong from './components/PStrong';

// function App() {
//   const [longInput, setLongInput] = useState('');
//   const [passwordLength, setPasswordLength] = useState(4);
//   const [passwordStrength, setPasswordStrength] = useState(65);
//   const [isGeneratePressed, setGeneratePressed] = useState(false);
//   const [passphraseGenerated, setPassphraseGenerated] = useState(false);
//   const [entropy, setEntropy] = useState(0);
//   const [timeToCrack, setTimeToCrack] = useState('');

//   return (
//     <div className="min-h-screen bg-gray-900 flex flex-col items-center text-gray-300">
//       <Header />
//       <PLength
//         pLen={passwordLength}
//         isGeneratePressed={isGeneratePressed}
//         setGeneratePressed={setGeneratePressed}
//         passphraseGenerated={passphraseGenerated}
//         setPassphraseGenerated={setPassphraseGenerated}
//         setEntropy={setEntropy}
//         setTimeToCrack={setTimeToCrack}
//       />
//       <PStrong
//         passwordLength={passwordLength}
//         setPasswordLength={setPasswordLength}
//         passwordStrength={passwordStrength}
//         isGeneratePressed={isGeneratePressed}
//         passphraseGenerated={passphraseGenerated}
//         entropy={entropy}
//         timeToCrack={timeToCrack}
//         setGeneratePressed={setGeneratePressed}
//       />
//     </div>
//   );
// }

// export default App;