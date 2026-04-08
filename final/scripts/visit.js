// visit.js

const visitDisplay = document.createElement("p");

let visits = Number(localStorage.getItem("visits")) || 0;

visits++;

localStorage.setItem("visits", visits);

visitDisplay.textContent = `You have visited this site ${visits} time(s).`;

document.querySelector("footer").appendChild(visitDisplay);
