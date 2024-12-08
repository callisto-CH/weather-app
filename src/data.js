let appData = {};

async function fetchWeatherData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=us&include=current&key=N67RX4CYTVWAAZ7NNJXU9PVAY&contentType=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return { response, location };
  } catch (err) {
    return Promise.reject(err);
  }
}

function formatLocation(location) {
  return location
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

async function processWeatherData(unprocessedData) {
  const data = await unprocessedData.response.json();
  const current = data["currentConditions"];
  appData = {
    location: formatLocation(unprocessedData.location),
    dateTime: current.datetime,
    conditions: current.conditions,
    icon: current.icon,
    temp: current.temp,
    tempMetric: Math.round((current.temp - 32) * (5 / 9) * 10) / 10,
    feelsLike: current.feelslike,
    feelsLikeMetric: Math.round((current.feelslike - 32) * (5 / 9) * 10) / 10,
    humidity: current.humidity,
    precip: Math.round(current.precip * 100) / 100,
    precipMetric: Math.round(current.precip * 25.4 * 10) / 10,
    precipProb: current.precipprob,
    windSpeed: current.windspeed,
    windSpeedMetric: Math.round(current.windspeed * 1.60934 * 10) / 10,
  };
  return appData;
}

function getData() {
  return appData;
}

export { fetchWeatherData, processWeatherData, getData };
