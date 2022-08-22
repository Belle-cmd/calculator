"use strict";

// DOM Elements
const btnContainerID = document.getElementById("grid");
const periodBtnID = document.getElementById("ref-to-period");


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
 * @param {*} operator math operation
 * @param {*} number1 number specified by the user
 * @param {*} number2 number specified by the user
 */
function operate(operator, number1, number2) {
    if (operator === "add") {
        add(number1, number2);
    } else if (operator === "subtract") {
        subtract(number1, number2);
    } else if (operator === "multiply") {
        muliply(number1, number2);
    } else if (operator === "divide") {
        divide(number1, number2);
    }
}


function populateBtnNumbers() {
    for (let i = 9; i > -1; i--) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.add("number");
        btnContainerID.insertBefore(btn, periodBtnID);  // creates the numbers before the period button
    }
}


// events
window.onload = (event) => {
    populateBtnNumbers();
}