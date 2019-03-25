import './styles.css';

const buttons = document.querySelectorAll(".tipBtn");
buttons.forEach(element => {
    element.addEventListener('click', tipButtonClick);
});

const billInput = document.querySelector('#baseAmount') as HTMLInputElement;
billInput.addEventListener('keyup', baseAmountChanged);

let percentageTip: number;
let billAmount: number;
let tipAmount: number;
let total: number;



function baseAmountChanged() {
    const input = this as HTMLInputElement;
    if (validateInput(input) && percentageTip != undefined) {
        updateTotals(false);
    } else {
        updateTotals(true);
    }
}


function validateInput(input: HTMLInputElement): boolean {
    if (input.valueAsNumber > 0) {
        input.classList.remove('bad-input');
        return true;
    } else {
        input.classList.add('bad-input');
        return false;
    }
}

function tipButtonClick() {
    const clickedBtn = this as HTMLButtonElement;

    buttons.forEach(element => {
        const btn = element as HTMLButtonElement;
        if (clickedBtn.id === btn.id) {
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }
    });

    percentageTip = parseFloat(clickedBtn.value);
    let tipPercentDisplay = document.querySelectorAll('.tipPercent');
    tipPercentDisplay.forEach(element => {
        const display = element as HTMLSpanElement;
        display.innerText = `${percentageTip}%`;
    });

    if (validateInput(billInput)) { updateTotals(false); }

}

function updateTotals(resetToDefault: boolean) {

    if (resetToDefault) {
        billAmount = undefined;
        tipAmount = undefined;
        total = undefined;
    }
    else {
        billAmount = (document.querySelector('#baseAmount') as HTMLInputElement).valueAsNumber;
        tipAmount = (billAmount * percentageTip / 100);
        total = billAmount + tipAmount;
    }

    const billDisplay = document.querySelector('#billAmount') as HTMLSpanElement;
    billDisplay.innerText = `\$${billAmount.toFixed(2)}`;

    const tipAmountDisplay = document.querySelector('#currentTipAmount') as HTMLSpanElement;
    tipAmountDisplay.innerText = `\$${tipAmount.toFixed(2)}`;

    const totalAmountDisplay = document.querySelector('#total') as HTMLSpanElement;
    totalAmountDisplay.innerText = `\$${total.toFixed(2)}`;

}