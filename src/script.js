let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[currentTime.getMonth()];
let dayNumber = currentTime.getDate();
document.querySelector("#day").innerHTML = `${day}, ${month} ${dayNumber}`;

function showCity(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let descrForImage = response.data.weather[0].main;

  if (descrForImage == "Clouds") {
    document.querySelector("#main-image").innerHTML =
      '<img src="images/clouds.png" alt="Clouds" width="300"/>';
  }
  if (descrForImage == "Thunderstorm") {
    document.querySelector("#main-image").innerHTML =
      '<img src="images/rain.png" alt="Thunderstorm" width="300"/>';
  }
  if (descrForImage == "Drizzle") {
    document.querySelector("#main-image").innerHTML =
      '<img src="images/rain.png" alt="Drizzle" width="300"/>';
  }
  if (descrForImage == "Rain") {
    document.querySelector("#main-image").innerHTML =
      '<img src="images/rain.png" alt="Rain" width="300"/>';
  }
  if (descrForImage == "Snow") {
    document.querySelector("#main-image").innerHTML =
      '<img src="images/snow.png" alt="Snow" width="300"/>';
  }
  if (descrForImage == "Clear") {
    document.querySelector("#main-image").innerHTML =
      '<img src="images/sun1.png" alt="Clear" width="300"/>';
  }
}

function citySubmit(city) {
  let apiKey = "7a38fc66bb31c1d00033fd20539d4e29";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showCity);
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  citySubmit(city);
}
let searchCity = document.querySelector("#search-field");
searchCity.addEventListener("submit", citySearch);

function getCurrentLoc(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "7a38fc66bb31c1d00033fd20539d4e29";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showCity);
}

function clickUseCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLoc);
}
let useCurrent = document.querySelector("#current-location-button");
useCurrent.addEventListener("click", clickUseCurrent);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemp * 9) / 5 + 32);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = fahrenheitTemperature;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let tempHeader = document.querySelector("#temperature");
  tempHeader.innerHTML = celsiusTemp;
}
let celsiusTemp = null;

let fahrenheit = document.querySelector("#f-temp");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celsius = document.querySelector("#c-temp");
celsius.addEventListener("click", showCelsiusTemp);
citySubmit("Kyiv");
