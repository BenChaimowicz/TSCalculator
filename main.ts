// Get Objects
let mainScreen: HTMLInputElement = document.getElementById('screen') as HTMLInputElement;
let subScreen: HTMLDivElement = document.getElementById('subScreen') as HTMLDivElement;

let clrBtn: HTMLButtonElement = document.getElementById('clearBtn') as HTMLButtonElement;
let xBtn: HTMLButtonElement = document.getElementById('multiBtn') as HTMLButtonElement;
let divBtn: HTMLButtonElement = document.getElementById('divBtn') as HTMLButtonElement;
let DelBtn: HTMLButtonElement = document.getElementById('eraseBtn') as HTMLButtonElement;
let plusBtn: HTMLButtonElement = document.getElementById('plusBtn') as HTMLButtonElement;
let minusBtn: HTMLButtonElement = document.getElementById('minusBtn') as HTMLButtonElement;
let equalBtn: HTMLButtonElement = document.getElementById('equalBtn') as HTMLButtonElement;
let closeBtn: HTMLButtonElement = document.getElementById('closeBtn') as HTMLButtonElement;

// classes

class Calculator {

    private entry: number[] = [];
    private roundEnd: boolean = false;

    constructor() {

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
    entryPush(num: string, op: string) {
        this.entry.push(parseFloat(num));
        subScreen.textContent += mainScreen.value + op;
        mainScreen.value = '';
        dblSolve = false;
    }

    numPress(num: string) {
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
        let disp: string = mainScreen.value;
        if (disp.length > 0) {
            mainScreen.value = disp.slice(0, -1);
        }
    }

    result() {
        if (dblSolve != true) {
            let equation: string = subScreen.innerText;
            if (parseFloat(mainScreen.value)) {
                let num: number = parseFloat(mainScreen.value);
                subScreen.innerText += num.toString();
                mainScreen.value = eval(equation + mainScreen.value);
            }else{
                mainScreen.value = eval(equation+0);
                let num: number = parseFloat(mainScreen.value);
            }
            dblSolve = true;
            this.roundEnd = true;
        }
    }

    startClick() {
        timerBool = true;
        timer = setTimeout(this.downScript,clickDelay)

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
        } else {
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

let calculator: Calculator = new Calculator();
let dblSolve: boolean = false;
let creditsCounter: number = 0;

let timer: number;
let timerBool: boolean = false;
let clickDelay: number = 350;
let closeBool: boolean = false;

// functions