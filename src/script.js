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
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
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
