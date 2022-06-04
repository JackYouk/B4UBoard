// use this js file to create our user interface- append elements to the root function in order to display to the page

// root function - connects our js to html file - append the outside-most element containers to this function
//const root = $('#root');
const root = $('#root');

function fetchData() {
    fetch("https://www.travel-advisory.info/api").then(response => {
        console.log(response);
    });
}

console.log(fetch);


