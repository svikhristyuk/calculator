import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Operator = "+" | "-" | "*" | "/";
type Calculation = { calculation: string; date: string };

const url = "//localhost:3001/calculations";

function fetchCalculations() {
  return axios.get<Calculation[]>(url).then(({ data }) => data);
}

function saveCalculation(calculation: Calculation) {
  return axios.post(url, calculation);
}

function isNumberLike(value: string) {
  return Number.isFinite(parseFloat(value));
}

function isOperator(value: string) {
  return value === "+" || value === "-" || value === "*" || value === "/";
}

function useCalculator() {
  const [calculations, setCalculations] = useState<Calculation[]>([]);

  useEffect(() => {
    fetchCalculations().then(setCalculations);
  }, []);

  const initialDisplay = ["0"];
  const [display, setDisplay] = useState(initialDisplay);
  const displayLastItem = display[display.length - 1];
  const clearDisplay = () => {
    setDisplay(initialDisplay);
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
      setDisplay([result.toString()]);

      const calculation = {
        calculation: display.join(""),
        date: new Date().toISOString(),
      };
      saveCalculation(calculation);
      setCalculations([...calculations, calculation]);
    } catch {
      alert("Error");
    }
  };

  return {
    calculations,
    display,
    setDisplay,
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
    calculations,
    display,
    setDisplay,
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
    <div className="App">
      <div className="Calculator">
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

      <div className="Calculations">
        {calculations.map(({ calculation, date }) => (
          <div className="Calculations-item" key={date}>
            <button
              className="Calculations-calculation"
              onClick={() => setDisplay([calculation])}
            >
              {calculation}
            </button>

            <span className="Calculations-date">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
