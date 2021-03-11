let headerDate = document.querySelector('.todays-date')

window.onload = () =>{
    let today = new Date()
    let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();

    headerDate.textContent = date
    test()
}

let api =
  "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,TotalConfirmedCovidCases,ConfirmedCovidDeaths,Male,Female,TotalCovidDeaths&outSR=4326&f=json";

const test = () =>{
    fetch(api)
    .then((res) => res.json())
    .then((test) => test.features)
    .then((array) => array[array.length - 1])
    .then((item) => item.attributes)
    .then((item) => {
      let date = item["Date"];
      let cases = item["ConfirmedCovidCases"];
      let deaths = item["ConfirmedCovidDeaths"];
      let totalCases = item["TotalConfirmedCovidCases"];
      let totalDeaths = item["TotalCovidDeaths"];
  
      var date_string = new Date(date).toDateString();
  
      document.querySelector(".latest-date").textContent = "Last Updated on " + date_string;
      document.querySelector(".cases").textContent = cases;
      document.querySelector(".deaths").textContent = deaths;
      document.querySelector(".case-total").textContent = totalCases;
      document.querySelector(".death-total").textContent = totalDeaths;
    });
}

