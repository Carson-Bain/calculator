let num1;
let num2;
let operator;


function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    if (operator == '/') {
        return divide(num1, num2);
    } else if (operator == '*') {
        return multiply(num1, num2);
    } else if (operator == '-') {
        return substract(num1, num2);
    } else if (operator == '+') {
        return add(num1, num2);
    } else {
        return 'Invalid Entry';
    }
}


console.log(operate('+', 10, 5));