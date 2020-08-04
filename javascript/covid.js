let info = document.getElementById("detailsInfo");
let casesContainer = document.getElementById("casesContainer");
let detailsContainer = document.getElementById("detailsContainer");
let backButtonFunction = true;

detailsContainer.style.display = "none";


fetch("https://api.covid19india.org/data.json").then( (response) => {

    return response.json();

}).then( (data) => {

    console.log(data);
    let counter = -1;
    let tableHead = document.getElementById("tableHead");
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

    let tableContent="";

    for (const cases of data.statewise) {

        if(counter != -1)
        {
            tableContent += 
            `
                <tr>
                <th scope="row">${counter+1}</th>
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


function getDistrictData(id){
    
    info.style.display = "none";
    casesContainer.style.display = "block";
    detailsContainer.style.display = "none";

    if(backButtonFunction == true)
    {
        stateName = document.getElementById(id).innerText;
    }

    else
    {
        stateName = id.getAttribute("id");

    }

        fetch("https://api.covid19india.org/state_district_wise.json").then( (response) => {
    
            return response.json();
    
        }).then( (data) => {

            
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
    
          let tableContent="";
    
                for (const districtData in data[stateName]) {
    
                    // console.log(data["Rajasthan"][districtData]);
    
                    for (const place in data[stateName][districtData]) {
    
                        // console.log(place);
    
                        // console.log(data[stateName][districtData][place]);

                        if(data[stateName][districtData][place].active != undefined)
                        {
                                tableContent += 
                                `
                                    <tr>
                                    <th scope="row">${counter+1}</th>
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
              more.innerHTML = `<a id=${stateName} onclick = "getIndividualStateData(this.id)">Click here to know more</a>`;
    
    })

}

function getIndividualStateData(stateId)
{
    detailsContainer.style.display = "block";
    casesContainer.style.display = "none";
    backButtonFunction = false;

    
    let back2 = document.getElementById("back2");
    back2.innerHTML = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
    <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
    </svg><a onclick="getDistrictData(${stateId})">back</a>`
    

}

