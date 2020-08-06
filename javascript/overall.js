let url = "https://api.covid19india.org/data.json";

fetch(url).then( (response) => {

    return response.json();

}).then ( (data) => {

    let update = document.getElementById("update");
    let latestDay = data.cases_time_series.pop();
    update.innerText = `Last updated on: ${latestDay.date} 2020`;

    let dailyConfirmed = document.getElementById("dailyConfirmed");
    let dailyDeceased = document.getElementById("dailyDeceased");
    let dailyRecovered = document.getElementById("dailyRecovered");

    dailyConfirmed.innerText = latestDay.dailyconfirmed;
    dailyDeceased.innerText = latestDay.dailydeceased;
    dailyRecovered.innerText = latestDay.dailyrecovered;



})