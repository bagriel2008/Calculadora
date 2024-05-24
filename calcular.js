document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('resultado');
    let currentInput = '';
    let firstOperand = null;
    let operator = null;

    const updateDisplay = () => {
        display.textContent = currentInput || '0';
    };

    const handleNumber = (number) => {
        if (currentInput === '0' && number === '0') return;
        if (currentInput === '' && number === '.') {
            currentInput = '0.';
        } else {
            currentInput += number;
        }
        updateDisplay();
    };

    const handleOperator = (nextOperator) => {
        if (currentInput === '' && nextOperator !== '=') return;
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else if (operator) {
            const result = calculate(firstOperand, parseFloat(currentInput), operator);
            currentInput = `${result}`;
            firstOperand = result;
        }
        operator = nextOperator;
        if (operator !== '=') {
            currentInput = '';
        }
        updateDisplay();
    };

    const calculate = (first, second, op) => {
        switch (op) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case 'x':
                return first * second;
            case '÷':
                return first / second;
            default:
                return second;
        }
    };

    const handleClear = () => {
        currentInput = '';
        firstOperand = null;
        operator = null;
        updateDisplay();
    };

    document.querySelectorAll('.botoes.numero').forEach(button => {
        button.addEventListener('click', () => handleNumber(button.textContent.trim()));
    });

    document.querySelectorAll('.botoes.funcao, .botoes.funcao2').forEach(button => {
        button.addEventListener('click', () => handleOperator(button.textContent.trim()));
    });

    document.querySelector('.botoes.funcao').addEventListener('click', handleClear); // Clear button
});
