// JS file for fetching api data
// to use: create a function that will be called in our UI (user interface) js file


let map = L.map('map');
function genMap(lat, lon, zoom){
    map.setView([lat, lon], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: zoom,
        attribution: '© OpenStreetMap'
    }).addTo(map);
}




function genBorders(country) {
    fetch(`https://nominatim.openstreetmap.org/search?country=
      ${country}&polygon_geojson=1&format=json`)
      .then(function(response) {
          return response.json()
      }).then(function(data) {
          console.log(data);
        L.geoJSON(data[0].geojson, {
          color: 'green',
          weight: 2,
          opacity: 0.6,
          fillOpacity: 0.0
        }).addTo(map);
      });
  }


// rest api - general info
let countryLat = '';
let countryLon = '';
let zoomLevel = 4;
function generalInfoData(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        console.log(data);
        countryLat = data[0].latlng[0];
        countryLon = data[0].latlng[1];
        let area = data[0].area;
        if(area < 250000){
            zoomLevel = 6;
        }else if(area < 500000){
            zoomLevel = 5;
        }else if(area < 2500000){
            zoomLevel = 4;
        }else if(area < 9500000){
            zoomLevel = 3;
        }else{
            zoomLevel = 2;
        }
        genBorders(country);
        genMap(countryLat, countryLon, zoomLevel);
    })
}
generalInfoData('Mexico')


// let map = L.map('map');




// // rest country api - general info
// function generalInfoData(country){
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data){
//         console.log(data);
//         genMap(map, country);
//     })
// }
// generalInfoData('France')


// // risk assesment
// function riskData(){
//     let countryRiskLevel = '';
//     fetch('https://www.travel-advisory.info/api')
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data){
//         console.log(data);
//         countryRiskLevel = data.data.AD.advisory.score;
//         console.log(countryRiskLevel);
//         return data;
//     })
// }

// riskData();

// // currency exchange api
// // let currency = 'EUR'
// // let amount = '1'
// // fetch(`https://api.apilayer.com/exchangerates_data/convert?to=USD&from=${currency}&amount=${amount}&key=wB1ot2onRwSLoura6mVFtXMaSHrE9n3P`)
// //     .then(function (response) {
// //         return response.json();
// //     })
// //     .then(function (data){
// //         console.log(data);
// //     })
