"use strict";
let displayValue = {};

// DOM Elements
const numBtnID = document.getElementById("grid").querySelectorAll("button");
const operatorBtnID = document.getElementById("grid").querySelectorAll("button");
const inputID = document.getElementById("input");

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

function showInput(input) {
    inputID.textContent += input;
}

numBtnID.forEach(btn => {
    btn.addEventListener("click", () => {
        showInput(btn.textContent);
    })
});
operatorBtnID.forEach(opBtn => {
    
});