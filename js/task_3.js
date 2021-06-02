/**
  * Функция-обертка над XMLHttpRequest, осуществляющая запрос
  * url - урл, по которому будет осуществляться запрос
  * callback - функция, которая вызовется при успешном выполнении
  * и первым параметром получит объект-результат запроса
  */
 const url = 'https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440';

 const result = document.querySelector('.result_body');
  
 const tableRow = document.querySelector('.cells');
 
 const btn = document.querySelector('.btn-request');

 function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result, getYear());
        }
      }
    };
    
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
  };

  function displayResult(apiData, year) {
    // let cards = '';
    console.log(apiData); 
    const newRow = document.createElement('tr');
    newRow.className = 'cells';
    let data = apiData.filter(item => item.year === year)[0].sales;
    let i = 0;
    for (let key in data) {
        tableRow.cells[i].innerText = Number(data[key]);
        console.log(i, Number(data[key]));
        i++;
    }
  }

  function getYear() {
      return 2017;
  }
  
  btn.addEventListener('click', () => {
    useRequest(url, displayResult);
  })