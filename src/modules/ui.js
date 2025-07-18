import weatherState from "./weatherState"

const data = weatherState.data

class UI {
    displayInfo() {
        displayWeatherCard()
    }
}

function displayWeatherCard() {
    const weatherCard = document.querySelector("section.main-info-card")

    const location = weatherCard.querySelector("p.location")
    location.value = data.resolvedAddress

    const date = weatherCard.querySelector("time.date")
    date.datetime = data.datetime
}

const uiStuff = new UI()

export default uiStuff