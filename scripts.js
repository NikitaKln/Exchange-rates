"use strict";


async function f() {
let url = 'https://www.cbr-xml-daily.ru/daily_json.js';
let response = await fetch(url);
let json = await response.json(); // загружаем JSON с курсами с сервера

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


rurl.onclick = function () {
  valuteL = 1;
  rateleft = valuteL/valuteR;
  rateright = valuteR/valuteL;
  rateplaque_left.innerText = rateleft;
  rateplaque_right.innerText = rateright;
  let resleft = value.value * rateleft;
  result.value = resleft.toFixed(2);
  let resright = result.value * rateright;
  value.value = resright.toFixed(2);

}

usdl.onclick = function () {
  valuteL = json.Valute.USD.Value;
  rateleft = valuteL/valuteR;
  rateright = valuteR/valuteL;
  rateplaque_left.innerText = rateleft;
  rateplaque_right.innerText = rateright;
  let resleft = value.value * rateleft;
  result.value = resleft.toFixed(2);
  let resright = result.value * rateright;
  value.value = resright.toFixed(2);
}

eurl.onclick = function () {
  valuteL = json.Valute.EUR.Value;
  rateleft = valuteL/valuteR;
  rateright = valuteR/valuteL;
  rateplaque_left.innerText = rateleft;
  rateplaque_right.innerText = rateright;
  let resleft = value.value * rateleft;
  result.value = resleft.toFixed(2);
  let resright = result.value * rateright;
  value.value = resright.toFixed(2);
}

gbpl.onclick = function () {
  valuteL = json.Valute.GBP.Value;
  rateleft = valuteL/valuteR;
  rateright = valuteR/valuteL;
  rateplaque_left.innerText = rateleft;
  rateplaque_right.innerText = rateright;
  let resleft = value.value * rateleft;
  result.value = resleft.toFixed(2);
  let resright = result.value * rateright;
  value.value = resright.toFixed(2);
}

rurr.onclick = function () {
  valuteR = 1;
  rateleft = valuteL/valuteR;
  rateright = valuteR/valuteL;
  rateplaque_left.innerText = rateleft;
  rateplaque_right.innerText = rateright;
  let resleft = value.value * rateleft;
  result.value = resleft.toFixed(2);
  let resright = result.value * rateright;
  value.value = resright.toFixed(2);
}

usdr.onclick = function () {
  valuteR = json.Valute.USD.Value;
  rateleft = valuteL/valuteR;
  rateright = valuteR/valuteL;
  rateplaque_left.innerText = rateleft;
  rateplaque_right.innerText = rateright;
  let resleft = value.value * rateleft;
  result.value = resleft.toFixed(2);
  let resright = result.value * rateright;
  value.value = resright.toFixed(2);
}

eurr.onclick = function () {
  valuteR = json.Valute.EUR.Value;
  rateleft = valuteL/valuteR;
  rateright = valuteR/valuteL;
  rateplaque_left.innerText = rateleft;
  rateplaque_right.innerText = rateright;
  let resleft = value.value * rateleft;
  result.value = resleft.toFixed(2);
  let resright = result.value * rateright;
  value.value = resright.toFixed(2);
}

gbpr.onclick = function () {
  valuteR = json.Valute.GBP.Value;
  rateleft = valuteL/valuteR;
  rateright = valuteR/valuteL;
  rateplaque_left.innerText = rateleft;
  rateplaque_right.innerText = rateright;
  let resleft = value.value * rateleft;
  result.value = resleft.toFixed(2);
  let resright = result.value * rateright;
  value.value = resright.toFixed(2);
}
}

f();