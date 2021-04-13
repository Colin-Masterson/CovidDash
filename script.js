window.onload = () => {
  getDate();
  fetchLatestCases();
  fetchCountyCases('Carlow');
  fetchVaccineData();
};

const selecter = document.getElementById('counties');

selecter.addEventListener('change', (e) => {
  let county = e.target.value;
  fetchCountyCases(county);
});

const getDate = () => {
  let headerDate = document.querySelector('.todays-date');
  let today = new Date();
  let date =
    today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

  headerDate.textContent = date;
};

const fetchLatestCases = async () => {
  let api =
    'https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,TotalConfirmedCovidCases,ConfirmedCovidDeaths,Male,Female,TotalCovidDeaths&outSR=4326&f=json';

  let fetchData = await fetch(api);
  let jsonData = await fetchData.json();
  let features = await jsonData.features;
  let latestData = await features[features.length - 1];
  let item = latestData.attributes;

  let date = item['Date'];
  let cases = item['ConfirmedCovidCases'];
  let deaths = item['ConfirmedCovidDeaths'];
  let totalCases = item['TotalConfirmedCovidCases'];
  let totalDeaths = item['TotalCovidDeaths'];

  var date_string = new Date(date).toDateString();

  document.querySelector(
    '.latest-date'
  ).innerHTML = `Last Updated on ${date_string}`;
  document.querySelector('.cases').textContent = cases.toLocaleString();
  document.querySelector('.deaths').textContent = deaths.toLocaleString();
  document.querySelector(
    '.case-total'
  ).textContent = totalCases.toLocaleString();
  document.querySelector(
    '.death-total'
  ).textContent = totalDeaths.toLocaleString();
};

const fetchCountyCases = async (c) => {
  let api = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIreland/FeatureServer/0/query?where=CountyName%20%3D%20%27${c}%27&outFields=CountyName,ConfirmedCovidCases,ConfirmedCovidDeaths,TimeStamp&returnGeometry=false&outSR=4326&f=json`;

  let response = await fetch(api);
  let json = await response.json();
  let res = await json.features;

  let yesterdaysInfoObject = res[res.length - 2];
  let todaysInfoObject = res[res.length - 1];
  let yesterdayArray = yesterdaysInfoObject.attributes;
  let todayArray = todaysInfoObject.attributes;
  let date = todayArray['TimeStamp'];

  var date_string = new Date(date).toDateString();
  let newCases =
    todayArray['ConfirmedCovidCases'] - yesterdayArray['ConfirmedCovidCases'];
  let totalCases = todayArray['ConfirmedCovidCases'];

  document.querySelector(
    '.latest-date-county'
  ).textContent = `Last Updated on ${date_string}`;
  document.querySelector('.testcases').textContent = newCases.toLocaleString();
  document.querySelector(
    '.testtotal'
  ).textContent = totalCases.toLocaleString();
};

const fetchVaccineData = async () => {
  let vaccineData = await fetch(
    'https://services-eu1.arcgis.com/z6bHNio59iTqqSUY/arcgis/rest/services/Covid19_Vaccine_Administration_Hosted_View/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22firstDose%22%2C%22outStatisticFieldName%22%3A%22firstDose_max%22%2C%22statisticType%22%3A%22max%22%7D%5D'
  );
  let vaccinejson = await vaccineData.json();
  let total = await vaccinejson.features[0].attributes.firstDose_max;
  console.log(total.toLocaleString());
};
