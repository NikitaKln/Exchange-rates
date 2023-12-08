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

    
    //генерим содержимое таблицы из чистого воздуха

    let table = document.getElementById('table');

    for (let i=0; i<5; i++) {
        let headerrow = document.createElement('tr');
        table.append(headerrow);
        for (let j=i*10; j<((i*10) + 10); j++) {
            let th = document.createElement('th');
            th.innerText = currencyArray[j].CharCode;
            headerrow.append(th);
        }
        let datarow = document.createElement('tr');
        table.append(datarow);
        for (let  j=i*10; j<((i*10) + 10); j++) {
            let td = document.createElement('td');
            td.innerText = currencyArray[j].Value;
            datarow.append(td);
        }
    }

}

window.onload(f());