"use strict";


async function f() {
let url = 'https://www.cbr-xml-daily.ru/daily_json.js';
let response = await fetch(url);
let json = await response.json(); // загружаем JSON с курсами с сервера
let rateobject = JSON.parse(json);

let value = document.getElementById("value");
let result = document.getElementById("result");
let rateleft = 1/rateobject.Valute.USD.Value;
let rateright = rateobject.Valute.USD.Value;

let rateplaque_left = document.getElementById("rateplaque_left");
let rateplaque_right = document.getElementById("rateplaque_right");

rateplaque_left.innerText = rateleft;
rateplaque_right.innerText = rateright;

value.oninput = function () {
  if (value.value == "") {
    result.value = "";
  } else {
    let res = value.value * rateru;
    result.value = res.toFixed(2);
  }
};

result.oninput = function () {
  if (result.value == "") {
    value.value = "";
  } else {
    let res = result.value * rateusd;
    value.value = res.toFixed(2);
  }
};

}

f();