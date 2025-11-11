const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(a, operator, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Error";
  }
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

const operators = ["+", "-", "*", "/"];
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let resetScreen = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleButton(button);
  });
});

function handleButton(button) {
  const value = button.textContent;

  if (button.classList.contains("clear")) {
    clearDisplay();
    return;
  }

  if (button.classList.contains("equal")) {
    evaluate();
    return;
  }

  if (button.classList.contains("operator")) {
    chooseOperator(value);
    return;
  }

  appendNumber(value);
}

function appendNumber(value) {
  if (resetScreen) {
    display.textContent = "";
    resetScreen = false;
  }
  if (value === "." && display.textContent.includes(".")) return;
  display.textContent += value;
}

function chooseOperator(op) {
  if (display.textContent === "") return;
  if (currentOperator !== null && !resetScreen) evaluate();
  firstNumber = display.textContent;
  currentOperator = op;
  resetScreen = true;
}

function evaluate() {
  if (currentOperator === null || resetScreen) return;
  secondNumber = display.textContent;
  const result = operate(+firstNumber, currentOperator, +secondNumber);
  firstNumber = result;
  display.textContent = Math.round(result * 1000) / 1000;
  currentOperator = null;
  resetScreen = true;
}

function clearDisplay() {
  display.textContent = "";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  resetScreen = false;
}
