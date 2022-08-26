"use strict";
let operand1 = "";  // always storing string
let operand2 = "";
let curOperator = "";


const numBtnID = document.getElementById("grid").querySelectorAll("button");
const operatorBtnID = document.getElementById("operators").querySelectorAll("button");
const eraseBtnID = document.getElementById("erase");
const clearBtnID = document.getElementById("clear-entry");
const inputID = document.getElementById("input");
const fullInputID = document.getElementById("full-input");
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


function clearInput() {
  if (fullInputID.textContent!=="") {
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
  console.log(newText);
}

function showErrorMessage(message) {
    warningID.textContent = message;
    const timeOut = setTimeout(() => {
        warningID.textContent = "";
    }, 1000);
}



// EventListeners attached to buttons

numBtnID.forEach(btn => {
    btn.addEventListener("click", () => {
    if (fullInputID.textContent!== "") {
            // an operand and an operator is waiting for its 2nd input
            fullInputID.textContent+= btn.textContent;
            return;
        }
        inputID.textContent += btn.textContent;
    })
});
operatorBtnID.forEach(opBtn => {
    opBtn.addEventListener("click", () => {
         if ((inputID.textContent !== "") &&(operand1 === "") && (operand2 === "") && (curOperator=== "")) {
            // retrieving 1st operand, no 2nd operand, no operator
            operand1 = inputID.textContent;
            curOperator = opBtn.textContent;
            fullInputID.textContent = operand1 + curOperator;
            inputID.textContent = "";
        } else if ((fullInputID.textContent!=="") && (inputID.textContent==="") && (opBtn.textContent!=="=")) {
            // retrieving 2nd operand and user is inputting another operator (+, -, *, /)

            // since 2 pair of numbers are only getting calculated, last item is always the 2nd operand
            operand2 = fullInputID.textContent.split(/[+\-\*\/]/)[1];
            const result = operate(curOperator, Number(operand1), Number(operand2));
            curOperator = opBtn.textContent;  // the other operator, separate from 2nd operand's operator
            fullInputID.textContent = result + curOperator;

            // stored as string so that calculation steps (see if-statements) can be told apart
            operand1 = "" + result;
            operand2 = "";
            
        } else if ((fullInputID.textContent!=="") && (inputID.textContent==="") && (opBtn.textContent==="=")) {
            // retrieving 2nd operand and the user chooses "=", instead of other operators
            operand2 = fullInputID.textContent.split(/[+\-\*\/]/)[1];
            const result = operate(curOperator, Number(operand1), Number(operand2));
            curOperator = opBtn.textContent;
            inputID.textContent = result;
            operand1 = "";
            operand2 = "";
            curOperator = "";
        }
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