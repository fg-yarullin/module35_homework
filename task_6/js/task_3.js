const url = 'https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440';

const reportYear = document.querySelector('.report-year');

const result = document.querySelector('.tbody');

const tableRow = document.querySelector('.cells');

const btn = document.querySelector('.btn-request');

const chartImage = document.querySelector('.chart-image');

function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result, getYear());
      }
    }
  };
  xhr.onerror = function () {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  xhr.send();
};

function displayResult(apiData, year) {
  const warning = document.querySelector('.warning');
  if (!year) {
    for (let cell of tableRow.cells) {
      cell.innerText = '';
    }
    warning.style.display = "block";
    chartImage.src = '';
    chartImage.style.display = "none";
    return;
  } else {
    warning.style.display = "none";
  }
  const data = apiData.filter(item => item.year == year)[0].sales;
  let i = 0;
  for (let key in data) {
    tableRow.cells[i].innerText = Number(data[key]);
    i++;
  }
  chartImage.src = setChartImageUrl(year, data);
  chartImage.style.display = !!chartImage.src ? "block" : "none";
}

function getYear() {
  let year = reportYear.options[reportYear.selectedIndex].value
  return year;
}

btn.addEventListener('click', () => {
  useRequest(url, displayResult);
})