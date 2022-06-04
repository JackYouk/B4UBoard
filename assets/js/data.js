// JS file for fetching api data
// to use: create a function that will be called in our UI (user interface) js file





let map = L.map('map');
function genMap(lat, lon, zoom){
    map.setView([lat, lon], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: zoom,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    // L.marker([-53.1, 72.51666666]).addTo(map);
}



// genMap()





// risk assesment
function riskData(){
    let countryRiskLevel = '';
    fetch('https://www.travel-advisory.info/api')
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        console.log(data);
        countryRiskLevel = data.data.AD.advisory.score;
        console.log(countryRiskLevel);
        return data;
    })
}

riskData();


// rest api - general info
let countryLat = '';
let countryLon = '';
function generalInfoData(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        console.log(data);
        countryLat = data[0].latlng[0];
        countryLon = data[0].latlng[1];
        console.log(countryLat);
        area = data[0].area;
        // zoom = area / keyNum;
        // zoom = Math.round(zoom);
        // console.log(zoom);
        genMap(countryLat, countryLon, 4);
    })
}
generalInfoData('Canada')


// currency exchange api
// let currency = 'EUR'
// let amount = '1'
// fetch(`https://api.apilayer.com/exchangerates_data/convert?to=USD&from=${currency}&amount=${amount}&key=wB1ot2onRwSLoura6mVFtXMaSHrE9n3P`)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data){
//         console.log(data);
//     })