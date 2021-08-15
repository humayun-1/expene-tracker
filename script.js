var btn = document.querySelector(".add");
var reset = document.querySelector('.reset');
var amount = document.querySelector("#amount");
var item = document.querySelector('#text');
var bars = document.querySelector(".bars");
var incomeValue = document.querySelector('.income');
var expenseValue = document.querySelector('.expense');
var balance = document.querySelector('.balance');

let incomeArr = localStorage.getItem('income') ? JSON.parse(localStorage.getItem('income')) : [];
let expenseArr = localStorage.getItem('expense') ? JSON.parse(localStorage.getItem('expense')) : [];

btn.addEventListener('click', main);

function main(e) {
    if (amount.value != '' && item.value != '') {
        if (amount.value > 0) {
            bars.innerHTML += `<div class="border bar bars-success p-3 bg-light my-2" id="man">
            <span class="m-0 bar-text">${item.value}</span>
            <span class="m-0 bar-value text-right float-right">${amount.value}</span>
          </div>`;
            let income = {
                item: item.value,
                amount: amount.value
            };
            incomeArr.push(income)
            localStorage.setItem('income', JSON.stringify(incomeArr));
        }
        else {
            bars.innerHTML += `<div class="border bar bars-danger p-3 bg-light my-2">
            <span class="m-0 bar-text bar-text">${item.value}</span>
            <span class="m-0 bar-value text-right float-right">${amount.value}</span>
          </div>`;
            let expense = {
                item: item.value,
                amount: amount.value
            };
            expenseArr.push(expense)
            localStorage.setItem('expense', JSON.stringify(expenseArr));
        }
    }
    else {
        alert('Fill All The Fields!!!')
    }
    item.value = '';
    amount.value = '';
}

function loadData() {
    if (localStorage.getItem('income')) {
        let parseIncome = JSON.parse(localStorage.getItem('income'));
        for (i = 0; i < parseIncome.length; i++) {
            bars.innerHTML = bars.innerHTML += `<div class="border bar bars-success p-3 bg-light my-2">
            <span class="m-0 bar-text bar-text">${parseIncome[i].item}</span>
            <span class="m-0 bar-value text-right float-right">${parseIncome[i].amount}</span>
          </div>`;
        }
    }

    if (localStorage.getItem('expense')) {
        let parseIncome = JSON.parse(localStorage.getItem('expense'));
        for (i = 0; i < parseIncome.length; i++) {
            bars.innerHTML = bars.innerHTML += `<div class="border bar bars-danger p-3 bg-light my-2">
            <span class="m-0 bar-text bar-text">${parseIncome[i].item}</span>
            <span class="m-0 bar-value text-right float-right">${parseIncome[i].amount}</span>
          </div>`;
        }
    }
}

window.addEventListener('DOMContentLoaded', loadData)

reset.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})

function interval() {

    if (bars.childNodes.length > 1) {
        let temp1 = 0;
        let temp2 = 0;
        for (i = 1; i < bars.childNodes.length; i++) {
            if (bars.childNodes[i].classList.contains('bars-success')) {
                var barValue = bars.childNodes[i].childNodes[3].innerHTML;
                temp1 = temp1 + eval(barValue)
                incomeValue.innerHTML = temp1;
            }
            if (bars.childNodes[i].classList.contains('bars-danger')) {
                var barValue = bars.childNodes[i].childNodes[3].innerHTML;
                temp2 = temp2 + eval(barValue)
                expenseValue.innerHTML = temp2;
            }
            balance.innerHTML = Math.abs(incomeValue.innerHTML) - Math.abs(expenseValue.innerHTML);
        }
    }
}
setInterval(interval, 10)
