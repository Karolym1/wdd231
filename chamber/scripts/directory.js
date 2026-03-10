const url = "data/members.json";

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

// footer info
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
  `Last Modification: ${document.lastModified}`;

// fetch member data
async function getMembers() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Member data could not be loaded.");
    }

    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    membersContainer.innerHTML = `<p>Unable to load member information at this time.</p>`;
    console.error(error);
  }
}

// display members
const displayMembers = (members) => {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    const name = document.createElement("h3");
    const address = document.createElement("p");
    const phone = document.createElement("p");
    const website = document.createElement("a");
    const image = document.createElement("img");

    name.textContent = member.name;
    address.textContent = member.address;
    phone.textContent = member.phone;

    website.textContent = "Visit Website";
    website.href = member.website;
    website.target = "_blank";
    website.rel = "noopener noreferrer";

    image.src = `images/${member.image}`;
    image.alt = `${member.name} business image`;
    image.loading = "lazy";
    image.width = 300;
    image.height = 200;

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);

    membersContainer.appendChild(card);
  });
};

// grid view
gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
});

// list view
listButton.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
});

getMembers();
