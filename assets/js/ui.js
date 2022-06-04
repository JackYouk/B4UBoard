// use this js file to create our user interface- append elements to the root function in order to display to the page

// root function - connects our js to html file - append the outside-most element containers to this function ---------------
//const root = $('#root');
const root = $('#root');


// Logo Header ------------------------------------------------------------------------------------------
let logoHeader = $('<header class="row">');
let imgContainer = $('<div class="col-md-12">');
    let logoImg = $('<img src="./assets/image/Logo.png" ID="logo"  alt="Project Logo"/>');
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
    
}

// genLandingContent();

// generates country content (with smaller map, flag, and facts)
function genCountryContent(country){

}

        
    


