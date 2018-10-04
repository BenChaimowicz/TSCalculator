"use strict";
// Get Objects
let mainScreen = document.getElementById('screen');
let subScreen = document.getElementById('subScreen');
let clrBtn = document.getElementById('clearBtn');
let xBtn = document.getElementById('multiBtn');
let divBtn = document.getElementById('divBtn');
let DelBtn = document.getElementById('eraseBtn');
let plusBtn = document.getElementById('plusBtn');
let minusBtn = document.getElementById('minusBtn');
let equalBtn = document.getElementById('equalBtn');
let closeBtn = document.getElementById('closeBtn');
// classes
class Calculator {
    constructor() {
        this.entry = [];
        this.roundEnd = false;
    }
    clearCalc() {
        this.entry = [];
        subScreen.textContent = '';
        mainScreen.value = '';
        dblSolve = false;
        creditsCounter++;
        if (creditsCounter >= 5) {
            mainScreen.value = 'Created By Ben Chaimowicz';
            creditsCounter = 0;
        }
    }
    entryPush(num, op) {
        this.entry.push(parseFloat(num));
        subScreen.textContent += mainScreen.value + op;
        mainScreen.value = '';
        dblSolve = false;
    }
    numPress(num) {
        mainScreen.value += num;
    }
    add() {
        this.endRound();
        if (parseFloat(mainScreen.value)) {
            this.entryPush(mainScreen.value, '+');
        }
    }
    subtract() {
        this.endRound();
        if (parseFloat(mainScreen.value))
            this.entryPush(mainScreen.value, '-');
    }
    multiply() {
        this.endRound();
        if (parseFloat(mainScreen.value))
            this.entryPush(mainScreen.value, '*');
    }
    divide() {
        this.endRound();
        if (parseFloat(mainScreen.value))
            this.entryPush(mainScreen.value, '/');
    }
    deleteLast() {
        let disp = mainScreen.value;
        if (disp.length > 0) {
            mainScreen.value = disp.slice(0, -1);
        }
    }
    result() {
        if (dblSolve != true) {
            let equation = subScreen.innerText;
            if (parseFloat(mainScreen.value)) {
                let num = parseFloat(mainScreen.value);
                subScreen.innerText += num.toString();
                mainScreen.value = eval(equation + mainScreen.value);
            }
            else {
                mainScreen.value = eval(equation + 0);
                let num = parseFloat(mainScreen.value);
            }
            dblSolve = true;
            this.roundEnd = true;
        }
    }
    startClick() {
        timerBool = true;
        timer = setTimeout(this.downScript, clickDelay);
    }
    openPar() {
        mainScreen.value += '(';
    }
    closePar() {
        mainScreen.value += ')';
    }
    downScript() {
        if (timer) {
            clearTimeout(timer);
        }
        if (timerBool == true) {
            closeBool = true;
        }
    }
    upScript() {
        if (closeBool == true) {
            clearTimeout(timer);
            timerBool = false;
            this.closePar();
            closeBool = false;
        }
        else {
            clearTimeout(timer);
            this.openPar();
            timerBool = false;
        }
    }
    endRound() {
        if (this.roundEnd == true) {
            this.roundEnd = false;
            subScreen.textContent = '';
            this.entry = [];
        }
    }
}
// Init
let calculator = new Calculator();
let dblSolve = false;
let creditsCounter = 0;
let timer;
let timerBool = false;
let clickDelay = 350;
let closeBool = false;
// functions
