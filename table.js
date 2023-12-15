"use strict";

async function f() {
    let url = 'https://www.cbr-xml-daily.ru/daily_json.js';
    let response = await fetch(url);
    let json = await response.json();

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

    
    //генерим содержимое таблицы

    let table = document.getElementById('table');

    for (let i=0; i<5; i++) {
        let headerrow = document.createElement('tr');
        table.append(headerrow);
        for (let j=i*10; (j<((i*10) + 10))&&(j<currencyArray.length) ; j++) {
            let th = document.createElement('th');
            th.innerText = currencyArray[j].CharCode;
            headerrow.append(th);
        }
        let datarow = document.createElement('tr');
        table.append(datarow);
        for (let  j=i*10; (j<((i*10) + 10))&&(j<currencyArray.length) ; j++) {
            let td = document.createElement('td');
            td.innerText = currencyArray[j].Value.toFixed(4);
            td.id = currencyArray[j].CharCode;
            datarow.append(td);
        }
    }

    //генерим кнопки 

    let baseSelector = document.getElementById('table-dropdown-content');

    for (let i=0; i<currencyArray.length; i++) {
        let button = document.createElement('button');
        button.innerText = currencyArray[i].CharCode;
        button.onclick = function () {
            for (let j=0; j<currencyArray.length; j++) {
            let td = document.getElementById(currencyArray[j].CharCode);
            let result = currencyArray[j].Value/currencyArray[i].Value;
            td.innerText = result.toFixed(4);
            }
        }
        baseSelector.append(button);
    }

    //кнопка рубля

    let rubutton = document.createElement('button');
    baseSelector.append(rubutton);
    rubutton.innerText = 'RUR';
    rubutton.onclick = function () {
        for (let i=0; i<currencyArray.length; i++) {
            let td = document.getElementById(currencyArray[i].CharCode);
            td.innerText = currencyArray[i].Value.toFixed(4);
        }
    }
}


window.onload = f();