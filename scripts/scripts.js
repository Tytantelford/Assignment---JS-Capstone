const count = document.querySelector(".button");
const clickMe = document.getElementsByClassName("click-me-button");

//fetch hogwarts house names
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://potterhead-api.vercel.app/api/houses")
    .then((apiResponse) => apiResponse.json())
    .then((housesArray) => {
      const houseElements = document.querySelectorAll(".houses > div");

      houseElements.forEach((houseElement) => {
        const htmlSpan = houseElement.querySelector("span");
        if (htmlSpan) {
          const individualHouseClass = houseElement.classList[0];
          const houseName = housesArray.find(
            (house) => house.toLowerCase() === individualHouseClass
          ); //houserArray [0]=house array from api. make sure that matches the individualHouseClass which is from the html
          if (houseName) {
            htmlSpan.textContent = houseName;
          } // textContent it to html
        }
      });
    });
});

//remove button after being clicked, loading icon appear
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".click-me-button");
  const iconContainer = document.querySelector(".icon-container");
  const testingButton = document.getElementsByClassName("testing")[0];

  if (button) {
    button.addEventListener("click", () => {
      const title = document.querySelector(".title");

      if (title) title.remove();
      button.remove();

      iconContainer.style.display = "flex";

      setTimeout(() => {
        iconContainer.style.display = "none";
        testingButton.style.display = "block";
      }, 2000);
    });
  }
});

// add and subtract buttons & weight
document.addEventListener("DOMContentLoaded", () => {
  const houses = ["gryffindor", "ravenclaw", "hufflepuff", "slytherin"];

  houses.forEach((house) => {
    const addButton = document.querySelector(`.${house} .add`);
    const subtractButton = document.querySelector(`.${house} .subtract`);
    const weightElementHTML = document.querySelector(`.${house} .weight`);

    addButton.addEventListener("click", () => {
      let currentWeight = parseInt(weightElementHTML.textContent);
      weightElementHTML.textContent = currentWeight + 1;
    });

    subtractButton.addEventListener("click", () => {
      let currentWeight = parseInt(weightElementHTML.textContent);
      if (currentWeight > 0) {
        weightElementHTML.textContent = currentWeight - 1;
      }
    });
  });

  const testingButton = document.getElementsByClassName("testing")[0];
  const randomHouseDisplay = document.getElementsByClassName("random-house")[0];

  if (testingButton) {
    testingButton.addEventListener("click", () => {
      const houseAndWeights = houses.map((house) => {
        // house = [0]current item in array from .map
        return {
          house,
          weight: parseInt(
            document.querySelector(`.${house} .weight`).textContent
          ),
        };
      });

      const nonZeroWeightHouses = houseAndWeights.filter(
        // .filter Loop through array, only keep items that meet condition of function
        (houseData) => houseData.weight > 0
      );
      const totalWeight = nonZeroWeightHouses.reduce(
        // .reduce combine all elements in array to single value. adding accumulatedWeight & houseData.weight
        (accumulatedWeight, houseData) => accumulatedWeight + houseData.weight,
        0
      );
      const randomNum = Math.floor(Math.random() * totalWeight);

      let weightSum = 0;
      let selectedHouse = null;
      for (let house of nonZeroWeightHouses) {
        weightSum += house.weight;
        if (randomNum < weightSum) {
          selectedHouse = house.house;
          break;
        }
      }
      // house name appears
      randomHouseDisplay.textContent = `${selectedHouse}`;
      randomHouseDisplay.style.fontSize = "30px";
      randomHouseDisplay.style.fontFamily = "Harry Potter, sans-serif";
      randomHouseDisplay.style.color = "#ecb939";
      document.querySelectorAll(".houses > div span").forEach((span) => {
        span.style.textDecoration = "none";
      });

      document.querySelectorAll(".houses > div span").forEach((span) => {
        span.style.backgroundColor = "";
      });
      const selectedHouseElement = document.querySelector(
        `.${selectedHouse} span`
      );
      if (selectedHouseElement) {
        selectedHouseElement.style.backgroundColor = "#d3a625";
      }
    });
  }
});
