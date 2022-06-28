import React from "react";
import { copyToClipBoard } from "react-copy-to-clipboard";

function App() {
  const [passwordLength, setPasswordLength] = React.useState(0);
  const [isNumbers, setNumbers] = React.useState(false);
  const [isSmallLetters, setSmallLetters] = React.useState(false);
  const [isBigLetters, setBigLetters] = React.useState(false);
  const [isSpecialLetters, setSpecialLetters] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const passwordCopy = React.useRef(null);

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialSymbols = "!@#$%^&*()";
    let result = "";
    let randomSymbols = "";

    if (isNumbers) {
      randomSymbols += numbers;
    }
    if (isSmallLetters) {
      randomSymbols += chars;
    }
    if (isBigLetters) {
      randomSymbols += upperChars;
    }
    if (isSpecialLetters) {
      randomSymbols += specialSymbols;
    }

    for (let i = 0; i < passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * randomSymbols.length);
      result += randomSymbols[randomNumber];
    }

    setPassword(result);
  };

  const onSumbitForm = (e) => {
    e.preventDefault();

    if (!Number(passwordLength)) {
      alert("Довжина паролю повинна бути більше нуля!");
      return;
    }

    if (!isNumbers && !isSmallLetters && !isBigLetters && !isSpecialLetters) {
      alert("Виберіть один з варіантів паролю!");
      return;
    }

    generatePassword();
  };

  return (
    <main>
      <h1 className="main-title">Генератор паролів</h1>
      <form className="form-password" onSubmit={onSumbitForm}>
        <div className="form-row form-password-length">
          <label>Довжина пароля:</label>
          <input
            type="number"
            min="0"
            max="32"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>
        <div className="form-row form-password-checkboxes">
          <div className="form-password-title">Символи:</div>
          <div className="form-checkbox-wrapp">
            <input
              type="checkbox"
              id="numbers"
              value={isNumbers}
              onChange={(e) => setNumbers(e.target.checked)}
            />
            <label htmlFor="numbers">Цифри</label>
          </div>
          <div className="form-checkbox-wrapp">
            <input
              type="checkbox"
              id="small-letters"
              value={isSmallLetters}
              onChange={(e) => setSmallLetters(e.target.checked)}
            />
            <label htmlFor="small-letters">Маленькі літери</label>
          </div>
          <div className="form-checkbox-wrapp">
            <input
              type="checkbox"
              id="big-letters"
              value={isBigLetters}
              onChange={(e) => setBigLetters(e.target.checked)}
            />
            <label htmlFor="big-letters">Великі літери</label>
          </div>
          <div className="form-checkbox-wrapp">
            <input
              type="checkbox"
              id="special-letters"
              value={isSpecialLetters}
              onChange={(e) => setSpecialLetters(e.target.checked)}
            />
            <label htmlFor="special-letters">Спеціальні символи</label>
          </div>
        </div>
        <div className="button-wrap">
          <button type="submit" className="form-submit">
            Згенерувати пароль
          </button>
        </div>
      </form>
      {password && (
        <div className="password-results">
          <div className="password-result-row">
            <span className="password-result" ref={passwordCopy}>
              {password}
            </span>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
