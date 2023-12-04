"use strict";


async function f() {
let url = 'https://www.cbr-xml-daily.ru/daily_json.js';
let response = await fetch(url);
let json = await response.json(); // загружаем JSON с курсами с сервера

let value = document.getElementById("value");
let result = document.getElementById("result");
let rateleft = 1/json.Valute.USD.Value; //дефолтные значения
let rateright = json.Valute.USD.Value;

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

}

f();