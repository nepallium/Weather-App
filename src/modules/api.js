import handleError from "./handleError"

const baseURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline"
const apiKEY = process.env.API_KEY
const metricUnitTag = "?unitGroup=metric"

export async function getWeather(location) {
    try {
        const response = await fetch(
            `${baseURL}/${location}?key=${apiKEY}&${metricUnitTag}`,
            { mode: 'cors' }
        )
        if (!response.ok) {
            handleError(new Error("Weather data response not ok"))
        }

        const weatherData = await response.json()
        return weatherData
    } catch (e) {
        handleError(e)
    }
}

export async function getTodayWeather(location) {
    const weatherData = await getWeather(location)
    
    const { days, alerts, description, resolvedAddress } = weatherData
    const processedDays = days.map(day => {
        const {hours, ...dayData} = day
        return dayData
    })

    return {
        alerts,
        description,
        resolvedAddress,
        todayData: { ...processedDays[0] },
    }
}