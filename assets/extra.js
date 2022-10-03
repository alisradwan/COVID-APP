let entry = document.getElementById('entry');
let btn = document.querySelector('.btn');
let searchform = document.getElementById('searchform')
const confCases = document.getElementById('confirmed');
const recoCases = document.getElementById('recovered');
const deathCases = document.getElementById('deaths');

/*entry.addEventListener('input', e => {
    const value = e.target.value
    console.log(value)

})*/

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
	let rStat = covidData.recovered;
	let dStat = covidData.deaths;
	confCases.innerHTML = ('Confirmed:' + cStat);
	recoCases.innerHTML = ('Recovered:' + rStat);
	deathCases.innerHTML = ('Deaths:' + dStat);
}