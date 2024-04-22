import { useRef, useState, useEffect } from "react";

import { toast } from "react-toastify";

function PasswordGenerator({ defaultLength = 16 }) {
  const [password, setPassword] = useState(generateRandomPassword(defaultLength));
  const [length, setLength] = useState(defaultLength);
  const lowercaseRef = useRef(null);
  const uppercaseRef = useRef(null);
  const numberRef = useRef(null);
  const symbolRef = useRef(null);

  useEffect(() => {
    updatePassword();
  }, [length, lowercaseRef.current, uppercaseRef.current, numberRef.current, symbolRef.current]);

  function generateRandomPassword(length) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return newPassword;
  }

  function updatePassword() {
    const includeLowercase = lowercaseRef.current.checked;
    const includeUppercase = uppercaseRef.current.checked;
    const includeNumber = numberRef.current.checked;
    const includeSymbol = symbolRef.current.checked;

    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+=";

    let chars = "";
    if (includeLowercase) chars += lowercaseChars;
    if (includeUppercase) chars += uppercaseChars;
    if (includeNumber) chars += numberChars;
    if (includeSymbol) chars += symbolChars;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(newPassword);
  }

  const handleLengthChange = (event) => {
    const newLength = parseInt(event.target.value);
    setLength(newLength);
    updatePassword();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Contraseña copiada al portapapeles");
  };

  return (
    <div className="container">
      <h2 className="title">Generador de contraseñas</h2>
      <div className="result">
        <div className="result__viewbox" id="result">
          {password}
          <i className="bi bi-copy" onClick={copyToClipboard}></i>
        </div>
      </div>

      <div className="length range__slider" data-min="5" data-max="32">
        <div className="length__title field-title">Longitud: {length}</div>
        <input
          id="slider"
          type="range"
          min="5"
          max="32"
          value={length}
          onChange={handleLengthChange}
        />
      </div>

      <div className="settings">
        <span className="settings__title field-title">Configuraciones:</span>
        <div className="setting">
          <input
            ref={lowercaseRef}
            type="checkbox"
            id="lowercase"
            defaultChecked
            onChange={updatePassword}
          />
          <label htmlFor="lowercase">Incluir Minúsculas</label>
        </div>
        <div className="setting">
          <input ref={uppercaseRef} type="checkbox" id="uppercase" onChange={updatePassword} />
          <label htmlFor="uppercase">Incluir Mayúsculas</label>
        </div>
        <div className="setting">
          <input
            ref={numberRef}
            type="checkbox"
            id="number"
            defaultChecked
            onChange={updatePassword}
          />
          <label htmlFor="number">Incluir Números</label>
        </div>
        <div className="setting">
          <input ref={symbolRef} type="checkbox" id="symbol" onChange={updatePassword} />
          <label htmlFor="symbol">Incluir Símbolos</label>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
