import weatherState from "./weatherState";
import { format } from "date-fns";

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
  const weatherCard = document.querySelector("section.main-info-card");
  weatherCard.style.display = "flex";

  (function displayTop() {
    const location = weatherCard.querySelector("p.location");
    location.textContent = data.resolvedAddress;

    const date = weatherCard.querySelector("time.date");
    date.textContent = format(
      new Date(),
      "eeee, MMMM d, yyyy"
    );

    const time = weatherCard.querySelector("time.time");
    time.textContent = format(new Date(), "HH:mm");
  })();

  (function displayBottom() {
    const currWeather = weatherCard.querySelector("p.current-weather");
    currWeather.textContent = `${round(data.currentConditions.temp)}${tempUnit}`;

    // const minMaxWeather = weatherCard.querySelector("p.min-max-temp");
    // minMaxWeather.textContent = `${round(
    //   data.currentConditions.tempmin
    // )}${tempUnit} / ${round(data.currentConditions.tempmax)}${tempUnit}`;

    const feelsLike = weatherCard.querySelector("p.feels-like")
    feelsLike.textContent = `Feels like ${round(data.currentConditions.feelslike)}${tempUnit}`

    const conditions = weatherCard.querySelector("p.conditions");
    conditions.textContent = data.currentConditions.conditions;

    // description
    const desc = weatherCard.querySelector("p.description");
    desc.textContent = data.description;
  })();
}

function displayExtraInfo(data) {
  const extraInfoSection = document.querySelector("section.extra-weather-info");
  extraInfoSection.style.display = "block"

  const feelsLikeValue = extraInfoSection.querySelector(
    "li.feels-like .list-value"
  );
  feelsLikeValue.textContent = `${round(data.currentConditions.feelslike)}${tempUnit}`;

  const rainProbValue = extraInfoSection.querySelector(
    "li.rain-prob .list-value"
  );
  rainProbValue.textContent = `${round(data.currentConditions.precipprob) ?? 0}%`;

  const windSpeedValue = extraInfoSection.querySelector(
    "li.wind-speed .list-value"
  );
  windSpeedValue.textContent = `${round(data.currentConditions.windspeed)} km/h`;

  const airHumValue = extraInfoSection.querySelector("li.air-hum .list-value");
  airHumValue.textContent = `${round(data.currentConditions.humidity)}%`;

  const uvIndexValue = extraInfoSection.querySelector(
    "li.uv-index .list-value"
  );
  uvIndexValue.textContent = round(data.currentConditions.uvindex);
}

const uiStuff = new UI();

export default uiStuff;
