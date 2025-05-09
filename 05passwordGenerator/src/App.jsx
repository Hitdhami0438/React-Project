import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(0);
  const [numberAallowed, setNumberAllowed] = useState(0);
  false;
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //userRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAallowed) str += "01234556789";
    if (charAllowed) str += "!@#$%^&*()_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAallowed, charAllowed, setlength]);

  const copyPasswordToCliphboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 99)
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAallowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-sm mx-auto mt-10 bg-gray-800 text-orange-500 p-4 rounded-lg shadow-md">
        <h1 className="text-white text-center text-lg font-semibold mb-3">
          Password Generator
        </h1>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            value={password}
            className="flex-grow py-1.5 px-3 bg-gray-900 text-white placeholder-gray-500 border border-gray-600 rounded-md text-sm outline-none"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToCliphboard}>copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAallowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charactorInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Charactars</label>
        </div>
      </div>
    </>
  );
}

export default App;
