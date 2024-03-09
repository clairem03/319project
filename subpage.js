fetch("./subpage.json")
    .then(response => response.json())
    .then(myLocations => loadCats(myLocations));

//we need a function that gets what supbage it is
//so it can call myLocations.(correct subpage)
//so it grabs the right json data
//something like let subpage = (correct subpage)
//then we can call myLocations.subpage[i]

//also i have no idea why only London works 

function loadCats(myLocations) {
    let CardMovie = document.getElementById("sub");
    let checkboxes = [];
    let cards = [];

    //get the id of the body
    let page = document.body.id;
    //get the subset of the JSON data we want
    let jsonData = myLocations[page];

    for (var i = 0; i < jsonData.length; i++) {
        let checkbox = "checkbox" + i.toString();
        let card = "card" + i.toString();

        let title = jsonData[i].name;
        let url = jsonData[i].src;
       
        let safety = jsonData[i].safety;

        let AddCardMovie = document.createElement("div");
        AddCardMovie.classList.add("sub");

        // i tried to copy the html to have it 
        // create a bunch of them but it isn't working
        AddCardMovie.innerHTML = `
        <ul>
          <li id="pic" ><h3>${title}</h3><img src="${src}" width="100%"></li>
          <li><h3>${safety}</h3></li>
          <li><h3>${cost}</h3></li>
          <li><h3>${rating}</h3></li>
        </ul>`;

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

