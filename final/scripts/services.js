const container = document.querySelector("#services-container");
const filterButtons = document.querySelectorAll(".filter-btn");

let services = [];

async function getServices() {
  try {
    const response = await fetch("./data/services.json");

    if (!response.ok) {
      throw new Error("Failed to load services data");
    }

    services = await response.json();
    displayServices(services);
  } catch (error) {
    container.innerHTML = `<p>Error loading services.</p>`;
    console.error(error);
  }
}

function displayServices(serviceList) {
  container.innerHTML = "";

  serviceList.forEach((service) => {
    const card = document.createElement("article");
    card.classList.add("service-card");
    card.dataset.category = service.category.toLowerCase();

    card.innerHTML = `
      <h3>${service.title}</h3>
      <p><strong>Category:</strong> ${service.category}</p>
      <p><strong>Price:</strong> ${service.price}</p>
      <p>${service.description}</p>
      <button class="details-btn" type="button">Learn More</button>
    `;

    const button = card.querySelector(".details-btn");
    button.addEventListener("click", () => {
      alert(service.details);
    });

    container.appendChild(card);
  });
}

function filterServices(category) {
  const cards = document.querySelectorAll(".service-card");

  cards.forEach((card) => {
    const cardCategory = card.dataset.category;

    if (category === "all" || cardCategory === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    filterServices(category);
  });
});

getServices();
