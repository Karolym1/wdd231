const servicesContainer = document.querySelector("#services-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const modal = document.querySelector("#service-modal");
const modalContent = document.querySelector("#modal-content");
const closeModalButton = document.querySelector("#close-modal");

let services = [];

async function getServices() {
  try {
    const response = await fetch("data/services.json");

    if (!response.ok) {
      throw new Error("Could not load services data.");
    }

    services = await response.json();

    const savedCategory = localStorage.getItem("selectedCategory") || "All";
    displayServices(savedCategory);
    highlightActiveButton(savedCategory);
  } catch (error) {
    servicesContainer.innerHTML = `<p>${error.message}</p>`;
  }
}

function displayServices(category) {
  const filteredServices =
    category === "All"
      ? services
      : services.filter((service) => service.category === category);

  servicesContainer.innerHTML = filteredServices
    .map(
      (service) => `
        <article class="service-card">
          <h3>${service.title}</h3>
          <p><strong>Category:</strong> ${service.category}</p>
          <p><strong>Price:</strong> ${service.price}</p>
          <p>${service.description}</p>
          <button class="details-btn" data-id="${service.id}">Learn More</button>
        </article>
      `,
    )
    .join("");

  const detailButtons = document.querySelectorAll(".details-btn");

  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const serviceId = Number(button.dataset.id);
      const selectedService = services.find(
        (service) => service.id === serviceId,
      );
      showModal(selectedService);
    });
  });
}

function showModal(service) {
  modalContent.innerHTML = `
    <h3>${service.title}</h3>
    <p><strong>Category:</strong> ${service.category}</p>
    <p><strong>Price:</strong> ${service.price}</p>
    <p><strong>Description:</strong> ${service.description}</p>
    <p><strong>Details:</strong> ${service.details}</p>
  `;

  modal.showModal();
}

function highlightActiveButton(category) {
  filterButtons.forEach((button) => {
    if (button.dataset.category === category) {
      button.classList.add("active-filter");
    } else {
      button.classList.remove("active-filter");
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    localStorage.setItem("selectedCategory", category);
    displayServices(category);
    highlightActiveButton(category);
  });
});

closeModalButton.addEventListener("click", () => {
  modal.close();
});

getServices();
