import "./styles.css";
import { fetchWeatherData, processWeatherData } from "./data.js";
import {
  renderWeatherData,
  unrenderWeatherData,
  renderErrorMessage,
  unrenderErrorMessage,
  toggleImperialMetricUnits,
  renderLoadingIcon,
  unrenderLoadingIcon,
} from "./render.js";

(function () {
  const locationInput = document.querySelector("#location");
  const getWeatherBtn = document.querySelector("#get-weather");
  const toggleUnitsBtn = document.querySelector("#units-button");

  toggleUnitsBtn.addEventListener("click", toggleImperialMetricUnits);

  getWeatherBtn.addEventListener("click", () => {
    unrenderWeatherData();
    renderLoadingIcon();
    fetchWeatherData(locationInput.value)
      .then((response) => {
        return processWeatherData(response);
      })
      .then((data) => {
        renderWeatherData(data);
        unrenderErrorMessage();
      })
      .catch((error) => {
        renderErrorMessage(error);
      })
      .finally(() => {
        unrenderLoadingIcon();
      });
  });
})();
