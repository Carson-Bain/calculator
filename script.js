class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear();
    }
    // FUNCTIONS
clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
}

deleteNum() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
}

appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString();
}

chooseOperation(operation) {
    if(this.currentOperand === '') return
    if(this.previousOperand !== '') {
        this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
}

compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+': 
            computation = prev + current;
            break;
        case '-': 
            computation = prev - current;
            break;
        case '*': 
            computation = prev * current;
            break;
        case '/': 
            computation = prev / current;
            break;
        default: 
            return
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
}

getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if(isNaN(integerDigits)) {
        integerDisplay = ''
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0
        })
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else{
        return integerDisplay
    }
}

updateDisplay() {
    this.currentOperandText.innerHTML = 
    this.getDisplayNumber(this.currentOperand);
    if(this.operation != null) {
        this.previousOperandText.innerHTML = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
        this.previousOperandText.innerHTML = ''
    }
    }
}

// DOM Variables
const operator = document.querySelectorAll('.operate');
const numButton = document.querySelectorAll('.button');

const equalBtn = document.querySelector('#equals');
const deleteBtn = document.querySelector('#delete');
const clearBtn = document.querySelector('#clear');

const previousOperandText = document.querySelector('.previous-operand');
const currentOperandText = document.querySelector('.current-operand');

const calculator = new Calculator(previousOperandText, currentOperandText)

numButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    })
})

operator.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerHTML);
        calculator.updateDisplay();
    })
})

equalBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', () => {
    calculator.deleteNum();
    calculator.updateDisplay();
})
