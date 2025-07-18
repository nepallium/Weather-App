import weatherState from "./weatherState"


class UI {
    displayInfo() {
        const data = weatherState.data
        console.log(data)
        displayWeatherCard(data)
    }
}

function displayWeatherCard(data) {
    const weatherCard = document.querySelector("section.main-info-card")

    const location = weatherCard.querySelector("p.location")
    location.textContent = data.resolvedAddress

    const date = weatherCard.querySelector("time.date")
    date.datetime = data.todayData.datetime
    date.textContent = date.datetime

    const time = weatherCard.querySelector("time.time")
    time.datetime = new Date(data.todayData.datetimeEpoch * 1000)
    time.textContent = time.datetime
}

const uiStuff = new UI()

export default uiStuff