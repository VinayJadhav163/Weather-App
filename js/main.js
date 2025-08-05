const apiKey = "e70e8a128ca1c4c5b3c14de9884c861d";

// Function to fetch and display weather
async function fetchWeather(city) {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(weatherUrl);
    const data = await response.json();

    console.log(data); // for debugging

    // Update main weather info
    document.getElementById("city-name").innerText = data.city.name;
    document.getElementById("metric").innerText = Math.round(data.list[0].main.temp) + "°";
    document.getElementById("weather-main-current").innerText = data.list[0].weather[0].description;
    document.getElementById("weather-main-today").innerText = data.list[0].weather[0].description;
    document.getElementById("humidity").innerText = Math.round(data.list[0].main.humidity);
    document.getElementById("feels-like").innerText = Math.round(data.list[0].main.feels_like);
    document.getElementById("temp-min-today").innerText = Math.round(data.list[0].main.temp_min) + "°";
    document.getElementById("temp-max-today").innerText = Math.round(data.list[0].main.temp_max) + "°";

    // Set weather icon
    const condition = data.list[0].weather[0].main.toLowerCase();
    const iconPath = getIcon(condition);
    document.querySelector(".weather-icon").src = iconPath;
    document.querySelector(".weather-icons").src = iconPath;

    displayForecast(data);
  } catch (err) {
    console.error("Weather data fetch failed:", err);
    alert("Could not load weather data. Please check your API key or internet connection.");
  }
}

// Get icon based on weather condition
function getIcon(condition) {
  switch (condition) {
    case "rain":
      return "img/rain.png";
    case "clear":
    case "clear sky":
      return "img/sun.png";
    case "snow":
      return "img/snow.png";
    case "clouds":
    case "smoke":
      return "img/cloud.png";
    case "mist":
    case "fog":
      return "img/mist.png";
    case "haze":
      return "img/haze.png";
    case "thunderstorm":
      return "img/thunderstorm.png";
    default:
      return "img/sun.png";
  }
}

// Display 6-day forecast
function displayForecast(data) {
  const forecastBox = document.getElementById("future-forecast-box");
  forecastBox.innerHTML = "";

  const uniqueDates = new Set();
  const dailyData = [];

  data.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];
    if (!uniqueDates.has(date) && dailyData.length < 6) {
      uniqueDates.add(date);
      const condition = item.weather[0].main.toLowerCase();
      dailyData.push({
        day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        temp: Math.round(item.main.temp) + "°",
        description: item.weather[0].description,
        icon: getIcon(condition),
      });
    }
  });

  dailyData.forEach(day => {
    forecastBox.innerHTML += `
      <div class="weather-forecast-box">
        <div class="day-weather"><span>${day.day}</span></div>
        <div class="weather-icon-forecast"><img src="${day.icon}" /></div>
        <div class="temp-weather"><span>${day.temp}</span></div>
        <div class="weather-main-forecast">${day.description}</div>
      </div>
    `;
  });
}

// On page load
fetchWeather("Mumbai");
