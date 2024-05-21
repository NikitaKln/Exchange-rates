"use strict";

async function f() {
  let url = "https://www.cbr-xml-daily.ru/daily_json.js";
  let response = await fetch(url);
  let json = await response.json(); // загружаем JSON с курсами с сервера

  let value = document.getElementById("value");
  let result = document.getElementById("result");
  let valuteL = 1;
  let valuteR = json.Valute.USD.Value; //дефолтные значения
  let valuteLChar = "RUR";
  let valuteRChar = "USD";
  let rateLeft = valuteL / valuteR;
  let rateRight = valuteR / valuteL;

  let rateplaqueLeft = document.getElementById("rateplaque_left");
  let rateplaqueRight = document.getElementById("rateplaque_right");

  rateplaqueLeft.innerText = `1 ${valuteLChar} = ${rateLeft.toFixed(
    4
  )} ${valuteRChar}`;
  rateplaqueRight.innerText = `1 ${valuteRChar} = ${rateRight.toFixed(
    4
  )} ${valuteLChar}`;

  //калькулятор валют

  value.oninput = function () {
    if (value.value === "") {
      result.value = "";
    } else {
      let res = value.value * rateLeft;
      result.value = res.toFixed(2);
    }
  };

  result.oninput = function () {
    if (result.value === "") {
      value.value = "";
    } else {
      let res = result.value * rateRight;
      value.value = res.toFixed(2);
    }
  };

  // селекторы валют

  let rurl = document.getElementById("RURL");
  let usdl = document.getElementById("USDL");
  let eurl = document.getElementById("EURL");
  let gbpl = document.getElementById("GBPL");
  let rurr = document.getElementById("RURR");
  let usdr = document.getElementById("USDR");
  let eurr = document.getElementById("EURR");
  let gbpr = document.getElementById("GBPR");

  function update() {
    rateLeft = valuteL / valuteR;
    rateRight = valuteR / valuteL;
    rateplaqueLeft.innerText = `1 ${valuteLChar} = ${rateLeft.toFixed(
      4
    )} ${valuteRChar}`;
    rateplaqueRight.innerText = `1 ${valuteRChar} = ${rateRight.toFixed(
      4
    )} ${valuteLChar}`;
    let resleft = value.value * rateLeft;
    result.value = resleft.toFixed(2);
    let resright = result.value * rateRight;
    value.value = resright.toFixed(2);
  }

  function leftCurrencySelector(currency) {
    if (currency === 1) {
      valuteL = 1;
      valuteLChar = "RUR";
    } else {
      valuteL = currency.Value;
      valuteLChar = currency.CharCode;
    }
    update();
  }

  function rightCurrencySelector(currency) {
    if (currency === 1) {
      valuteR = 1;
      valuteRChar = "RUR";
    } else {
      valuteR = currency.Value;
      valuteRChar = currency.CharCode;
    }
    update();
  }

  rurl.onclick = function () {
    leftCurrencySelector(1);
  };

  usdl.onclick = function () {
    leftCurrencySelector(json.Valute.USD);
  };

  eurl.onclick = function () {
    leftCurrencySelector(json.Valute.EUR);
  };

  gbpl.onclick = function () {
    leftCurrencySelector(json.Valute.GBP);
  };

  rurr.onclick = function () {
    rightCurrencySelector(1);
  };

  usdr.onclick = function () {
    rightCurrencySelector(json.Valute.USD);
  };

  eurr.onclick = function () {
    rightCurrencySelector(json.Valute.EUR);
  };

  gbpr.onclick = function () {
    rightCurrencySelector(json.Valute.GBP);
  };

  //остальные влаюты в выпадающем меню

  let currencyArray = []; //массив валют для сортировки

  Object.values(json.Valute).forEach((obj) => {
    if (!["RUR", "USD", "EUR", "GBP"].includes(obj.CharCode)) {
      currencyArray.push(obj);
    }
  });

  //сортируем в алфавитном порядке
  currencyArray.sort(function (a, b) {
    return a.CharCode.localeCompare(b.CharCode);
  });

  let othersLeft = document.getElementById("left-dropdown-content");

  for (let i = 0; i < currencyArray.length; i++) {
    let button = document.createElement("input");
    button.className = "currency-select dropdown-button";
    button.type = "button";
    button.name = currencyArray[i].CharCode;
    button.id = `${currencyArray[i].CharCode}L`;
    button.value = currencyArray[i].CharCode;
    button.onclick = function () {
      leftCurrencySelector(currencyArray[i]);
      let arrowl = document.getElementById("arrowl");
      arrowl.value = currencyArray[i].CharCode;
    };
    othersLeft.append(button);
  }

  let othersRight = document.getElementById("right-dropdown-content");

  for (let i = 0; i < currencyArray.length; i++) {
    let button = document.createElement("input");
    button.className = "currency-select dropdown-button";
    button.type = "button";
    button.name = currencyArray[i].CharCode;
    button.id = `${currencyArray[i].CharCode}R`;
    button.value = currencyArray[i].CharCode;
    button.onclick = function () {
      rightCurrencySelector(currencyArray[i]);
      let arrowr = document.getElementById("arrowr");
      arrowr.value = currencyArray[i].CharCode;
    };
    othersRight.append(button);
  }

  //кнопка SWAP

  let swap = document.getElementById("swap");

  swap.onclick = function () {
    let container = valuteL;
    valuteL = valuteR;
    valuteR = container;
    container = valuteLChar;
    valuteLChar = valuteRChar;
    valuteRChar = container;
    rateLeft = valuteL / valuteR;
    rateRight = valuteR / valuteL;
    rateplaqueLeft.innerText = `1 ${valuteLChar} = ${rateLeft.toFixed(
      4
    )} ${valuteRChar}`;
    rateplaqueRight.innerText = `1 ${valuteRChar} = ${rateRight.toFixed(
      4
    )} ${valuteLChar}`;
    container = value.value;
    value.value = result.value;
    result.value = container;

    let temp;
    let arrowTemp = arrowl;
    let arrowLTempValue = arrowl.value;
    let arrowRTempValue = arrowr.value;
    let swapFlagRight = 0;
    let swapFlagLeft = 0;

    if (arrowl.classList.contains("highlight")) {
      arrowl.classList.remove("highlight");
      if (arrowr.classList.contains("highlight")) {
        arrowl.value = arrowr.value;
        arrowl.classList.add("highlight");
      } else {
        arrowl.value = "Другие";
        swapFlagRight = 1;
        arrowr.value = arrowLTempValue;
      }
    }

    if (arrowr.classList.contains("highlight")) {
      arrowr.classList.remove("highlight");
      if (arrowTemp.classList.contains("highlight")) {
        console.log(arrowTemp.value);
        arrowr.value = arrowLTempValue;
        arrowr.classList.add("highlight");
      } else {
        arrowr.value = "Другие";
        swapFlagLeft = 1;
        arrowl.value = arrowRTempValue;
      }
    }
    if (swapFlagRight === 1) {
      arrowr.classList.add("highlight");
      swapFlagRight = 0;
    }

    if (swapFlagLeft === 1) {
      arrowl.classList.add("highlight");
      swapFlagLeft = 0;
    }

    if (leftSelectedButton) {
      leftSelectedButton.classList.remove("highlight");
      temp = leftSelectedButton;

      leftSelectedButton = document.getElementById(
        `${rightSelectedButton.value}L`
      );

      leftSelectedButton.classList.add("highlight");
    }

    if (rightSelectedButton) {
      rightSelectedButton.classList.remove("highlight");
      rightSelectedButton = document.getElementById(`${temp.value}R`);
      rightSelectedButton.classList.add("highlight");
    }
  };

  //подсветка кнопок

  let leftSelectedButton = rurl;
  let rightSelectedButton = usdr;
  let leftUl = document.getElementById("leftul");
  let rightUl = document.getElementById("rightul");

  leftSelectedButton.classList.add("highlight");
  rightSelectedButton.classList.add("highlight");

  leftUl.onclick = function (event) {
    let target = event.target.closest("input");
    if (!target) return;
    highlightLeft(target);
  };

  rightUl.onclick = function (event) {
    let target = event.target.closest("input");
    if (!target) return;
    highlightRight(target);
  };

  function highlightLeft(elem) {
    if (othersLeft.contains(elem)) {
      arrowl.classList.add("highlight");
    } else {
      arrowl.classList.remove("highlight");
    }
    if (leftSelectedButton) {
      leftSelectedButton.classList.remove("highlight");
    }
    leftSelectedButton = elem;
    leftSelectedButton.classList.add("highlight");
  }

  function highlightRight(elem) {
    if (othersRight.contains(elem)) {
      arrowr.classList.add("highlight");
    } else {
      arrowr.classList.remove("highlight");
    }
    if (rightSelectedButton) {
      rightSelectedButton.classList.remove("highlight");
    }
    rightSelectedButton = elem;
    rightSelectedButton.classList.add("highlight");
  }
}

window.onload = f();
