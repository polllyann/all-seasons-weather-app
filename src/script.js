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
      '<img src="images/rain1.png" alt="Thunderstorm" width="300"/>';
  }
  if (descrForImage == "Drizzle") {
    document.querySelector("#main-image").innerHTML =
      '<img src="images/rain2.png" alt="Drizzle" width="300"/>';
  }
  if (descrForImage == "Rain") {
    document.querySelector("#main-image").innerHTML =
      '<img src="images/rain2.png" alt="Rain" width="300"/>';
  }
  if (descrForImage == "Snow") {
    document.querySelector("#main-image").innerHTML =
      '<img src="images/snow.png" alt="Snow" width="300"/>';
  }
  if (descrForImage == "Clear") {
    document.querySelector("#main-image").innerHTML =
      '<img src="images/sun.png" alt="Clear" width="300"/>';
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
                <div class="weather-forecast-date">
                ${day} 
                </div>
                <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="" width="56"/>
               <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">18°</span>
                <span class="weather-forecast-temperature-min">12°</span>
                </div>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

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

let searchCity = document.querySelector("#search-field");
searchCity.addEventListener("submit", citySearch);

let useCurrent = document.querySelector("#current-location-button");
useCurrent.addEventListener("click", clickUseCurrent);

let celsiusTemp = null;

let fahrenheit = document.querySelector("#f-temp");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celsius = document.querySelector("#c-temp");
celsius.addEventListener("click", showCelsiusTemp);

citySubmit("Kyiv");
displayForecast();
