
const CountryInformation = ({ country, weather }) => {

    console.log(weather)

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <p>languages:</p>
            <ul>
                {Object.values(country.languages).map((country, i) => <li key={i}>{country}</li>)}
            </ul>
            <p>flag:</p>
            <img src={country.flags.svg} style={{width:100}}/>
            <h2>Weather in {country.capital}</h2>
            <p>temperature {(weather.main.temp - 273.15).toPrecision(4)} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default CountryInformation