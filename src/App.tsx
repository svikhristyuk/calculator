import React from "react";
import "./App.css";

function App() {
  return (
    <div className="Calculator">
      <div className="Calculator-display">999</div>

      <div className="Calculator-pad Calculator-numbers">
        <button>C</button>
        <button>(</button>
        <button>)</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>-/+</button>
        <button>0</button>
        <button>.</button>
      </div>

      <div className="Calculator-pad Calculator-actions">
        <button>÷</button>
        <button>×</button>
        <button>-</button>
        <button>+</button>
        <button>=</button>
      </div>
    </div>
  );
}

export default App;
