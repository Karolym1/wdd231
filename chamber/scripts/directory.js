document.addEventListener("DOMContentLoaded", async () => {
  const membersURL = "./data/members.json";
  const container = document.querySelector("#members");
  const gridButton = document.querySelector("#grid-view");
  const listButton = document.querySelector("#list-view");
  const menuButton = document.querySelector("#menu-button");
  const navigation = document.querySelector("#site-nav");
  const yearSpan = document.querySelector("#currentyear");
  const lastModified = document.querySelector("#lastModified");

  async function getMembers() {
    try {
      const response = await fetch(membersURL);

      if (!response.ok) {
        throw new Error(`Could not load members data: ${response.status}`);
      }

      const data = await response.json();
      const membersArray = Array.isArray(data) ? data : data.members;

      if (!membersArray || !Array.isArray(membersArray)) {
        throw new Error("members.json format is invalid.");
      }

      displayMembers(membersArray);
    } catch (error) {
      console.error("Error loading members:", error);
      if (container) {
        container.innerHTML = "<p>Unable to load member data right now.</p>";
      }
    }
  }

  function displayMembers(members) {
    if (!container) return;

    container.innerHTML = "";
    container.classList.add("grid");
    container.classList.remove("list");

    members.forEach((member) => {
      const card = document.createElement("section");
      card.classList.add("member-card");

      const name = document.createElement("h2");
      name.textContent = member.name || "Business Name";

      const logo = document.createElement("img");
      logo.src = member.image ? `images/${member.image}` : "images/logo.webp";
      logo.alt = member.name ? `${member.name} logo` : "Business logo";
      logo.loading = "lazy";
      logo.width = 220;
      logo.height = 140;

      const address = document.createElement("p");
      address.textContent = member.address || "No address listed";

      const phone = document.createElement("p");
      phone.textContent = member.phone || "No phone listed";

      const website = document.createElement("a");
      website.href = member.website || "#";
      website.textContent = member.website || "No website listed";
      website.target = "_blank";
      website.rel = "noopener noreferrer";

      const membership = document.createElement("p");
      membership.textContent = `Membership Level: ${member.membership || "N/A"}`;

      card.appendChild(name);
      card.appendChild(logo);
      card.appendChild(address);
      card.appendChild(phone);
      card.appendChild(website);
      card.appendChild(membership);

      container.appendChild(card);
    });
  }

  if (gridButton && container) {
    gridButton.onclick = () => {
      container.classList.add("grid");
      container.classList.remove("list");
    };
  }

  if (listButton && container) {
    listButton.onclick = () => {
      container.classList.add("list");
      container.classList.remove("grid");
    };
  }

  if (menuButton && navigation) {
    menuButton.onclick = () => {
      navigation.classList.toggle("open");

      const isOpen = navigation.classList.contains("open");
      menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuButton.textContent = isOpen ? "✖" : "☰";
    };
  }

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
  }

  await getMembers();
});
