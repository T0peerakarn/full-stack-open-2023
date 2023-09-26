
import axios from "axios"

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
const apiKey = import.meta.env.VITE_WEATHER_KEY

const getWeather = (country) => {

    const [lat, lon] = country.capitalInfo.latlng

    return axios
            .get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`)
            .then(response => response.data)
}

export default { getWeather }

