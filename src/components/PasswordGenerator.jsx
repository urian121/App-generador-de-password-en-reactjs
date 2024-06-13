import { useRef, useState, useEffect } from "react";

import { toast } from "react-toastify";

function PasswordGenerator({ defaultLength = 16 }) {
  const [password, setPassword] = useState(generateRandomPassword(defaultLength)); // Estado para almacenar la contraseña generada aleatoriamente.
  const [length, setLength] = useState(defaultLength); // Estado para almacenar la longitud de la contraseña.
  const lowercaseRef = useRef(null); // Referencia para el checkbox de minúsculas.
  const uppercaseRef = useRef(null); // Referencia para el checkbox de mayúsculas.
  const numberRef = useRef(null); // Referencia para el checkbox de números.
  const symbolRef = useRef(null); // Referencia para el checkbox de símbolos.

  useEffect(() => {
    updatePassword();
  }, [length, lowercaseRef.current, uppercaseRef.current, numberRef.current, symbolRef.current]);

  /**
   * Función para generar una contraseña aleatoria de longitud especificada.
   * Utiliza un conjunto de caracteres alfanuméricos para crear una contraseña segura.
   */
  function generateRandomPassword(length) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return newPassword;
  }

  /**
   * Función que actualiza la contraseña generada basada en las opciones seleccionadas por el usuario.
   * Utiliza las referencias a los checkboxes (lowercaseRef, uppercaseRef, numberRef, symbolRef) para determinar qué tipos de caracteres incluir.
   * Construye una cadena de caracteres combinando letras minúsculas, mayúsculas, números y/o símbolos según las opciones seleccionadas.
   * Genera una nueva contraseña aleatoria de longitud especificada y la actualiza utilizando setPassword().
   */

  function updatePassword() {
    const includeLowercase = lowercaseRef.current.checked; // Obtiene el estado actual del checkbox de minúsculas.
    const includeUppercase = uppercaseRef.current.checked; // Obtiene el estado actual del checkbox de mayúsculas.
    const includeNumber = numberRef.current.checked; // Obtiene el estado actual del checkbox de números.
    const includeSymbol = symbolRef.current.checked; // Obtiene el estado actual del checkbox de símbolos.
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"; // Define una cadena que contiene todas las letras minúsculas del alfabeto inglés.
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Define una cadena que contiene todas las letras mayúsculas del alfabeto inglés.
    const numberChars = "0123456789"; // Define una cadena que contiene todos los dígitos del 0 al 9.
    const symbolChars = "!@#$%^&*()_+="; // Define una cadena que contiene varios símbolos especiales comúnmente utilizados.

    // Construye una cadena 'chars' concatenando los conjuntos de caracteres seleccionados basados en las opciones del usuario.
    let chars = "";
    if (includeLowercase) chars += lowercaseChars;
    if (includeUppercase) chars += uppercaseChars;
    if (includeNumber) chars += numberChars;
    if (includeSymbol) chars += symbolChars;

    // Genera una nueva contraseña aleatoria de longitud 'length' utilizando los caracteres disponibles en 'chars'.
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Establece la nueva contraseña generada ('newPassword') como el estado 'password'.
    setPassword(newPassword);
  }

  /**
   * Esta función handleLengthChange se encarga de manejar el cambio en la longitud de la contraseña, respondiendo al evento onChange
   * de un elemento (como un input) y actualizando la contraseña en consecuencia.
   */
  const handleLengthChange = (event) => {
    const newLength = parseInt(event.target.value); // Obtiene el nuevo valor de longitud como un número entero desde el evento del elemento.
    setLength(newLength); // Actualiza el estado 'length' con el nuevo valor de longitud.
    updatePassword(); // Llama a la función 'updatePassword()' para generar una nueva contraseña con la longitud actualizada.
  };

  /**
   * Función para copiar la contraseña actual al portapapeles del usuario utilizando el API del navegador.
   * Muestra una notificación de éxito utilizando toast.success de react-toastify.
   */
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
