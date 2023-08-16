//h1 search a city
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "ffb1fa2c90cad31d90a4daa88adc6920";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//h2 day and time
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

let date = document.querySelector("#day-time");
let currentTime = new Date();
date.innerHTML = formatDate(currentTime);

//h3 weather and temperature
function showTemperature(response) {
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;

  let temp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}°F`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);

  let wind = document.querySelector("#windSpeed");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windSpeed} mph`;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currLocationBtn = document.querySelector("#current-location");
currLocationBtn.addEventListener("click", getPosition);
