//Date and Time//

let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];
h2.innerHTML = `${day}, ${date} ${month} ${year}, ${hour}:${minutes}`;

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

//Current Conditions//

function showWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let tempElement = document.querySelector("#todayTemp");
  tempElement.innerHTML = `${Math.round(response.data.main.temp)}`;

  let descElement = document.querySelector(".conditionstoday");
  descElement.innerHTML = response.data.weather[0].description;

  let humElement = document.querySelector("#humidity");
  humElement.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = response.data.weather[0].icon;
  if (response.data.weather[0].icon === "01d") {
    iconElement.innerHTML = `<i class="fas fa-sun weather-main-icon"></i>`;
  } else if (response.data.weather[0].icon === "02d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun weather-main-icon"></i>`;
  } else if (response.data.weather[0].icon === "01d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun weather-main-icon"></i>`;
  } else if (response.data.weather[0].icon === "03d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun weather-main-icon"></i>`;
  } else if (response.data.weather[0].icon === "04d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun weather-main-icon"></i>`;
  } else if (response.data.weather[0].icon === "04n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun weather-main-icon"></i>`;
  } else if (response.data.weather[0].icon === "09d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun-rain weather-main-icon"></i>`;
  } else if (response.data.weather[0].icon === "10d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-showers-heavy weather-main-icon"></i>`;
  } else if (response.data.weather[0].icon === "11d" || "10n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun weather-main-icon"></i>`;
  } else if (response.data.weather[0].icon === "13d" || "13n") {
    iconElement.innerHTML = `<i class="fas fa-snowflake weather-main-icon"></i>`;
  } else if (response.data.weather[0].icon === "50d" || "50n") {
    iconElement.innerHTML = `<i class="fas fa-smog weather-main-icon"></i>`;
  } else if (response.data.weather[0].icon === "01n") {
    iconElement.innerHTML = `<i class="fas fa-moon weather-main-icon"></i>`;
  } else if (response.data.weather[0].icon === "02n") {
    iconElement.innerHTML =
      '<i class="fas fa-cloud-moon weather-forecast-icon"></i>';
  } else if (response.data.weather[0].icon === "03n") {
    iconElement.innerHTML = `<i class="fas fa-cloud weather-forecast-icon"></i>`;
  } else if (response.data.weather[0].icon === "04n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-moon weather-forecast-icon"></i>`;
  } else if (response.data.weather[0].icon === "09n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-moon-rain weather-forecast-icon"></i>`;
  } else if (response.data.weather[0].icon === "10n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-moon-rain weather-forecast-icon"></i>`;
  }

  celciusTemperature = response.data.main.temp;
}

//Search Bar//
function search(city) {
  let apiKey = "d297bcf4622bfa19fd137f5e6df72d1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
}

search("London");

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

//Current Location//
function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "d297bcf4622bfa19fd137f5e6df72d1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#geolocation");
button.addEventListener("click", getCurrentPosition);

//Metric Conversion//
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todayTemp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}`;
}

function displayCelciusTemp(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#todayTemp");
  temperatureElement.innerHTML = `${Math.round(celciusTemperature)}`;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", displayCelciusTemp);
