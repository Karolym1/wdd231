import { places } from "../data/discover.mjs";

const visitMessage = document.querySelector("#visit-message");
const cardsContainer = document.querySelector("#discover-cards");

// ===== VISIT MESSAGE =====
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysBetween = Math.floor((now - Number(lastVisit)) / msPerDay);

  if (daysBetween < 1) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else if (daysBetween === 1) {
    visitMessage.textContent = "You last visited 1 day ago.";
  } else {
    visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);

// ===== DISPLAY CARDS =====
function displayPlaces(placeList) {
  placeList.forEach((place, index) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");
    card.style.gridArea = `card${index + 1}`;

    const title = document.createElement("h2");
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const address = document.createElement("address");
    const description = document.createElement("p");
    const button = document.createElement("button");

    title.textContent = place.name;

    image.src = place.image;
    image.alt = place.name;
    image.loading = "lazy";
    image.width = 300;
    image.height = 200;

    address.textContent = place.address;
    description.textContent = place.description;
    button.textContent = "Learn More";

    figure.appendChild(image);

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    cardsContainer.appendChild(card);
  });
}

displayPlaces(places);
