import { icons } from "./icons.js";
import { getData } from "./data.js";

const errorMessage = document.querySelector(".error");
const loading = document.querySelector(".loading-icon-container");
const forecast = document.querySelector(".forecast");
const location = document.querySelector(".location");
const dateTime = document.querySelector(".date-time");
const conditions = document.querySelector(".conditions");
const icon = document.querySelector(".icon");
const tempNum = document.querySelector(".temp-num");
const degrees = document.querySelectorAll(".degrees");
const feelsLikeNum = document.querySelector(".feels-like-num");
const humidityNum = document.querySelector(".humidity-num");
const precipNum = document.querySelector(".precip-num");
const precipUnits = document.querySelector(".precip-units");
const precipProbNum = document.querySelector(".precip-prob-num");
const windSpeedNum = document.querySelector(".wind-speed-num");
const windSpeedUnits = document.querySelector(".wind-speed-units");
let units = "imperial";

function renderWeatherData() {
  let data = getData();
  forecast.className = "forecast active";
  location.textContent = data.location;
  dateTime.textContent = data.dateTime;
  conditions.textContent = data.conditions;
  icon.src = icons[data.icon];
  tempNum.textContent = units == "imperial" ? data.temp : data.tempMetric;
  feelsLikeNum.textContent =
    units == "imperial" ? data.feelsLike : data.feelsLikeMetric;
  humidityNum.textContent = data.humidity;
  precipNum.textContent = units == "imperial" ? data.precip : data.precipMetric;
  precipProbNum.textContent = data.precipProb;
  windSpeedNum.textContent =
    units == "imperial" ? data.windSpeed : data.windSpeedMetric;
}

function unrenderWeatherData() {
  forecast.className = "forecast";
}

function renderErrorMessage(err) {
  errorMessage.className = "error active";
  switch (err.toString().slice(-3)) {
    case "400":
      errorMessage.textContent =
        "Error 400 Bad Request. Location not found, or request was invalid.";
      break;
    case "401":
      errorMessage.textContent =
        "Error 401 Unauthorized. API key incorrect, or account is inactive/disabled.";
      break;
    case "429":
      errorMessage.textContent =
        "Error 429 Too Many Requests. Only 1000 API calls allowed per day.";
      break;
    case "500":
      errorMessage.textContent =
        "Error 500 Internal Server Error. Please try again later.";
      break;
    default:
      errorMessage.textContent = "Error --- Unknown error.";
  }
}

function unrenderErrorMessage() {
  errorMessage.className = "error";
  errorMessage.textContent = "";
}

function toggleImperialMetricUnits() {
  let data = getData();
  units = units == "imperial" ? "metric" : "imperial";

  if (units == "imperial") {
    tempNum.textContent = data.temp;
    feelsLikeNum.textContent = data.feelsLike;
    precipNum.textContent = data.precip;
    windSpeedNum.textContent = data.windSpeed;

    degrees.forEach((x) => {
      x.textContent = "°F";
    });
    precipUnits.textContent = " in.";
    windSpeedUnits.textContent = " mph";
  } else {
    tempNum.textContent = data.tempMetric;
    feelsLikeNum.textContent = data.feelsLikeMetric;
    precipNum.textContent = data.precipMetric;
    windSpeedNum.textContent = data.windSpeedMetric;

    degrees.forEach((x) => {
      x.textContent = "°C";
    });
    precipUnits.textContent = " mm.";
    windSpeedUnits.textContent = " kmh";
  }
}

function renderLoadingIcon() {
  loading.className = "loading-icon-container active";
}

function unrenderLoadingIcon() {
  loading.className = "loading-icon-container";
}

export {
  renderWeatherData,
  unrenderWeatherData,
  renderErrorMessage,
  unrenderErrorMessage,
  toggleImperialMetricUnits,
  renderLoadingIcon,
  unrenderLoadingIcon,
};
