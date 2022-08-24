"use strict";
let firstOperand = "";
let secondOPerand = "";
let curOperator = "";

// DOM Elements
const numBtnID = document.getElementById("grid").querySelectorAll("button");
const operatorBtnID = document.getElementById("operators").querySelectorAll("button");
const eraseBtnID = document.getElementById("erase");
const clearBtnID = document.getElementById("clear-entry");
const inputID = document.getElementById("input");
const fullInputID = document.getElementById("full-input");
const warningID = document.getElementById("warning");
const calcContainer = document.querySelector(".calculator-container");

// all functions

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
    const newText = inputID.textContent.slice(0,inputID.textContent.length-1);  // output specified char
    inputID.textContent = newText;
    console.log(newText);
}

function showErrorMessage(message) {
    warningID.textContent = message;
    calcContainer.classList.add("error-shake");
    const timeOut = setTimeout(() => {
        calcContainer.classList.remove("error-shake");
        warningID.textContent = "";
    }, 1000);
}



// EventListeners attached to buttons

numBtnID.forEach(btn => {
    btn.addEventListener("click", () => {
        warningID.textContent = "";
        inputID.textContent += btn.textContent;
    })
});
operatorBtnID.forEach(opBtn => {
    opBtn.addEventListener("click", () => {
        if (inputID.textContent === "") {
            showErrorMessage("Please enter numbers to calculate!");
            return;
        }

        if (firstOperand!=="" && inputID.textContent!=="") {
            secondOPerand = inputID.textContent;
            const answer = operate(curOperator, Number(firstOperand), Number(secondOPerand)); 
            curOperator = opBtn.textContent;
            fullInputID.textContent = answer + " " + curOperator;
            firstOperand = answer;  // prepares for the 2nd operand
            console.log(opBtn.textContent);
            
        } else {
            firstOperand = inputID.textContent;
            curOperator = opBtn.textContent;
            fullInputID.textContent = firstOperand + " " + curOperator;
        }
        inputID.textContent = "";


        if ((opBtn.textContent==="=") && (firstOperand!=="") && (secondOPerand!=="")) {
            const answer = operate(curOperator, Number(firstOperand), Number(secondOPerand));
            inputID.textContent = answer;
        }
    });
});
eraseBtnID.addEventListener("click",() => clearInput());
clearBtnID.addEventListener("click", () => {
    firstOperand = "";
    curOperator = "";
    secondOPerand = "";
    inputID.textContent = "";
    fullInputID.textContent = "";
});