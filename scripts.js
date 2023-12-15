"use strict";


async function f() {
let url = 'https://www.cbr-xml-daily.ru/daily_json.js';
let response = await fetch(url);
let json = await response.json(); // загружаем JSON с курсами с сервера

let currencyArray = [];    //массив валют для сортировки 
    
Object.values(json.Valute).forEach(obj => {         
    currencyArray.push(obj);
}); 


//сортируем в алфавитном порядке

currencyArray.sort(function(a, b) {
    let firstLetterComparison = a.CharCode[0].localeCompare(b.CharCode[0]);

    if (firstLetterComparison === 0) {
        return a.CharCode[1].localeCompare(b.CharCode[1]);
    }

    return firstLetterComparison;
});


let value = document.getElementById("value");
let result = document.getElementById("result");
let valuteL = 1;
let valuteR = json.Valute.USD.Value; //дефолтные значения
let rateleft = valuteL/valuteR; 
let rateright = valuteR/valuteL;

let rateplaque_left = document.getElementById("rateplaque_left");
let rateplaque_right = document.getElementById("rateplaque_right");

rateplaque_left.innerText = rateleft;
rateplaque_right.innerText = rateright;

value.oninput = function () {                   //калькулятор валют
  if (value.value == "") {
    result.value = "";
  } else {
    let res = value.value * rateleft;
    result.value = res.toFixed(2);
  }
};

result.oninput = function () {
  if (result.value == "") {
    value.value = "";
  } else {
    let res = result.value * rateright;
    value.value = res.toFixed(2);
  }
};

// селекторы валют

let rurl = document.getElementById('RURL');
let usdl = document.getElementById('USDL');
let eurl = document.getElementById('EURL');
let gbpl = document.getElementById('GBPL');
let rurr = document.getElementById('RURR');
let usdr = document.getElementById('USDR');
let eurr = document.getElementById('EURR');
let gbpr = document.getElementById('GBPR');

function update() {
  rateleft = valuteL/valuteR;
  rateright = valuteR/valuteL;
  rateplaque_left.innerText = rateleft;
  rateplaque_right.innerText = rateright;
  let resleft = value.value * rateleft;
  result.value = resleft.toFixed(2);
  let resright = result.value * rateright;
  value.value = resright.toFixed(2);
}

function leftCurrencySelector(currency) {
  valuteL = currency;
  update();
}

function rightCurrencySelector(currency) {
  valuteR = currency;
  update();
}


rurl.onclick = function () {leftCurrencySelector(1);}

usdl.onclick = function () {leftCurrencySelector(json.Valute.USD.Value);}

eurl.onclick = function () {leftCurrencySelector(json.Valute.EUR.Value);}

gbpl.onclick = function () {leftCurrencySelector(json.Valute.GBP.Value);}

rurr.onclick = function () {rightCurrencySelector(1);}

usdr.onclick = function () {rightCurrencySelector(json.Valute.USD.Value);}

eurr.onclick = function () {rightCurrencySelector(json.Valute.EUR.Value);}

gbpr.onclick = function () {rightCurrencySelector(json.Valute.GBP.Value);}

let othersLeft = document.getElementById('left-dropdown-content');

for (let i=0; i<currencyArray.length; i++) {
    let button = document.createElement('button');
    button.innerText = currencyArray[i].CharCode;
    button.onclick = function () {
       leftCurrencySelector(currencyArray[i].Value);
       let arrowl = document.getElementById('arrowl');
       arrowl.value = currencyArray[i].CharCode;
    }
    othersLeft.append(button);
}

let othersRight = document.getElementById('right-dropdown-content');

for (let i=0; i<currencyArray.length; i++) {
    let button = document.createElement('button');
    button.innerText = currencyArray[i].CharCode;
    button.onclick = function () {
       rightCurrencySelector(currencyArray[i].Value);
       let arrowr = document.getElementById('arrowr');
       arrowr.value = currencyArray[i].CharCode;
    }
    othersRight.append(button);
}

//кнопка SWAP



}

window.onload = f();