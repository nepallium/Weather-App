import handleError from "./handleError";
import { displaySearchError } from "./handleError";

const baseURL =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const apiKEY = process.env.API_KEY;
const metricUnitTag = "unitGroup=metric";

export async function getWeather(location) {
    try {
        const response = await fetch(
            `${baseURL}/${location}?key=${apiKEY}&${metricUnitTag}`,
            { mode: "cors" }
        );
        if (!response.ok) {
            handleError(new Error(`Weather data request failed with status: ${response.status}`), response.status, location);
        }

        const weatherData = await response.json();
        return weatherData;
    } catch (e) {
        handleError(e);
    }
}

export async function getTodayWeather(location) {
    const weatherData = await getWeather(location);

    const { days, alerts, description, resolvedAddress, currentConditions } =
        weatherData;

    return {
        alerts,
        description,
        resolvedAddress,
        currentConditions,
        tempmin: days[0].tempmin,
        tempmax: days[0].tempmax,
    };
}
