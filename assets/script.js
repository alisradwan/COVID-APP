let map;
let centerUSLatLong = { lat: 38.500000, lng: -98.000000 }; 

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: centerUSLatLong,
    zoom: 4,
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


