const membersURL = "./data/members.json";
const weatherURL =
  "https://api.open-meteo.com/v1/forecast?latitude=40.7608&longitude=-111.8910&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=4&timezone=auto";

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#site-nav");
const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const forecastContainer = document.querySelector("#forecast");
const spotlightsContainer = document.querySelector("#spotlights");
const yearSpan = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuButton.textContent = isOpen ? "✖" : "☰";
  });
}

function getWeatherDescription(code) {
  const codes = {
    0: "Clear sky",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",
    56: "Freezing drizzle",
    57: "Heavy freezing drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Freezing rain",
    67: "Heavy freezing rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Rain showers",
    81: "Heavy rain showers",
    82: "Violent rain showers",
    85: "Snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Severe thunderstorm with hail",
  };

  return codes[code] || "Weather unavailable";
}

async function getWeather() {
  try {
    const response = await fetch(weatherURL);

    if (!response.ok) {
      throw new Error(`Weather request failed: ${response.status}`);
    }

    const data = await response.json();

    const temp = Math.round(data.current.temperature_2m);
    const code = data.current.weather_code;

    if (currentTemp) {
      currentTemp.textContent = `Current Temperature: ${temp}°F`;
    }

    if (weatherDesc) {
      weatherDesc.textContent = getWeatherDescription(code);
    }

    if (forecastContainer) {
      forecastContainer.innerHTML = "";

      for (let i = 1; i <= 3; i++) {
        const day = document.createElement("p");
        const date = new Date(data.daily.time[i]);

        const max = Math.round(data.daily.temperature_2m_max[i]);
        const min = Math.round(data.daily.temperature_2m_min[i]);

        day.textContent = `${date.toLocaleDateString("en-US", {
          weekday: "short",
        })}: High ${max}°F / Low ${min}°F`;

        forecastContainer.appendChild(day);
      }
    }
  } catch (error) {
    console.error("Weather error:", error);

    if (currentTemp) {
      currentTemp.textContent = "Weather data unavailable.";
    }

    if (weatherDesc) {
      weatherDesc.textContent = "";
    }

    if (forecastContainer) {
      forecastContainer.innerHTML = "";
    }
  }
}

function getRandomMembers(members, count) {
  const shuffled = [...members].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function displaySpotlights(members) {
  if (!spotlightsContainer) return;

  spotlightsContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    const name = document.createElement("h3");
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

    spotlightsContainer.appendChild(card);
  });
}

async function getSpotlights() {
  try {
    const response = await fetch(membersURL);

    if (!response.ok) {
      throw new Error(`Members request failed: ${response.status}`);
    }

    const data = await response.json();
    const members = Array.isArray(data) ? data : data.members;

    if (!members || !Array.isArray(members)) {
      throw new Error("members.json format is invalid.");
    }

    const featuredMembers = members.filter(
      (member) =>
        member.membership === "Gold" ||
        member.membership === "Silver" ||
        member.membership === 3 ||
        member.membership === 2,
    );

    const randomCount =
      featuredMembers.length >= 3 ? 3 : featuredMembers.length;
    const selectedMembers = getRandomMembers(featuredMembers, randomCount);

    displaySpotlights(selectedMembers);
  } catch (error) {
    console.error("Spotlight error:", error);

    if (spotlightsContainer) {
      spotlightsContainer.innerHTML =
        "<p>Spotlights unavailable right now.</p>";
    }
  }
}

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

getWeather();
getSpotlights();
