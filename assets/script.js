let map;
let centerUSLatLong = { lat: 38.500000, lng: -98.000000 }; 
let entry = document.getElementById('entry');
let btn = document.querySelector('.btn');
let zLvl = 4;
let searchform = document.getElementById('searchform')
const confCases = document.getElementById('confirmed');
const fataCases = document.getElementById('fatal');
const deathCases = document.getElementById('deaths');


searchform.addEventListener('submit', function search(e) {
    e.preventDefault();

    
    var userInput = entry.value.trim();
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fc0adc508dmsh28f6b95da901a5ap1db43bjsn7fc159e7f5c2',
            'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
        }
    };
fetch('https://covid-19-statistics.p.rapidapi.com/reports?q=' + userInput, options)
    .then(response => response.json())
    .then(response => {
        filterResults(response.data, userInput)})
    .catch(err => console.error(err));
    entry.value = ''
})

function filterResults(covidData, state) {
    for (var i = 0; i < covidData.length; i++)
    {
        if (covidData[i].region.name === 'US' &&
         covidData[i].region.province.toLowerCase() === state.toLowerCase())
        {
            console.log('found it');
            displayCovidData(covidData[i])
        }
    }
}

function displayCovidData(covidData) {
    console.log('data wanted', covidData)
	let cStat = covidData.active;
	let fStat = covidData.fatality_rate;
	let dStat = covidData.deaths;
    let covidLat = parseInt(covidData.region.lat);
    let covidLon = parseInt(covidData.region.long);
    zLvl = 5;
    centerUSLatLong = { lat: covidLat, lng: covidLon};
    initMap();
    
	confCases.innerHTML = ('Confirmed:' + cStat);
	fataCases.innerHTML = ('Fatality Rate:' + fStat);
	deathCases.innerHTML = ('Deaths:' + dStat);
}



function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: centerUSLatLong,
    zoom: zLvl,
    mapId: "354e515ae59101d6",
  });
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b9e94fe346mshe89ab685882efa5p1248bcjsndee919de9077',
		'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
	}
};

const RAPID_API_HOST = 'https://covid-19-statistics.p.rapidapi.com';
const provinceEndpoint = `${RAPID_API_HOST}/provinces?iso=USA`

async function getCovidLocations() {
  const response = await fetch(provinceEndpoint, options);
  const {data} = await response.json();
  return data;
}

async function getReportsByProvince(province) {
  const reportsEndpoint = `${RAPID_API_HOST}/reports?region_province=${province}`

  const response = await fetch(reportsEndpoint, options);
  const {data} = await response.json();
  return data;
}

async function renderMarkers () {
  const locations = await getCovidLocations();
  const infoWindow = new google.maps.InfoWindow();
  
  locations.forEach(function (location) {
    const region = location.province.split(' ');
    const isCounty = region[region.length - 1].length === 2;
    const isStateRegion = region.length <= 2 && !isCounty;

    if (isStateRegion && !region.includes('Princess')) {
      const marker = new google.maps.Marker({
        position: {
          lat: Number(location.lat),
          lng: Number(location.long)
        },
        title: location.province,
        map: map,
        optimized: false
      });
  
      marker.addListener('click', async function () {
        infoWindow.close();
        const data = await getReportsByProvince(location.province);
        const report = data[0];

        infoWindow.setContent(`${marker.getTitle()+":"}
          Active cases: ${report.active},
          Deaths:  ${report.deaths}`
        );

        infoWindow.open(marker.getMap(), marker);
      })
    }
  })
}

renderMarkers();
