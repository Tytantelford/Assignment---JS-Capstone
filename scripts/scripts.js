// fetch("https://potterhead-api.vercel.app/api/houses")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => console.error("Error fetching houses:", error));

// Fetch the houses data from the API
////////////////
// Fetch the house data
fetch("https://potterhead-api.vercel.app/api/houses")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // This will print the data in your console

    // Get the container where you want to display the house names
    const housesContainer = document.getElementById("houses-container");

    // Loop through the data and create HTML for each house
    data.forEach((house) => {
      const houseElement = document.createElement("div");
      houseElement.classList.add("house");

      houseElement.innerHTML = `
        <h3>${house.name}</h3>
      `;

      // Append the house element to the container
      housesContainer.appendChild(houseElement);
    });
  })
  .catch((error) => console.error("Error fetching houses:", error));

//////////////////
// function loadingIcon() {
//   console.log("clicked");
//   const title = document.querySelector(".title");
//   const buttonContainer = document.querySelector(".button");
//   const iconContainer = document.querySelector(".icon-container");
// }

// title.style.display = "none";
// buttonContainer.style.display = "none";

// iconContainer.style.display = "flex";
