function setChartImageUrl(year, data) { 
    let url = "https://quickchart.io/chart?c={type:'bar',data:{labels:['Кв.1','Кв.2','Кв.3','Кв.4'],datasets:[{label:'Выручка за " + year + "',data:";
    let dataSet = '[';
    for (let key in data) {
        dataSet += Number(data[key]) + ',';
    }
    dataSet = dataSet.slice(0,-1) + ']';
    url += dataSet + '}]}}';
    return url;
};