import { getTodayWeather } from "./api"
import uiStuff from "./ui"
import weatherState from "./weatherState"


export function listenForSearch() {
    const form = document.querySelector("form.search")
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        const query = form.querySelector("#search").value
        getTodayWeather(query).then(data => weatherState.data = data)

        uiStuff.displayInfo()
    })

    form.reset()
}