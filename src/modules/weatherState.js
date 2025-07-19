class WeatherState {
  constructor(weatherObj) {
    this.data = weatherObj;
    this.isMetric = true;
  }
}

const weatherState = new WeatherState();

export default weatherState;
