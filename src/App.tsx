import React, { useState } from "react";
import "./App.css";

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Operator = "+" | "-" | "*" | "/";

function isNumberLike(value: string) {
  return Number.isFinite(parseFloat(value));
}

function isOperator(value: string) {
  return value === "+" || value === "-" || value === "*" || value === "/";
}

function useCalculator() {
  const initialDisplay = ["0"];
  const [display, setDisplay] = useState(initialDisplay);
  const initialCalculation = "";
  const [calculation, setCalculation] = useState(initialCalculation);
  const displayLastItem = display[display.length - 1];
  const clearDisplay = () => {
    setDisplay(initialDisplay);
    setCalculation(initialCalculation);
  };
  const calculateDisplay = (): number => {
    const sanitizedCalculation = display.join("").replace(/[^-()\d/*+.]/g, "");

    /* eslint-disable no-eval */
    return eval(sanitizedCalculation);
  };
  const addDigitToDisplay = (digit: Digit) => () => {
    if (
      !displayLastItem.includes(".") &&
      Number(displayLastItem) === 0 &&
      digit === 0
    ) {
      return;
    }

    if (!displayLastItem.includes(".") && Number(displayLastItem) === 0) {
      setDisplay([...display.slice(0, -1), digit.toString()]);
      return;
    }

    if (isNumberLike(displayLastItem)) {
      setDisplay([...display.slice(0, -1), `${displayLastItem}${digit}`]);
    } else {
      setDisplay([...display, digit.toString()]);
    }
  };
  const addPointToDisplay = () => {
    if (!isNumberLike(displayLastItem) || displayLastItem.includes(".")) {
      return;
    }

    setDisplay([...display.slice(0, -1), `${displayLastItem}.`]);
  };
  const addOperatorToDisplay = (operator: Operator) => () => {
    if (isNumberLike(displayLastItem)) {
      setDisplay([...display, operator]);
    } else {
      setDisplay([...display.slice(0, -1), operator]);
    }
  };
  const addOpeningParenToDisplay = () => {
    if (isOperator(displayLastItem)) {
      setDisplay([...display, "("]);
    }
  };
  const addClosingingParenToDisplay = () => {
    if (isNumberLike(displayLastItem)) {
      setDisplay([...display, ")"]);
    }
  };
  const changeDisplayLastItemSign = () => {
    if (isNumberLike(displayLastItem)) {
      setDisplay([...display.slice(0, -1), (-displayLastItem).toString()]);
    }
  };
  const showDisplayCalculation = () => {
    try {
      const result = calculateDisplay();

      setCalculation(display.join(""));
      setDisplay([result.toString()]);
    } catch {
      setCalculation("Error");
    }
  };

  return {
    display,
    calculation,
    clearDisplay,
    addDigitToDisplay,
    addPointToDisplay,
    addOperatorToDisplay,
    addOpeningParenToDisplay,
    addClosingingParenToDisplay,
    changeDisplayLastItemSign,
    showDisplayCalculation,
  };
}

function App() {
  const {
    display,
    calculation,
    clearDisplay,
    addDigitToDisplay,
    addPointToDisplay,
    addOperatorToDisplay,
    addOpeningParenToDisplay,
    addClosingingParenToDisplay,
    changeDisplayLastItemSign,
    showDisplayCalculation,
  } = useCalculator();

  return (
    <div className="Calculator">
      <input
        className="Calculator-calculation"
        aria-label="calculation"
        readOnly={true}
        value={calculation}
      />
      <input
        className="Calculator-display"
        aria-label="display"
        readOnly={true}
        value={display.join("")}
      />

      <div className="Calculator-pad Calculator-digits">
        <button onClick={clearDisplay}>C</button>
        <button onClick={addOpeningParenToDisplay}>(</button>
        <button onClick={addClosingingParenToDisplay}>)</button>
        <button onClick={addDigitToDisplay(7)}>7</button>
        <button onClick={addDigitToDisplay(8)}>8</button>
        <button onClick={addDigitToDisplay(9)}>9</button>
        <button onClick={addDigitToDisplay(4)}>4</button>
        <button onClick={addDigitToDisplay(5)}>5</button>
        <button onClick={addDigitToDisplay(6)}>6</button>
        <button onClick={addDigitToDisplay(1)}>1</button>
        <button onClick={addDigitToDisplay(2)}>2</button>
        <button onClick={addDigitToDisplay(3)}>3</button>
        <button onClick={changeDisplayLastItemSign}>+/-</button>
        <button onClick={addDigitToDisplay(0)}>0</button>
        <button onClick={addPointToDisplay}>.</button>
      </div>

      <div className="Calculator-pad Calculator-operators">
        <button onClick={addOperatorToDisplay("/")}>/</button>
        <button onClick={addOperatorToDisplay("*")}>*</button>
        <button onClick={addOperatorToDisplay("-")}>-</button>
        <button onClick={addOperatorToDisplay("+")}>+</button>
        <button onClick={showDisplayCalculation}>=</button>
      </div>
    </div>
  );
}

export default App;
