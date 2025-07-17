import { getWeather } from "./modules/api";
import { getTodayWeather } from "./modules/api";

getTodayWeather("montreal").then(response => console.log(response))