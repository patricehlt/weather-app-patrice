//Date and Time//

let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
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
  tempElement.innerHTML = `${Math.round(response.data.main.temp)}°C`;

  let descElement = document.querySelector(".conditionstoday");
  descElement.innerHTML = response.data.weather[0].description;

  let humElement = document.querySelector("#humidity");
  humElement.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
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
