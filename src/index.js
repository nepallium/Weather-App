import "./css/reset.css"
import "./css/styles.css"
import { getWeather } from "./modules/api";
import { getTodayWeather } from "./modules/api";
import { listenForSearch } from "./modules/listeners";

// getTodayWeather("montreal").then(response => console.log(response))

listenForSearch();
