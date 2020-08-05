let info = document.getElementById("detailsInfo");
let casesContainer = document.getElementById("casesContainer");
let detailsContainer = document.getElementById("detailsContainer");
let backButtonFunction = true;
let tableHead = document.getElementById("tableHead");

detailsContainer.style.display = "none";


tableHead.classList.add("centerMe");
tableHead.innerHTML = `<div class="spinner-border text-primary" role="status">
<span class="sr-only">Loading...</span>
</div>`

fetch("https://api.covid19india.org/data.json").then((response) => {

    return response.json();

}).then((data) => {

    tableHead.classList.remove("centerMe");
    // console.log(data);
    let counter = -1;

    let tableBody = document.getElementById("tableBody");

    let string =
        `
    <tr>
    <th scope="col">  S.No.</th>
    <th scope="col">State</th>
    <th scope="col">Active</th>
    <th scope="col">Confirmed</th>
    </tr>

    `
    tableHead.innerHTML = string

    let tableContent = "";

    for (const cases of data.statewise) {

        if (counter != -1 && cases.state != "State Unassigned") {
            tableContent +=
                `
                <tr>
                <th scope="row">${counter + 1}</th>
                <td ><a id=${cases.state} onclick = "getDistrictData(this.id)" class="stateAnim">${cases.state}</a></td>
                <td>${cases.active}</td>
                <td>${cases.confirmed}</td>
                </tr>
        `
        }
        counter++;

    }

    info.style.display = "block";
    tableBody.innerHTML = tableContent;



})


function getDistrictData(id = stateName) {

    // console.log("id is " + id);
    info.style.display = "none";
    casesContainer.style.display = "block";
    detailsContainer.style.display = "none";

    if(backButtonFunction == true)
    {
        stateName = document.getElementById(id).innerText;
        // console.log("stateName is " + stateName);
    }



    fetch("https://api.covid19india.org/state_district_wise.json").then((response) => {

        return response.json();

    }).then((data) => {


        // console.log(data);
        let counter = 0;
        let tableHead = document.getElementById("tableHead");
        let tableBody = document.getElementById("tableBody");



        let string =
            `
            <tr>
            <th scope="col">  S.No.</th>
            <th scope="col">District</th>
            <th scope="col">Active</th>
            <th scope="col">Confirmed</th>
            </tr>
    
          `
        tableHead.innerHTML = string

        let tableContent = "";

        for (const districtData in data[stateName]) {

            // console.log(data["Rajasthan"][districtData]);

            for (const place in data[stateName][districtData]) {

                // console.log(place);

                // console.log(data[stateName][districtData][place]);

                if (data[stateName][districtData][place].active != undefined) {
                    tableContent +=
                        `
                                    <tr>
                                    <th scope="row">${counter + 1}</th>
                                    <td>${place}</td>
                                    <td>${data[stateName][districtData][place].active}</td>
                                    <td>${data[stateName][districtData][place].confirmed}</td>
                                    </tr>
                            `
                }
                counter++;


            }

        }

        tableBody.innerHTML = tableContent;

        let back = document.getElementById("back");
        back.innerHTML = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg><a onclick="location.reload()">back</a>`

        let more = document.getElementById("more");
        more.innerHTML = `<a class="moreAnchor" onclick = "getIndividualStateData()">Click here to know more</a>`;
        //   console.log(stateName);

    })

}

function getIndividualStateData() {

    // console.log("I am inside getIndividualStateData()");
    // console.log(stateName);
    detailsContainer.style.display = "block";
    casesContainer.style.display = "none";
    backButtonFunction = false;

    let back2 = document.getElementById("back2");
    back2.innerHTML = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
     <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
    <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
    </svg><a onclick="getDistrictData()">back</a>`;

    let stateHeading = document.getElementById("stateHeading");
    stateHeading.innerHTML = `${stateName}`;

    fetch("https://api.covid19india.org/data.json").then((response) => {

        return response.json();

    }).then((data) => {

        // console.log(data.statewise);

        for (const state of data.statewise) {
            if (state.state == stateName) {
                // console.log(true, stateName);
                let active = document.getElementById("activeValue");
                let confirmed = document.getElementById("confirmedValue");
                let deaths = document.getElementById("deathsValue");
                let recovered = document.getElementById("recoveredValue");

                active.innerText = `${state.active}`;
                confirmed.innerText = `${state.confirmed}`;
                deaths.innerText = `${state.deaths}`;
                recovered.innerText = `${state.recovered}`;


            }
        }



    })
}

