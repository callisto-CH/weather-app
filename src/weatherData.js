async function fetchWeatherData (query) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}/today?unitGroup=us&include=current&key=N67RX4CYTVWAAZ7NNJXU9PVAY&contentType=json`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`ERROR: ${response.status}`)
        }
        return response
    } catch (err) {
        throw new Error(err.message);
    }
}

async function processWeatherData (unprocessedData) {
    const data = await unprocessedData.json();
    const current = data['currentConditions'];
    const appData = {
        datetime: current['datetime'],
        temp: current['temp'],
        feelslike: current['feelslike'],
        humidity: current['humidity'],
        precip: current['precip'],
        precipprob: current['precipprob'],
        windspeed: current['windspeed'],
        conditions: current['conditions']
    };
    return appData
}

export { fetchWeatherData, processWeatherData }