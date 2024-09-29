let firstNumber = 0;
let chosenOperator = '';
let secondNumber = 0;

function multiply(firstNumber, secondNumber){
  return +firstNumber * +secondNumber;
}
function divide(firstNumber, secondNumber){
  return +firstNumber / +secondNumber;
}
function add(firstNumber, secondNumber){
  return +firstNumber + +secondNumber;
}
function subtract(firstNumber, secondNumber){
  return +firstNumber - +secondNumber;
}
function squareRoot(secondNumber){
  return Math.sqrt(secondNumber);
}

function operate(firstNumber, operator, secondNumber) {
      if(operator === "+"){
        return add(firstNumber, secondNumber);
      } else if (operator ==="-") {
        return subtract(firstNumber, secondNumber);
      } else if (operator ==="/") {
        if (secondNumber === 0 || firstNumber === 0) {
          return 'ERROR';
        }else {
        return divide(firstNumber, secondNumber);
        }
      } else if (operator ==="*") {
        return multiply(firstNumber, secondNumber);
      } else if (operator === "√") {
        firstNumber = null
        return squareRoot(secondNumber)
      }
}


let display = [];
let value = 0;
let gotFirst = false;
let gotSecond = false;

const screen = document.querySelector('#screen');
const subScreen = document.querySelector('#sub-screen')
const buttons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const percentage = document.querySelector('#percentage')
const decimal = document.querySelector('#decimal')
const del = document.querySelector('#delete')
const sqRoot = document.querySelector('#sqroot')

//reset values
function ac() {
  value = 0;
  display = [];
  calculation = []
  firstNumber = 0;
  secondNumber = 0;
  chosenOperator = '';
  gotFirst = false;
  decimal.disabled = false;
}

// on b
buttons.forEach(button => {
button.addEventListener("click", () => {
  display.push(button.value);
  value = screen.textContent = display.join('');
  if (chosenOperator === '') {
    subScreen.textContent = display.join('')
  }else if (chosenOperator === '√') {
    subScreen.textContent = chosenOperator + ' ' + display.join('')
  }else{
    subScreen.textContent = firstNumber + ' ' + chosenOperator + ' ' + display.join('')
  }

  })
})

operators.forEach(operator => {
  operator.addEventListener("click", () => {
    if (!gotFirst ) {
      firstNumber = +value;
      chosenOperator = operator.textContent;
      if (chosenOperator === '√') {
        screen.textContent = chosenOperator;
        
      }else {
      screen.textContent = `${firstNumber} ${chosenOperator}`;
      }
      value = 0;
      display = [];
    } else {
      secondNumber = value;
      let answer = operate(firstNumber, chosenOperator, secondNumber);
      firstNumber = answer;
      chosenOperator = operator.textContent;
      if (chosenOperator === '√') {
        screen.textContent = chosenOperator;
      }else {
      screen.textContent = `${firstNumber} ${chosenOperator}`;
      }
      value = 0;
      display = [];
      secondNumber = 0;
    }
    gotFirst = true
    decimal.disabled = false;
    subScreen.textContent = firstNumber + ' ' + chosenOperator
  })
})

equals.addEventListener("click", () => {
  secondNumber = value;
  let answer = operate(firstNumber, chosenOperator, secondNumber);
  if (answer === 'ERROR') {
    ac()
    screen.textContent = 'ERROR'
  }
  if (chosenOperator === '√') {
    subScreen.textContent = chosenOperator + ' ' + display.join('') + ' ' + '=';
  }else {
    subScreen.textContent = firstNumber + ' ' + chosenOperator + ' ' + display.join('') + ' ' + '=';
  }
  if (Number.isInteger(answer)) {
    display = answer
  } else {
    display = answer.toFixed(9);
  }
  screen.textContent = display;
  value = answer;
  display = [];
  secondNumber = 0
  chosenOperator = ''
  gotFirst = false;
  decimal.disabled = false;
})

clear.addEventListener("click", () => {
  ac()
  screen.textContent = null;
  subScreen.textContent = null;

})

percentage.addEventListener("click", () => {
  if (gotFirst === false){
  firstNumber = +value
  let percentage = firstNumber / 100
  firstNumber = +percentage
  value = firstNumber
  screen.textContent = firstNumber
  } else {
  let percentage = +firstNumber / 100
  firstNumber = +percentage
  value = firstNumber
  screen.textContent = firstNumber
  }  
  gotFirst = false;
  
})

decimal.addEventListener("click", () => {
  display.push('.')
  value = screen.textContent = display.join('');
  decimal.disabled = true;
})

del.addEventListener("click", () => {
  display.splice(-1, 1)
  value = screen.textContent = display.join('')
})

sqRoot.addEventListener("click", () => {
  firstNumber = null;
  subScreen.textContent = '√'
})