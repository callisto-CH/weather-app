import { fetchWeatherData, processWeatherData } from './weatherData.js';

const locationInput = document.querySelector("#location");
const getWeatherBtn = document.querySelector("#get-weather");
getWeatherBtn.addEventListener('click', () => {
    fetchWeatherData(locationInput.value)
        .then((response) => {
            return processWeatherData(response);
        })
        .then((data) => {
            console.log(data);
        })
});
