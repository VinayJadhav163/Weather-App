let apiKey = "1e3e8f230b6064d27976e41163a82b77";
let searchinput = document.querySelector('.searchinput');
let submitBtn = document.getElementById('submitSearch');

async function search(city = '', state = '', country = '') {
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city},${state},${country}&appid=${apiKey}`);

    if (!response.ok) throw new Error("Location not found");

    let data = await response.json();
    console.log(data);

    // Display main container
    document.querySelector(".return").style.display = "block";
    document.querySelector(".message").style.display = "none";
    document.querySelector(".error-message").style.display = "none";

    // Set weather data
    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".weather-temp").innerHTML = Math.floor(data.main.temp) + '°';
    document.querySelector(".wind").innerHTML = Math.floor(data.wind.speed) + " m/s";
    document.querySelector(".pressure").innerHTML = Math.floor(data.main.pressure) + " hPa";
    document.querySelector(".humidity").innerHTML = Math.floor(data.main.humidity) + "%";
    document.querySelector(".sunrise").innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    document.querySelector(".sunset").innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Set weather image
    const weatherMain = data.weather[0].main;
    const weatherImg = document.querySelector(".weather-img");

    if (weatherMain === "Rain") {
      weatherImg.src = "img/rain.png";
    } else if (weatherMain === "Clear") {
      weatherImg.src = "img/sun.png";
    } else if (weatherMain === "Snow") {
      weatherImg.src = "img/snow.png";
    } else if (["Clouds", "Smoke"].includes(weatherMain)) {
      weatherImg.src = "img/cloud.png";
    } else if (["Mist", "Fog"].includes(weatherMain)) {
      weatherImg.src = "img/mist.png";
    } else if (weatherMain === "Haze") {
      weatherImg.src = "img/haze.png";
    } else if (weatherMain === "Thunderstorm") {
      weatherImg.src = "img/thunderstorm.png";
    }

  } catch (error) {
    console.error(error.message);

    document.querySelector(".return").style.display = "none";
    document.querySelector(".message").style.display = "none";
    document.querySelector(".error-message").style.display = "block";
  }
}

// 🔹 Handle Enter key
searchinput.addEventListener('keydown', function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

// 🔹 Handle Search Button click
submitBtn.addEventListener('click', function () {
  handleSearch();
});

// 🔹 Common search handler
function handleSearch() {
  const input = searchinput.value.trim();
  if (input === "") return;

  const [city = '', state = '', country = ''] = input.split(',').map(s => s.trim());
  search(city, state, country);
}
