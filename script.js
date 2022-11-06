let equation = '';
let brackets = 0;

const setEquation = (newEquation) => {
    equation = newEquation;
    outputElem.innerHTML = equation;
};

const operationButtons = document.querySelectorAll('.operation');
const numberButtons = document.querySelectorAll('.number');
const buttons = document.querySelectorAll('.calc-btn');
const outputElem = document.querySelector('.output-text');
const equalBtn = document.querySelector('#equals');
const popup = document.querySelector('.error');
const leftBracket = document.querySelector('#leftBracket');
const rightBracket = document.querySelector('#rightBracket');
const clearBtn = document.querySelector('#clear');

clearBtn.addEventListener('click', () => {
    setEquation('');
    brackets = 0;
});

leftBracket.addEventListener('click', () => {
    if (equation.endsWith(' ') || equation === '') {
        setEquation(`${equation}${'('}`);
        brackets ++;
    }
});

rightBracket.addEventListener('click', () => {
    if (!equation.endsWith(' ') || equation !== '') {
        setEquation(`${equation}${')'}`);
        brackets --;
    }
});

for (const btn of operationButtons) {
    btn.addEventListener('click', () => {
        if (equation[equation.length - 1] === ' ' || equation === '') {
            error('Won\'t work!');
            return;
        }

        setEquation(`${equation} &${btn.id}; `);
    });
}

equalBtn.addEventListener('click', () => {
    if (brackets != 0) {
        error('fix brackets');
        return;
    }

    if (equation[equation.length - 1] === ' ' || equation === '') {
        error('please end the equation');
        return;
    }

    let inner = equation;

    inner = inner.replace(/&times;/g, '*');
    inner = inner.replace(/&plus;/g, '+');
    inner = inner.replace(/&minus;/g, '-');
    inner = inner.replace(/&divide;/g, '/');

    try {
        setEquation(`${equation} = ${eval(inner)}`);
    } catch (e) {
        if (e instanceof SyntaxError) {
            error('fix syntax');
        }
    }
});

function error(text) {
    popup.innerHTML = `${text[0].toUpperCase()}${text.slice(1)}`;
    popup.classList.add('popup');
    
    setTimeout(() => {
        popup.innerHTML = '';
        popup.classList.remove('popup');
    }, 3000);
}

for (const btn of numberButtons) {
    btn.addEventListener('click', () => {
        setEquation(`${equation}${btn.id}`);
    });
}

