let url = "https://api.covid19india.org/data.json";

let myChart = document.getElementById("myChart").getContext("2d");

Chart.defaults.global.defaultFontSize= 16;

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
    
    console.log(latestDay.dailyconfirmed);
    
    let dataChart = new Chart(myChart, {

        type:"pie",

        data:{

            labels:["Daily Confirmed Cases", "Daily Deceased", "Daily Recovered"],

            datasets:[{
                label: "Chart Distribution",
                
                data:[latestDay.dailyconfirmed, latestDay.dailydeceased, latestDay.dailyrecovered],

                backgroundColor:["orange", "red", "green"]
            }]

        },

        options:{
            padding:{
                top:10
            }
        }

    })

})