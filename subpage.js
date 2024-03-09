// Fetch and load JSON data
fetch("./subpage.json")
  .then(response => response.json())
  .then(data => {
    loadCats(data);
  })
  .catch(error => console.error('Error fetching JSON:', error));

// Function to load and display data
function loadCats(data) {
  const subContainer = document.getElementById("sub");

  // Iterate through the JSON data and create HTML elements
  data.mountain.forEach(item => {
    const listItem = document.createElement("div");
    listItem.classList.add("sub-item");
    listItem.innerHTML = `
      <ul>
        <li><h3>${item.name}</h3></li>
        <li><h3>${item.safety}</h3></li>
        <li><h3>${item.cost}</h3></li>
        <li><h3>${item.rating}</h3></li>
        
      </ul>
    `;
    subContainer.appendChild(listItem);
  });
}

