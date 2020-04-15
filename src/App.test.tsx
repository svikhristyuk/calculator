import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

function renderApp() {
  const { getByLabelText, getByText } = render(<App />);
  const display = getByLabelText("display");

  return { display, getByText };
}

describe("Calculator", () => {
  describe("User input", () => {
    it("render user input", () => {
      const { display, getByText } = renderApp();

      getByText("1").click();
      getByText("2").click();
      getByText("+").click();
      getByText("3").click();
      getByText("4").click();
      getByText("-").click();
      getByText("5").click();
      getByText("6").click();
      getByText("*").click();
      getByText("7").click();
      getByText("8").click();
      getByText("/").click();
      getByText("9").click();

      expect(display).toHaveValue("12+34-56*78/9");
    });

    it('omit leading "0"', () => {
      const { display, getByText } = renderApp();

      getByText("0").click();
      getByText("5").click();

      expect(display).toHaveValue("5");
    });

    it("omit double point", () => {
      const { display, getByText } = renderApp();

      getByText(".").click();
      getByText(".").click();
      getByText("1").click();
      getByText(".").click();

      expect(display).toHaveValue("0.1");
    });
  });

  describe("Calculation", () => {
    it("addition", () => {
      const { display, getByText } = renderApp();

      getByText("5").click();
      getByText("+").click();
      getByText("5").click();
      getByText("=").click();

      expect(display).toHaveValue("10");
    });

    it("subtraction", () => {
      const { display, getByText } = renderApp();

      getByText("5").click();
      getByText("-").click();
      getByText("5").click();
      getByText("=").click();

      expect(display).toHaveValue("0");
    });

    it("multiplication", () => {
      const { display, getByText } = renderApp();

      getByText("5").click();
      getByText("*").click();
      getByText("5").click();
      getByText("=").click();

      expect(display).toHaveValue("25");
    });

    it("division", () => {
      const { display, getByText } = renderApp();

      getByText("5").click();
      getByText("/").click();
      getByText("5").click();
      getByText("=").click();

      expect(display).toHaveValue("1");
    });

    it("complex", () => {
      const { display, getByText } = renderApp();

      getByText("9").click();
      getByText("+").click();
      getByText("8").click();
      getByText("-").click();
      getByText("5").click();
      getByText("*").click();
      getByText("4").click();
      getByText("/").click();
      getByText("2").click();
      getByText("=").click();

      expect(display).toHaveValue("7");
    });
  });
});
