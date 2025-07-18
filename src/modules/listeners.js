import { getTodayWeather } from "./api"


export function listenForSearch() {
    const form = document.querySelector("form.search")
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        const query = form.querySelector("#search").value
        getTodayWeather(query).then(res => console.log(res))
    })

    form.reset()
}