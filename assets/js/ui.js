// use this js file to create our user interface- append elements to the root function in order to display to the page

// Data ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


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

    genMap(0, 0, 1);  
}

// genLandingContent();

// generates country content (with smaller map, flag, and facts)
function genCountryContent(country){

}

// run it
genLandingContent();
    
     

