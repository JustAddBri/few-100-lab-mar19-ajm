import './styles.css';

const buttons = document.querySelectorAll(".tipBtn");
buttons.forEach(element => {
    element.addEventListener('click', tipButtonClick);
});

const billInput = document.querySelector('#baseAmount') as HTMLInputElement;
billInput.addEventListener('keyup', baseAmountChanged);

let percentageTip: number;
let billAmount: number = 0.00;
let tipAmount: number = 10.00;
let total: number = 0.00;



function baseAmountChanged() {
    const input = this as HTMLInputElement;
    if (input.checkValidity) {
        updateTotals();
    } else {
        input.classList.add('.bad-input');
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
    updateTotals();

}

function updateTotals() {
    let tipPercentDisplay = document.querySelectorAll('.tipPercent');
    tipPercentDisplay.forEach(element => {
        const display = element as HTMLSpanElement;
        display.innerText = `${percentageTip}%`;
    });

    //get base amount
    billAmount = (document.querySelector('#baseAmount') as HTMLInputElement).valueAsNumber;
    const billDisplay = document.querySelector('#billAmount') as HTMLSpanElement;
    billDisplay.innerText = `\$${billAmount}`;

    //tip = base x tip percent
    tipAmount = billAmount * percentageTip / 100;
    const tipAmountDisplay = document.querySelector('#currentTipAmount') as HTMLSpanElement;
    tipAmountDisplay.innerText = `\$${tipAmount}`;

    //add tip to base for total
    total = billAmount + tipAmount;
    const totalAmountDisplay = document.querySelector('#total') as HTMLSpanElement;
    totalAmountDisplay.innerText = `\$${total}`;

}