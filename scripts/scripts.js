const count = document.querySelector(".button");
const clickMe = document.getElementsByClassName("click-me-button");

////GET THE HOUSE NAMES
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://potterhead-api.vercel.app/api/houses")
    .then((response) => response.json())
    .then((houses) => {
      const houseElements = document.querySelectorAll(".houses > div");

      houseElements.forEach((houseElement) => {
        const span = houseElement.querySelector("span");
        if (span) {
          const houseClass = houseElement.classList[0];
          const houseName = houses.find(
            (house) => house.toLowerCase() === houseClass
          );

          if (houseName) {
            span.textContent = houseName;
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

document.addEventListener("DOMContentLoaded", () => {
  const houses = ["gryffindor", "ravenclaw", "hufflepuff", "slytherin"];

  houses.forEach((house) => {
    const addButton = document.querySelector(`.${house} .add`);
    const subtractButton = document.querySelector(`.${house} .subtract`);
    const weightElement = document.querySelector(`.${house} .weight`);

    addButton.addEventListener("click", () => {
      let currentWeight = parseInt(weightElement.textContent);
      weightElement.textContent = currentWeight + 1;
    });

    subtractButton.addEventListener("click", () => {
      let currentWeight = parseInt(weightElement.textContent);
      if (currentWeight > 0) {
        weightElement.textContent = currentWeight - 1;
      }
    });
  });

  const testingButton = document.getElementsByClassName("testing")[0];
  const randomHouseDisplay = document.getElementsByClassName("random-house")[0];

  if (testingButton) {
    testingButton.addEventListener("click", () => {
      const houseWeights = houses.map((house) => {
        return {
          house,
          weight: parseInt(
            document.querySelector(`.${house} .weight`).textContent
          ),
        };
      });

      const validHouses = houseWeights.filter((h) => h.weight > 0);
      const totalWeight = validHouses.reduce((acc, h) => acc + h.weight, 0);
      const randomNum = Math.floor(Math.random() * totalWeight);

      let weightSum = 0;
      let selectedHouse = null;
      for (let house of validHouses) {
        weightSum += house.weight;
        if (randomNum < weightSum) {
          selectedHouse = house.house;
          break;
        }
      }

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
