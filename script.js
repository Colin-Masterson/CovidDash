let headerDate = document.querySelector('.todays-date')

window.onload = () =>{
    let today = new Date()
    let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();

    headerDate.textContent = date
    fetchLatestCases()
    fetchCountyCases(county)
}




const fetchLatestCases = () =>{

    let api =
  "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,TotalConfirmedCovidCases,ConfirmedCovidDeaths,Male,Female,TotalCovidDeaths&outSR=4326&f=json";

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

const selecter = document.getElementById("counties");

selecter.addEventListener("change", e =>{
    let county = e.target.value
    fetchCountyCases(county)
})

let county = "carlow"

const fetchCountyCases = (c) =>{
    let api = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIreland/FeatureServer/0/query?where=CountyName%20%3D%20%27${c}%27&outFields=CountyName,ConfirmedCovidCases,ConfirmedCovidDeaths,TimeStamp&returnGeometry=false&outSR=4326&f=json`

    fetch(api)
    .then((res) => res.json())
    .then((res) => res.features)
    .then((res) => {
        let yesterdaysInfoObject = res[res.length-2]
        let todaysInfoObject = res[res.length-1]
        let yesterdayArray = yesterdaysInfoObject.attributes
        let todayArray = todaysInfoObject.attributes
        let date = todayArray["TimeStamp"]

        var date_string = new Date(date).toDateString();
        let newCases = todayArray["ConfirmedCovidCases"] - yesterdayArray["ConfirmedCovidCases"]
        let totalCases = todayArray["ConfirmedCovidCases"]

        console.log(newCases)
        console.log(totalCases)

        document.querySelector(".latest-date-county").textContent = date_string
        document.querySelector(".testcases").textContent = newCases
        document.querySelector(".testtotal").textContent = totalCases

        
    })
}
