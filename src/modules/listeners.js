import { getTodayWeather } from "./api";
import uiStuff from "./ui";
import weatherState from "./weatherState";

export function listenForSearch() {
  const form = document.querySelector("form.search");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const query = form.querySelector("#search").value;
    // getTodayWeather(query).then(data => weatherState.data = data)
    const data = await getTodayWeather(query);
    weatherState.data = data;
    console.log(data);
    uiStuff.displayInfo();
  });

  form.reset();
}
