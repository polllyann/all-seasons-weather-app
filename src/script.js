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
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let descr = document.querySelector("#description");
  descr.innerHTML = response.data.weather[0].main;

  if (descr.innerHTML == "Clouds") {
    document.querySelector("#main-image").innerHTML =
      '<img src="images/clouds.png" alt="Clouds" width="300"/>';
  }
  if (descr.innerHTML == "Thunderstorm") {
    document.querySelector("#main-image").innerHTML =
      '<img src="images/rain.png" alt="Thunderstorm" width="300"/>';
  }
  if (descr.innerHTML == "Drizzle") {
    document.querySelector("#main-image").innerHTML =
      '<img src="images/rain.png" alt="Drizzle" width="300"/>';
  }
  if (descr.innerHTML == "Rain") {
    document.querySelector("#main-image").innerHTML =
      '<img src="images/rain.png" alt="Rain" width="300"/>';
  }
  if (descr.innerHTML == "Snow") {
    document.querySelector("#main-image").innerHTML =
      '<img src="images/snow.png" alt="Snow" width="300"/>';
  }
  if (descr.innerHTML == "Clear") {
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

citySubmit("Kyiv");
