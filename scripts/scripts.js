const count = document.querySelector(".button");
const clickMe = document.getElementsByClassName("click-me-button");

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://potterhead-api.vercel.app/api/houses")
    .then((response) => response.json())
    .then((houses) => {
      console.log(houses); // Check API response in console

      const houseElements = document.querySelectorAll(".houses > div");

      houseElements.forEach((houseElement) => {
        const span = houseElement.querySelector("span"); // Select the <span> inside each div
        if (span) {
          const houseClass = houseElement.classList[0]; // Get the class name (e.g., "gryffindor")
          const houseName = houses.find(
            (house) => house.toLowerCase() === houseClass
          );

          if (houseName) {
            span.textContent = houseName; // Update the span with the house name
          }
        }
      });
    })
    .catch((error) => console.error(error));
});

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".click-me-button");
  const iconContainer = document.querySelector(".icon-container");
  const testingButton = document.getElementsByClassName("testing")[0];

  if (button) {
    button.addEventListener("click", () => {
      // Remove the title
      const title = document.querySelector(".title");
      if (title) title.remove();

      // Hide the "Click me" button
      button.remove();

      // Show the loading icon (wizard hat)
      iconContainer.style.display = "flex"; // Make the icon visible

      // Set a timeout for how long the loading icon should appear (e.g., 3 seconds)
      setTimeout(() => {
        // Hide the loading icon after 3 seconds
        iconContainer.style.display = "none";

        // Show the testing button after the icon disappears
        testingButton.style.display = "inline-block";
      }, 3000); // 3000ms = 3 seconds
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Waits for the entire HTML document to be fully loaded before running the code
  const addButtons = document.querySelectorAll(".add"); // Selects all elements with the class "add" (the plus buttons)
  const subtractButtons = document.querySelectorAll(".subtract"); // Selects all elements with the class "subtract" (the minus buttons)

  addButtons.forEach((button) => {
    // Loops through each "add" button
    button.addEventListener("click", (event) => {
      // Adds an event listener for the 'click' event on each button
      const house = event.target.closest("div"); // Finds the closest ancestor `div` to the clicked button (this will be the house div)
      const pointsDisplay = house.querySelector(".points"); // Finds the child element with the class "points" inside the house div (where the points are displayed)
      let currentPoints = parseInt(pointsDisplay.textContent); // Gets the current points, converting the text to an integer using `parseInt()`
      currentPoints++; // Increments the current points by 1 (adds one point)
      pointsDisplay.textContent = currentPoints; // Updates the points displayed in the "points" element with the new value
    });
  });

  subtractButtons.forEach((button) => {
    // Loops through each "subtract" button
    button.addEventListener("click", (event) => {
      // Adds an event listener for the 'click' event on each button
      const house = event.target.closest("div"); // Finds the closest ancestor `div` to the clicked button (this will be the house div)
      const pointsDisplay = house.querySelector(".points"); // Finds the child element with the class "points" inside the house div (where the points are displayed)
      let currentPoints = parseInt(pointsDisplay.textContent); // Gets the current points, converting the text to an integer using `parseInt()`
      if (currentPoints > 0) {
        // Checks if the current points are greater than 0 (so points don't go negative)
        currentPoints--; // Decreases the current points by 1 (subtracts one point)
        pointsDisplay.textContent = currentPoints; // Updates the points displayed in the "points" element with the new value
      }
    });
  });
});
