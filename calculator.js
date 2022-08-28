"use strict";
let operand1 = "";  // always storing string
let operand2 = "";
let curOperator = "";


const numBtnID = document.getElementById("grid").querySelectorAll("button");
const operatorBtnID = document.getElementById("operators").querySelectorAll("button");
const eraseBtnID = document.getElementById("erase");
const clearBtnID = document.getElementById("clear-entry");
const inputID = document.getElementById("input");  // show answer or 1st operand inpupt
const fullInputID = document.getElementById("full-input");  // show 1st operand, operator, 2nd operand input
const warningID = document.getElementById("warning");
const calcContainer = document.querySelector(".calculator-container");



function add(addend1, addend2) {
	return addend1 + addend2;
};

function subtract(minuend, subtrahend) {
	return minuend - subtrahend;
};

function muliply(multiplicand, multiplier) {
    return multiplicand *  multiplier;
}

function divide(dividend, divisor) {
    return dividend / divisor;
}

/**
 * Function takes an operator and numbers, and calls a function that matches the specified operator
 * @param {*} operator math operation to do
 * @param {*} number1 number specified by the user
 * @param {*} number2 number specified by the user
 * @returns the answer to the calculation
 */
function operate(operator, number1, number2) {
    let answer = 0;
    if (operator === "+") {
        answer = add(number1, number2);
    } else if (operator === "-") {
        answer = subtract(number1, number2);
    } else if (operator === "*") {
        answer = muliply(number1, number2);
    } else if (operator === "/") {
        answer = divide(number1, number2);
    }
    return answer;
}

/**
 * Erases the user's input, 1 character at a time.
 * @returns None; used to end the function
 */
function clearInput() {
  if (fullInputID.textContent!=="" && inputID.textContent==="") {
    const original = fullInputID.textContent.split(/[\d]/);
    const inputs = fullInputID.textContent.split(/[+\-\*\/]/);
    if (inputs[1]==="") {
        return; // no more 2nd operand left to erase
    }
    const new2ndInput = inputs[1].slice(0,inputs[1].length-1);

    // rebuilt the new equation
    fullInputID.textContent = inputs[0] + original[(original.length - new2ndInput.length)-2] + new2ndInput;
  }
  const newText = inputID.textContent.slice(0,inputID.textContent.length-1);  // remove last char
  inputID.textContent = newText;
}

/**
 * Show error message to the user and remove it after 3 seconds
 * @param {*} message String error message
 */
function showErrorMessage(message) {
    warningID.textContent = message;
    const timeOut = setTimeout(() => {
        warningID.textContent = "";
    }, 3000);
}

/**
 * Perform calculations based on the state of the inputID and fullInputID and the chosen operator
 * @param {*} data the value of e.key (user's input from keyboard) or the value of opBtn.textContent 
 *                  (user's input by clicking the operator buttons)
 * @returns None; used to end the function
 */
function operatorEvents(data) {
    if (inputID.textContent!="" && data==="=") {
        showErrorMessage("Enter 2 operands and an operation before choosing =");
        return;
    }
     if ((inputID.textContent !== "") &&(operand1 === "") && (operand2 === "") && (curOperator=== "")) {
        // retrieving 1st operand, no 2nd operand, no operator
        operand1 = inputID.textContent;
        curOperator = data;
        fullInputID.textContent = operand1 + curOperator;
        inputID.textContent = "";
        return;
    } else if ((fullInputID.textContent!=="") && (inputID.textContent==="") && (data!=="=")) {
        // retrieving 2nd operand and user is inputting another operator (+, -, *, /)

        // since 2 pair of numbers are only getting calculated, last item is always the 2nd operand
        operand2 = fullInputID.textContent.split(/[+\-\*\/]/)[1];
        const result = operate(curOperator, Number(operand1), Number(operand2));
        curOperator = data;  // the other operator, separate from 2nd operand's operator
        fullInputID.textContent = result + curOperator;

        // stored as string so that calculation steps (see if-statements) can be told apart
        operand1 = "" + result;
        operand2 = "";
        return;
    } else if ((fullInputID.textContent!=="") && (inputID.textContent==="") && (data==="=")) {
        // retrieving 2nd operand and the user chooses "=", instead of other operators
        operand2 = fullInputID.textContent.split(/[+\-\*\/]/)[1];
        const result = operate(curOperator, Number(operand1), Number(operand2));
        curOperator = data;
        inputID.textContent = result;
        operand1 = "";
        operand2 = "";
        curOperator = "";
        return;
    }
    showErrorMessage("Enter a number before choosing an operation");
}

/**
 * Detect user's number input and checks for the amount of periods used
 * @param {*} data the value of e.key (user's input from keyboard) or the value of opBtn.textContent 
 *                  (user's input by clicking the operator buttons)
 * @returns None; used to end the function
 */
function inputNumbers(data) {
    const periodInput = inputID.textContent.includes(".");
    const periodFull = fullInputID.textContent.includes(".");
    if (periodFull && data===".") return;
    if (periodInput && data===".") return;

    // when calculation and answer are shown on screen, only allow the answer to be altered
    if (fullInputID.textContent!=="" && inputID.textContent !=="") {
        inputID.textContent += data;
        return;
    }
    if (fullInputID.textContent!== "") {
        // an operand and an operator is waiting for its 2nd input
        fullInputID.textContent+= data;
        return;
    }
    inputID.textContent += data;
}



// EventListeners attached to buttons
document.addEventListener("keydown", e => {
    if (e.key >= 0 || e.key <= 9) inputNumbers(e.key);
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/" || e.key === "=") operatorEvents(e.key);
    if (e.key === "Backspace") clearInput();
    if (e.key === "Enter") operatorEvents("=");
    
});
numBtnID.forEach(btn => {
    btn.addEventListener("click", () => {
        inputNumbers(btn.textContent);
    })
});
operatorBtnID.forEach(opBtn => {
    opBtn.addEventListener("click", () => {
        operatorEvents(opBtn.textContent);
    });
});
eraseBtnID.addEventListener("click",() => clearInput());
clearBtnID.addEventListener("click", () => {
    operand1 = "";
    curOperator = "";
    operand2 = "";
    inputID.textContent = "";
    fullInputID.textContent = "";
});