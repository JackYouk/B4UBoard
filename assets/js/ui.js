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
    fetch(`https://restcountries.com/v3.1/name/${country}`)
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






// UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// root function - connects our js to html file - append the outside-most element containers to this function ---------------
//const root = $('#root');
const root = $('#root');


// Logo Header ------------------------------------------------------------------------------------------
let logoHeader = $('<header class="row">');
let imgContainer = $('<div class="col-md-12">');
    let logoImg = $('<img src="./assets/image/Logo.png" ID="logo"  alt="Project Logo"/>')
        .css('width', '100px');
    imgContainer.append(logoImg);
logoHeader.append(imgContainer);
root.append(logoHeader);

// Inputs -----------------------------------------------------------------------------------------------
let inputContainer = $('<div class="row">');
    // dropdown
    let dropdownContainer = $('<div class="col-md-6">');
    let dropdownBtnGrp = $('<div class="btn-group">');
        let dropdownBtn = $('<button class="btn btn-primary btn-lg dropdown-toggle" type="button" data-mdb-toggle="dropdown" aria-expanded="false">')
            .text('Select a Country');
        // add all countries to this array ---> List is here: https://gist.github.com/incredimike/1469814
        let countryList = ['US', 'Brazil', 'Etc'];
        let dropdownMenuUl = $('<ul class="dropdown-menu">')
            // for loop to create list items (all countries)
            for(let i = 0; i < countryList.length; i++){
                let countryLi = $('<li>');
                let countryTag = $('<a class="dropdown-item" href="#">')
                    .text(countryList[i]);
                countryLi.append(countryTag);
                dropdownMenuUl.append(countryLi);
            }
        dropdownBtnGrp.append(dropdownBtn);
        dropdownBtnGrp.append(dropdownMenuUl);
    dropdownContainer.append(dropdownBtnGrp);
    inputContainer.append(dropdownContainer);

    // searchbar
    let searchbarContainer = $('<div class="col-md-6">');
    let searchGrp = $('<div class="input-group">');
        let searchInput = $('<input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />');
        let searchBtn = $('<button type="button" class="btn btn-outline-primary">')
            .text('Search');
        searchGrp.append(searchInput);
        searchGrp.append(searchBtn);
    searchbarContainer.append(searchGrp);
    inputContainer.append(searchbarContainer);

root.append(inputContainer);

// Content ---------------------------------------------------------------------------------------------

// generates landing page content (big map)
function genLandingContent(){
    let landingContainer = $('<div class="row d-flex justify-content-center">');
        let landingMap = $('<div class="col-12 d-flex justify-content-center m-5" id="map">')
            .css({"height":"500px","width":"1200px"});
        landingContainer.append(landingMap);
    root.append(landingContainer);
    map = L.map('map');
    genMap(0, 0, 1);  
}

// genLandingContent();

// generates country content (with smaller map, flag, and facts)
function genCountryContent(country){

}

// run it
genLandingContent();
    

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

generalInfoData('Mexico');