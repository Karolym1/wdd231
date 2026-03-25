document.addEventListener("DOMContentLoaded", () => {
  const timestampField = document.querySelector("#timestamp");
  const menuButton = document.querySelector("#menu-button");
  const siteNav = document.querySelector("#site-nav");
  const currentYear = document.querySelector("#currentyear");
  const lastModified = document.querySelector("#lastModified");

  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  if (menuButton && siteNav) {
    menuButton.addEventListener("click", () => {
      siteNav.classList.toggle("open");
      menuButton.classList.toggle("open");
    });
  }

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
  }

  const modalButtons = document.querySelectorAll("[data-modal]");
  const closeButtons = document.querySelectorAll(".close-modal");

  modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      const modal = document.querySelector(`#${modalId}`);

      if (modal) {
        modal.showModal();
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("dialog");

      if (modal) {
        modal.close();
      }
    });
  });

  document.querySelectorAll("dialog").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      const dialogDimensions = modal.getBoundingClientRect();

      const clickedInDialog =
        event.clientX >= dialogDimensions.left &&
        event.clientX <= dialogDimensions.right &&
        event.clientY >= dialogDimensions.top &&
        event.clientY <= dialogDimensions.bottom;

      if (!clickedInDialog) {
        modal.close();
      }
    });
  });
});
