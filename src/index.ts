import './styles.css';
const buttons = document.querySelectorAll(".tipBtn");
buttons.forEach(element => {
    if (element.id === "custom") {
        element.addEventListener('click', customButtonClick);
    } else {
        element.addEventListener('click', tipButtonClick)
    };
});

const billInput = document.querySelector('#baseAmount') as HTMLInputElement;
billInput.addEventListener('keyup', baseAmountChanged);

const customTipInput = document.querySelector('#customEntry') as HTMLInputElement;
customTipInput.addEventListener('keyup', customTipAmountChanged);

let percentageTip: number;
let billAmount: number;
let tipAmount: number;
let total: number;

// sessionStorage only lasts as long as the browser window is open. If you use localStorage, it saves it.
let previousTipId = localStorage.getItem('tipBtnId');
if (previousTipId != null) {
    // if you used getElementById you can get to this more efficiently.
    const btn = document.querySelector(`#${previousTipId}`) as HTMLButtonElement;
    btn.click();
    billInput.classList.remove('bad-input');
} else {
    // what should we do if it is null? In other words, it isn't saved?
    // I'm going to default it to 20%. Because I am generous like that.
    document.getElementById('twenty').click();
}


function customTipAmountChanged() {
    if (validateInput(this)) {
        percentageTip = this.valueAsNumber;
        let tipPercentDisplay = document.querySelectorAll('.tipPercent');
        tipPercentDisplay.forEach(element => {
            const display = element as HTMLSpanElement;
            display.innerText = `${percentageTip}%`;
        });

        if (validateInput(billInput)) {
            updateTotals(false);
        }
    }
}

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

function customButtonClick() {
    customTipInput.classList.remove('invisible');
    buttons.forEach(element => {
        const btn = element as HTMLButtonElement;
        btn.disabled = false;
    });
    this.disabled = true;
    localStorage.setItem('tipBtnId', this.id);
}

function tipButtonClick() {
    const clickedBtn = this as HTMLButtonElement;
    customTipInput.classList.add('invisible');

    buttons.forEach(element => {
        const btn = element as HTMLButtonElement;
        if (clickedBtn.id === btn.id) {
            btn.disabled = true;

        } else {
            btn.disabled = false;
        }
    });

    localStorage.setItem('tipBtnId', clickedBtn.id);

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