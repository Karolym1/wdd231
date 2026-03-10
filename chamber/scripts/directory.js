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
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data);
}

// display members
const displayMembers = (members) => {
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

    image.src = `images/${member.image}`;
    image.alt = member.name;
    image.loading = "lazy";

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
