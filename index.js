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
    iconElement.innerHTML = `<i class="fas fa-sun"></i>`;
  } else if (response.data.weather[0].icon === "02d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun"></i>`;
  } else if (response.data.weather[0].icon === "01d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun"></i>`;
  } else if (response.data.weather[0].icon === "03d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun"></i>`;
  } else if (response.data.weather[0].icon === "04d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun"></i>`;
  } else if (response.data.weather[0].icon === "04n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun"></i>`;
  } else if (response.data.weather[0].icon === "09d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun-rain"></i>`;
  } else if (response.data.weather[0].icon === "10d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-showers-heavy"></i>`;
  } else if (response.data.weather[0].icon === "11d" || "10n") {
    iconElement.innerHTML = `<i class="fas fa-poo-storm"></i>`;
  } else if (response.data.weather[0].icon === "13d" || "13n") {
    iconElement.innerHTML = `<i class="fas fa-snowflake"></i>`;
  } else if (response.data.weather[0].icon === "50d" || "50n") {
    iconElement.innerHTML = `<i class="fas fa-smog"></i>`;
  } else if (response.data.weather[0].icon === "01n") {
    iconElement.innerHTML = `<i class="fas fa-moon"></i>`;
  } else if (response.data.weather[0].icon === "02n") {
    iconElement.innerHTML = '<i class="fas fa-cloud-moon"></i>';
  } else if (response.data.weather[0].icon === "03n") {
    iconElement.innerHTML = `<i class="fas fa-cloud"></i>`;
  } else if (response.data.weather[0].icon === "04n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-moon"></i>`;
  } else if (response.data.weather[0].icon === "09n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-moon-rain"></i>`;
  } else if (response.data.weather[0].icon === "10n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-moon-rain"></i>`;
  }

  celciusTemperature = response.data.main.temp;
}

//Search Bar//

function weatherSearch() {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = `${searchInput.value}`;
  let apiKey = "d297bcf4622bfa19fd137f5e6df72d1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${city}`;
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", weatherSearch);

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
