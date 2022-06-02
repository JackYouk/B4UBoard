// JS file for fetching api data
// to use: create a function that will be called in our UI (user interface) js file





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


// COVID-19 travel restrictions, border control measures, and quarantine requirements.
// fetch('https://requirements-api.sandbox.joinsherpa.com/v2/entry-requirements?citizenship=CA&destination=VN&key={API KEY}')
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data){
//         console.log(data);
//     })


// rest api - general info
function generalInfoData(){
    fetch('https://restcountries.com/v3.1/all')
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        console.log(data);
        return data;
    })
}

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
