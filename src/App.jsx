import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isNumAllowed, setIsNumAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumAllowed) char += "0123456789";
    if (isCharAllowed) char += "!@#$%^&*()_-+=[];<>?/";

    for (let i = 0; i < length; i++) {
      const str = Math.floor(Math.random() * char.length + 1);
      pass += char.charAt(str);
    }

    setPassword(pass);
  }, [length, isNumAllowed, isCharAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  useEffect(() => {
    generatePassword();
  }, [length, isCharAllowed, isNumAllowed]);
  return (
    <div
    className="min-h-screen bg-gradient-to-br from-red-800 to-blue-700 flex items-center justify-center" style={{ backgroundImage: 'linear-gradient(135deg, #f56565, #4299e1)' }}
    >
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-4 my-8 bg-slate-900">
        <h1 className="text-orange-500 text-3xl text-center my-3 mb-8 ">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 text-red-950"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-3">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length" className="text-blue-400">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={isNumAllowed}
              onChange={() => {
                setIsNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="number" className="text-white">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={isCharAllowed}
              onChange={() => {
                setIsCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput" className="text-rose-400">
              Character
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
