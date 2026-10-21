// API Credentials provided for your task
const apiKey = "8ac5c4d57ba6a4b3dfcf622700447b1e";

// Selecting DOM elements
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const weatherDesc = document.getElementById("weatherDesc");
const tempDisplay = document.getElementById("tempDisplay");
const humidityDisplay = document.getElementById("humidityDisplay");
const windDisplay = document.getElementById("windDisplay");

// Function to fetch weather details from OpenWeatherMap API
async function getWeather(city) {
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  // Dynamically passing the user's city into the API URL after q=
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiURL);

    // Check if the city name is valid/found
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Updating the HTML card elements with live API data
    cityName.innerHTML = `<i class="bi bi-geo-alt-fill text-danger me-2"></i>${data.name}, ${data.sys.country}`;
    weatherDesc.textContent = data.weather[0].description;
    tempDisplay.textContent = `${Math.round(data.main.temp)}°C`;
    humidityDisplay.textContent = `${data.main.humidity}%`;
    windDisplay.textContent = `${data.wind.speed} m/s`;

  } catch (error) {
    alert("Invalid city name! Please try again.");
    console.error(error);
  }
}

// Event Listener for Search Button Click
searchBtn.addEventListener("click", () => {
  getWeather(cityInput.value.trim());
});

// Event Listener to trigger search when pressing the "Enter" key inside input
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getWeather(cityInput.value.trim());
  }
});

// Fetch default weather for kochi automatically when the page loads
window.addEventListener("load", () => {
  getWeather("Kochi");
});