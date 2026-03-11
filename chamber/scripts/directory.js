const membersURL = "./data/members.json";
const container = document.querySelector("#members");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

async function getMembers() {
  try {
    const response = await fetch(membersURL);

    if (!response.ok) {
      throw new Error(`Could not load members data: ${response.status}`);
    }

    const data = await response.json();
    console.log("Loaded JSON data:", data);

    const membersArray = Array.isArray(data) ? data : data.members;

    if (!membersArray || !Array.isArray(membersArray)) {
      throw new Error(
        "members.json format is wrong. Expected an array or an object with a members array.",
      );
    }

    displayMembers(membersArray);
  } catch (error) {
    console.error("Error loading members:", error);
    container.innerHTML = `<p>Unable to load member data right now.</p>`;
  }
}

function displayMembers(members) {
  container.innerHTML = "";
  container.classList.add("grid-view");

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    const name = document.createElement("h2");
    name.textContent = member.name || "Business Name";

    const logo = document.createElement("img");
    logo.src = member.image ? `images/${member.image}` : "images/logo.png";
    logo.alt = member.name ? `${member.name} logo` : "Business logo";
    logo.loading = "lazy";
    logo.width = 200;
    logo.height = 200;

    const address = document.createElement("p");
    address.textContent = member.address || "No address listed";

    const phone = document.createElement("p");
    phone.textContent = member.phone || "No phone listed";

    const website = document.createElement("a");
    website.href = member.website || "#";
    website.textContent = member.website || "No website listed";
    website.target = "_blank";

    const membership = document.createElement("p");
    membership.textContent = `Membership Level: ${member.membership || member.membershipLevel || "N/A"}`;

    card.appendChild(name);
    card.appendChild(logo);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(membership);

    container.appendChild(card);
  });
}

if (gridButton) {
  gridButton.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
  });
}

if (listButton) {
  listButton.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
  });
}

const yearSpan = document.querySelector("#currentyear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector("#lastModified");
if (lastModified) {
  lastModified.textContent = `Last Modification: ${document.lastModified}`;
}

getMembers();
