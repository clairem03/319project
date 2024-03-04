fetch("./data.json")
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies));


function loadMovies(myMovies) {
    // Find the element “col” in HTML
    var CardMovie = document.getElementById("col");

    var checkboxes = [];
    var cards = [];

    // Read every movie from the array
    for (var i = 0; i < myMovies.movies.length-1; i++) {

        let checkbox = "checkbox" + i.toString();
        let card = "card" + i.toString();

        let title = myMovies.movies[i].title;
        let year = myMovies.movies[i].year;
        let url = myMovies.movies[i].url;

        // create a new HTML div division
        let AddCardMovie = document.createElement("div");
        // add class = “col” to new division for Bootstrap
        AddCardMovie.classList.add("col");
        // create Bootstrap card
        AddCardMovie.innerHTML = `
        
        
<div id=${card} class="card shadow-sm">
    <img src=${url} class="card-img-top" alt="..."></img>
    <div class="card-body">
        <h2 class="card-text"> <strong>${title}</strong>
        <div class="d-flex justify-content-center align-items-center">
            
        </div>
        
    </div>
    
</div>

`;
        // append new division
        CardMovie.appendChild(AddCardMovie);
        let cbox = document.getElementById(checkbox);
        checkboxes.push(cbox);
        let ccard = document.getElementById(card);
        cards.push(ccard);

        console.log(checkbox);
        console.log(card);
    } // end of for
    console.log(checkboxes);
    console.log(cards);
    checkboxes.forEach((checkboxParam, index) => {
        console.log(index);
        checkboxParam.addEventListener('change', () => {
            if (checkboxParam.checked) {
                cards[index].style.display = 'block'; // Show the card
            } else {
                cards[index].style.display = 'none'; // Hide the card
            }
        });
    });
}