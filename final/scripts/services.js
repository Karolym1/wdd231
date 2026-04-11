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
      <p class="category">${service.category}</p>
      <p class="price">${service.price}</p>
      <p>${service.description}</p>
      <div class="card-actions">
        <button class="details-btn" type="button">Learn More</button>
        <a href="contact.html" class="contact-btn">Contact</a>
      </div>
    `;

    const button = card.querySelector(".details-btn");
    button.addEventListener("click", () => {
      showModal(service.title, service.details);
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

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    filterServices(category);
  });
});

function showModal(title, details) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <h3>${title}</h3>
      <p>${details}</p>
      <button class="close-modal" type="button">Close</button>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".close-modal").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });
}

getServices();
