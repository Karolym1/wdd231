// Course data (required provided array structure)
const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Web Frontend Development I",
    credits: 2,
    completed: false,
  },
];

// DOM references
const courseCardsEl = document.querySelector("#courseCards");
const creditTotalEl = document.querySelector("#creditTotal");

const allBtn = document.querySelector("#all");
const wddBtn = document.querySelector("#wdd");
const cseBtn = document.querySelector("#cse");

// Render course cards
function displayCourses(courseList) {
  // clear existing cards
  courseCardsEl.innerHTML = "";

  courseList.forEach((course) => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) {
      card.classList.add("completed");
    }

    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p class="credits-line">${course.credits} credits</p>
    `;

    courseCardsEl.appendChild(card);
  });

  // calculate credits using reduce (required)
  const totalCredits = courseList.reduce(
    (sum, course) => sum + course.credits,
    0,
  );
  creditTotalEl.textContent = totalCredits;
}

// Filter logic
allBtn.addEventListener("click", () => {
  setActiveButton(allBtn);
  displayCourses(courses);
});

wddBtn.addEventListener("click", () => {
  setActiveButton(wddBtn);
  const wddCourses = courses.filter((course) => course.subject === "WDD");
  displayCourses(wddCourses);
});

cseBtn.addEventListener("click", () => {
  setActiveButton(cseBtn);
  const cseCourses = courses.filter((course) => course.subject === "CSE");
  displayCourses(cseCourses);
});

// Wayfinding for filter buttons
function setActiveButton(activeBtn) {
  [allBtn, wddBtn, cseBtn].forEach((btn) => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

// Initial load
setActiveButton(allBtn);
displayCourses(courses);
