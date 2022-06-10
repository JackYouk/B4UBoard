// use this js file to create our user interface- append elements to the root function in order to display to the page

// Data ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let map;
var countryInfo = {};
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
let countryLat = 0;
let countryLon = 0;
let zoomLevel = 1;
function generalInfoData(country){
    return fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {        
        return response.json();
    })
    .then(function (data){
        console.log(data);
        countryLat = data[0].latlng[0];
        countryLon = data[0].latlng[1];
        let area = data[0].area;
        if(area < 99000){
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
        parseCountryInfo(data[0]);
        getRiskData(data[0].cca2);
        return data[0].capital[0];
    })
}

function parseCountryInfo(country_data) {
    countryInfo['flag'] = country_data.flags.png;
    countryInfo['coat_of_arms'] = country_data.coatOfArms.png;
    countryInfo['currencies'] = country_data.currencies;
    countryInfo['languages'] = country_data.languages;
    countryInfo['capital'] = country_data.capital[0];
    countryInfo['population'] = country_data.population;
    countryInfo['continents'] = country_data.continents;
    countryInfo['area'] = country_data.area;
}

// risk assesment
function getRiskData(country_code){
    let countryRiskLevel = '';
    fetch(`https://www.travel-advisory.info/api?countrycode=${country_code}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        countryInfo['risk_score'] = data.data[country_code].advisory.score;
        displayCountryInfo(countryInfo);
    })
}

function getBGImg(city){
    var url = "https://en.wikipedia.org/w/api.php";     
    var params = {
        action: "query",
        prop: "pageimages",
        titles: city,
        format: "json",
        piprop: "original"
    };
    
    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    
    return fetch(url)
        .then(function(response){return response.json();})  // conversion to json/dict  
        .then(function(response) {
            // console.log("yes");
            console.log(response, "resp");
            var pages = response.query.pages;
            
            for (var page in pages) {         
                console.log("1",pages[page].original.source );    
                return pages[page].original.source;  
            }       
        })
}

// UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// root function - connects our js to html file - append the outside-most element containers to this function ---------------
//const root = $('#root');
const root = $('#root');


// Logo Header ------------------------------------------------------------------------------------------
let logoHeader = $('<header class="row">');
let imgContainer = $('<div class="col-12">');
    let logoImg = $('<img src="./assets/image/Logo.png" ID="logo"  alt="Project Logo"/>')
        .css('width', '100px');
    imgContainer.append(logoImg);
logoHeader.append(imgContainer);
root.append(logoHeader);

// Inputs -----------------------------------------------------------------------------------------------
let inputContainer = $('<div class="row d-flex justify-content-around align-items-center">');
    
// add all countries to this array ---> List is here: https://gist.github.com/incredimike/1469814
let countryList = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Åland Islands"
];

    // searchbar
    let searchbarContainer = $('<div class="col-10 col-lg-4 d-flex m-3">');
    let searchGrp = $('<div class="input-group">');
        let searchInput = $('<input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />')
            .autocomplete({
                source: countryList

            })
            .addClass('searchInput');
        let searchBtn = $('<button type="button" class="btn btn-outline-primary">')
            .addClass('searchButton')
            .text('Search');
        searchGrp.append(searchInput);
        searchGrp.append(searchBtn);
    searchbarContainer.append(searchGrp);
    inputContainer.append(searchbarContainer);

    // dropdown
    let dropdownContainer = $('<div class="col-10 col-lg-2 d-flex">');
    let dropdownBtnGrp = $('<div class="btn-group">');
        let dropdownBtn = $('<button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-mdb-toggle="dropdown" aria-expanded="false">')
            .text('Select a Country');
        let dropdownMenuUl = $('<ul class="dropdown-menu force-scroll">')
            // for loop to create list items (all countries)
            for(let i = 0; i < countryList.length; i++){
                let countryLi = $('<li class="dropdown-item">')
                    .text(countryList[i]);
                dropdownMenuUl.append(countryLi);
            }
        dropdownBtnGrp.append(dropdownBtn);
        dropdownBtnGrp.append(dropdownMenuUl);
    dropdownContainer.append(dropdownBtnGrp);
    inputContainer.append(dropdownContainer);

root.append(inputContainer);

// Content ---------------------------------------------------------------------------------------------
// content container
const contentContainer = $('<div class="row d-flex justify-content-center">');

// EMPTY CONTENT ----------------------------------
function emptyContent(){
    contentContainer.empty();
}

// Event listeners ------------------------------------------------------------------------------
$('.searchButton').on('click', function(){
    // emptyContent();
    let currentCountry = $('.searchInput').val();
    console.log(currentCountry);
    genCountryContent(currentCountry);
})

dropdownMenuUl.on('click', 'li', function(){
    // emptyContent();
    let currentCountry = $(this).text();
    console.log(currentCountry);
    genCountryContent(currentCountry);
})

// generates landing page content (big map)
function genLandingContent(){
    let landingMap = $('<div class="col-12 d-flex justify-content-center m-5" id="map">')
        .css({"height":"500px","width":"1200px"});
    contentContainer.append(landingMap);
    root.append(contentContainer);
    map = L.map('map');
    genMap(0, 0, 1);  
}


// generates country content (with smaller map, flag, and facts)
function genCountryContent(currentCountry){
    const countryInfoContainer = $('<div class="row">');
    generalInfoData(currentCountry).then(capital => {
        console.log(capital, "capital");
        getBGImg(capital).then(srcImg => {
            console.log(srcImg, "yes 1");
            displayBackground (srcImg, countryInfoContainer);
        });
    });

    
    // let contentMap = $('<div class="col-12 d-flex justify-content-center m-5" id="map">')
    //         .css({"height":"500px","width":"1200px"});
    // contentContainer.append(contentMap);
    // root.append(contentContainer);
    // map = L.map('map');
    
    generalInfoData(currentCountry);
}

// run it -------------------------------------------
genLandingContent();

    
function displayBackground(imgSRC, countryInfoContainer) {
    let bgContainer = $('<div class="col-md-12 d-flex justify-content-center mt-5">').css({'background-image':`url(${imgSRC})`,'background-size':'cover','width': '1200px','height': '500px','padding':'0'});
    
    let textContainer = $('<div class="col-md-12 d-flex justify-content-center">').css({'background-color':'rgba(0,0,0,0.4)', 'width': '100%','height': '100%'});
   
    displayDummyData(textContainer);

    bgContainer.append(textContainer);
    countryInfoContainer.append(bgContainer);
    root.append(countryInfoContainer);        
}



function displayDummyData(textContainer) {
    var infoContainer = $('<section>');
    infoContainer.appendTo($(textContainer));

    var content = "<table id='dummy-table'>"
    for(i=0; i<5; i++){
        content += '<tr><td>' + 'Capital' + '</td><td>'+ countryInfo['capital'] + '</td></tr>';
    }
    content += "</table>"

    infoContainer.append(content);
}
    

function displayCountryInfo(countryInfo) {
    var infoContainer = $('<section>');
    infoContainer.appendTo($('#root'));

    var infoTable = $('<table>');
    infoTable.appendTo(infoContainer);

    // countryInfo['flag'] = country_data.flags.png;
    var flagRow = $('<tr>');
    flagRow.appendTo(infoTable);
    var flagTitle = $('<td>');
    flagTitle.text('Country Flag: ');
    flagTitle.appendTo(flagRow);
    var flagImageCol = $('<td>');
    flagImageCol.appendTo(flagRow);
    var flagImage = $('<img>');
    flagImage.attr('src', countryInfo['flag']);
    flagImage.appendTo(flagImageCol);


    // countryInfo['coat_of_arms'] = country_data.coatOfArms.png;
    var coatOfAarmsRow = $('<tr>');
    coatOfAarmsRow.appendTo(infoTable);
    var coatOfAarmsTitle = $('<td>');
    coatOfAarmsTitle.text('Coat Of Arms: ');
    coatOfAarmsTitle.appendTo(coatOfAarmsRow);
    var coatOfArmsImageCol = $('<td>');
    coatOfArmsImageCol.appendTo(coatOfAarmsRow);
    var coatOfAarmsImage = $('<img>');
    coatOfAarmsImage.attr('src' , countryInfo['coat_of_arms']);
    coatOfAarmsImage.appendTo(coatOfArmsImageCol);
    
    // countryInfo['currencies'] = country_data.currencies;
    var currenciesRow = $('<tr>');
    currenciesRow.appendTo(infoTable);
    var currenciesTitle = $('<td>');
    currenciesTitle.text('Currencies: ');
    currenciesTitle.appendTo(currenciesRow);
    var currenciesValue = $('<td>');
    currenciesValue.appendTo(currenciesRow);
    var currencyString = '';
    for (const key in countryInfo['currencies']) {
        if(currencyString !== '') {
            currencyString += ', '
        }
        currencyString += countryInfo['currencies'][key]['name'];
    }
    currenciesValue.text(currencyString);

    // countryInfo['languages'] = country_data.languages;
    var languagesRow = $('<tr>');
    languagesRow.appendTo(infoTable);
    var languagesTitle = $('<td>');
    languagesTitle.text('Languages: ');
    languagesTitle.appendTo(languagesRow);
    var languagesValue = $('<td>');
    languagesValue.appendTo(languagesRow);
    var languageString = '';
    for (const key in countryInfo['languages']) {
        if(languageString !== '') {
            languageString += ', '
        }
        languageString += countryInfo['languages'][key];
    }
    languagesValue.text(languageString);

    // countryInfo['capital'] = country_data.capital[0];

    var capitalRow = $('<tr>');
    capitalRow.appendTo(infoTable);
    var capitalTitle = $('<td>');
    capitalTitle.text('Capital: ');
    capitalTitle.appendTo(capitalRow);
    var capitalValue = $('<td>');
    capitalValue.appendTo(capitalRow);
    capitalValue.text(countryInfo['capital']);

    // countryInfo['population'] = country_data.population;
    var populationRow = $('<tr>');
    populationRow.appendTo(infoTable);
    var populationTitle = $('<td>');
    populationTitle.text('Capital: ');
    populationTitle.appendTo(populationRow);
    var populationValue = $('<td>');
    populationValue.appendTo(populationRow);
    populationValue.text(countryInfo['population']);

    // countryInfo['continents'] = country_data.continents;
    var continentsRow = $('<tr>');
    continentsRow.appendTo(infoTable);
    var continentTitle = $('<td>');
    continentTitle.text('Continents: ');
    continentTitle.appendTo(continentsRow);
    var continentValue = $('<td>');
    continentValue.appendTo(continentsRow);
    var continentString = '';
    for (const continent of countryInfo['continents']) {
        if(continentString !== '') {
            continentString += ', '
        }
        continentString += continent;
    }
    continentValue.text(continentString);

    // countryInfo['area'] = country_data.area;
    var areaRow = $('<tr>');
    areaRow.appendTo(infoTable);
    var areaTitle = $('<td>');
    areaTitle.text('Area: ');
    areaTitle.appendTo(areaRow);
    var areaValue = $('<td>');
    areaValue.appendTo(areaRow);
    areaValue.text(countryInfo['area']);

    //countryInfo['risk_score'] = data.data[country_code].advisory.score;
    var riskRow = $('<tr>');
    riskRow.appendTo(infoTable);
    var riskTitle = $('<td>');
    riskTitle.text('Risk Score: ');
    riskTitle.appendTo(riskRow);
    var riskValue = $('<td>');
    riskValue.appendTo(riskRow);
    riskValue.text(countryInfo['risk_score']);
}

// generalInfoData('Mexico');