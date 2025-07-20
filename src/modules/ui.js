import weatherState from "./weatherState";
import { format } from "date-fns";
import iconSet from "./icons";
import handleError from "./handleError";

let tempUnit, speedUnit;
if (weatherState.isMetric) {
    tempUnit = "°C";
    speedUnit = "km/h";
} else {
    tempUnit = "°F";
    speedUnit = "mi/h";
}

const round = Math.round;

class UI {
    displayInfo() {
        const data = weatherState.data;
        displayWeatherCard(data);

        displayExtraInfo(data);
    }
}

function displayWeatherCard(data) {
    const divContainer = document.querySelector("div.container");
    divContainer.style.display = "block";
    const weatherCard = document.querySelector("section.main-info-card");

    (function displayTop() {
        const location = weatherCard.querySelector("p.location");
        location.textContent = data.resolvedAddress;

        const date = weatherCard.querySelector("time.date");
        date.textContent = format(new Date(), "eeee, MMMM d, yyyy");

        const time = weatherCard.querySelector("time.time");
        time.textContent = format(new Date(), "HH:mm");
    })();

    (function displayBottom() {
        const currWeather = weatherCard.querySelector("p.current-weather");
        currWeather.textContent = `${round(
            data.currentConditions.temp
        )}${tempUnit}`;

        const feelsLike = weatherCard.querySelector("p.feels-like");
        feelsLike.textContent = `Feels like ${round(
            data.currentConditions.feelslike
        )}${tempUnit}`;

        const conditions = weatherCard.querySelector("p.conditions");
        conditions.textContent = data.currentConditions.conditions;

        // description
        const desc = weatherCard.querySelector("p.description");
        desc.textContent = data.description;
    })();

    (function displayWeatherIcon() {
        const img = weatherCard.querySelector("img.weather-icon");
        const iconFileName = iconSet[data.currentConditions.icon];
        
        // fallback
        if (!iconFileName) {
            iconFileName = "clear-day";
        }

        import(`../../assets/icons/${iconFileName}.png`)
                .then((module) => {
                    img.src = module.default || module;
                })
                .catch((err) => {
                    handleError(err);
                });
    })();
}

function displayExtraInfo(data) {
    const extraInfoSection = document.querySelector(
        "section.extra-weather-info"
    );
    extraInfoSection.style.display = "block";

    const minMaxWeather = extraInfoSection.querySelector(
        "li.min-max-temp .list-value"
    );
    minMaxWeather.textContent = `${round(data.tempmin)}${tempUnit} / ${round(
        data.tempmax
    )}${tempUnit}`;

    const rainProbValue = extraInfoSection.querySelector(
        "li.rain-prob .list-value"
    );
    rainProbValue.textContent = `${
        round(data.currentConditions.precipprob) ?? 0
    }%`;

    const windSpeedValue = extraInfoSection.querySelector(
        "li.wind-speed .list-value"
    );
    windSpeedValue.textContent = `${round(
        data.currentConditions.windspeed
    )} km/h`;

    const airHumValue = extraInfoSection.querySelector(
        "li.air-hum .list-value"
    );
    airHumValue.textContent = `${round(data.currentConditions.humidity)}%`;

    const uvIndexValue = extraInfoSection.querySelector(
        "li.uv-index .list-value"
    );
    uvIndexValue.textContent = round(data.currentConditions.uvindex);
}

const uiStuff = new UI();

export default uiStuff;
