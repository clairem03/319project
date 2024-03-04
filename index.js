fetch("./data.json")
    .then(response => response.json())
    .then(myLocations => loadCats(myLocations));

function loadCats(myLocations) {
    var CardMovie = document.getElementById("col");
    var checkboxes = [];
    var cards = [];

    for (var i = 0; i < myLocations.categories.length; i++) {
        let checkbox = "checkbox" + i.toString();
        let card = "card" + i.toString();

        let title = myLocations.categories[i].title;
        let url = myLocations.categories[i].url;
        let subpage = getSubpageUrl(title);

        let AddCardMovie = document.createElement("div");
        AddCardMovie.classList.add("col");
        AddCardMovie.innerHTML = `
<div id=${card} class="card shadow-sm">
    <a href="${subpage}">
        <img src=${url} class="card-img-top" alt="..."></img>
    </a>
    <div class="card-body">
        <h2 class="card-text"> <strong>${title}</strong>
        <div class="d-flex justify-content-center align-items-center">
        </div>
    </div>
</div>
`;

        CardMovie.appendChild(AddCardMovie);
        let cbox = document.getElementById(checkbox);
        checkboxes.push(cbox);
        let ccard = document.getElementById(card);
        cards.push(ccard);
    }

    checkboxes.forEach((checkboxParam, index) => {
        checkboxParam.addEventListener('change', () => {
            if (checkboxParam.checked) {
                cards[index].style.display = 'block';
            } else {
                cards[index].style.display = 'none';
            }
        });
    });
}

function getSubpageUrl(category) {
    // Convert category to lowercase for consistency
    category = category.toLowerCase();
    // Generate subpage URL based on category
    switch (category) {
        case "city":
            return "city.html";
        case "tropical":
            return "tropical.html";
        case "mountain":
            return "mountain.html";
        case "coastal":
            return "coastal.html";
        case "historic":
            return "historic.html";
        case "countryside":
            return "countryside.html";
        
        // Add more cases for other categories if needed
        default:
            // Default to a generic page
            return "index.html";
    }
}
