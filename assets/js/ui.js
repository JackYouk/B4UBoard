// use this js file to create our user interface- append elements to the root function in order to display to the page

// Data ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var countryInfo = {};
let map;

function genMap(lat, lon, zoom){
    let map = L.map('map');
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
        // genMap(countryLat, countryLon, zoomLevel);
        parseCountryInfo(data[0]);
        // getRiskData(data[0].cca2);        
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
        let countryList = ['United States of America', 'Brazil', 'Australia', 'Mexico', 'Republic of India'];
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

    genMap(0, 0, 1);  
}

// genLandingContent();

// generates country content (with smaller map, flag, and facts)
function genCountryContent(country){

}

// run it
genLandingContent();



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
    
function displayBackground(imgSRC) {

    let bgHeader = $('<div class="row ">');
    let bgContainer = $('<div class="col-md-12 d-flex justify-content-center mt-5">').css({'background-image':`url(${imgSRC})`,'background-size':'cover','width': '1200px','height': '500px','padding':'0'});
    
    let textContainer = $('<div class="col-md-12 d-flex justify-content-center">').css({'background-color':'rgba(0,0,0,0.4)', 'width': '100%','height': '100%'});
   
    displayDummyData(textContainer);

    bgContainer.append(textContainer);
    bgHeader.append(bgContainer);
    root.append(bgHeader);        
}



dropdownMenuUl.on('click', 'li', function(){
    let currentCountry = $(this).text();
    console.log(currentCountry, "000");
    generalInfoData(currentCountry).then(capital => {
        console.log(capital, "capital");
        getBGImg(capital).then(srcImg => {
            console.log(srcImg, "yes 1");
            displayBackground (srcImg);
        });
    });
})

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