const message = document.querySelector("#message");

// Get visits from localStorage
let visits = Number(localStorage.getItem("visits")) || 0;

// Display message
if (visits === 0) {
  message.textContent = "Welcome! This is your first visit.";
} else {
  message.textContent = `Welcome back! You have visited this page ${visits} times.`;
}

// Increase visits
visits++;

// Save back to localStorage
localStorage.setItem("visits", visits);
