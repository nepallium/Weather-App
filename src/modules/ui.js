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

  (function displayTop() {
    const location = weatherCard.querySelector("p.location");
    location.textContent = data.resolvedAddress;

    const date = weatherCard.querySelector("time.date");
    date.textContent = format(
      new Date(data.todayData.datetime),
      "eeee, MMMM d, yyyy"
    );

    const time = weatherCard.querySelector("time.time");
    time.textContent = format(new Date(), "HH:mm");
  })();

  (function displayBottom() {
    const currWeather = weatherCard.querySelector("p.current-weather");
    currWeather.textContent = `${round(data.todayData.temp)}${tempUnit}`;

    const minMaxWeather = weatherCard.querySelector("p.min-max-temp");
    minMaxWeather.textContent = `${round(
      data.todayData.tempmin
    )}${tempUnit} / ${round(data.todayData.tempmax)}${tempUnit}`;

    const conditions = weatherCard.querySelector("p.conditions");
    conditions.textContent = data.todayData.conditions;

    // description
    const desc = weatherCard.querySelector("p.description");
    desc.textContent = data.todayData.description;
  })();
}

function displayExtraInfo(data) {
  const extraInfoSection = document.querySelector("section.extra-weather-info");

  const feelsLikeValue = extraInfoSection.querySelector(
    "li.feels-like .list-value"
  );
  feelsLikeValue.textContent = `${round(data.todayData.feelslike)}${tempUnit}`;

  const rainProbValue = extraInfoSection.querySelector(
    "li.rain-prob .list-value"
  );
  rainProbValue.textContent = `${round(data.todayData.precipprob) ?? 0}%`;

  const windSpeedValue = extraInfoSection.querySelector(
    "li.wind-speed .list-value"
  );
  windSpeedValue.textContent = `${round(data.todayData.windspeed)} km/h`;

  const airHumValue = extraInfoSection.querySelector("li.air-hum .list-value");
  airHumValue.textContent = `${round(data.todayData.humidity)}%`;

  const uvIndexValue = extraInfoSection.querySelector(
    "li.uv-index .list-value"
  );
  uvIndexValue.textContent = round(data.todayData.uvindex);
}

const uiStuff = new UI();

export default uiStuff;
