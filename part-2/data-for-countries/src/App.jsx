
import { useState, useEffect } from "react"

import SearchBar from "./components/SearchBar"
import CountryInformation from "./components/CountryInformation"
import CountriesList from "./components/CountriesList"

import countryService from "./services/countryService"
import weatherService from "./services/weatherService"



const App = () => {

    const [countries, setCountries] = useState(null)
    const [search, setSearch] = useState('')
    const [filteredCountries, setFilteredCountries] = useState(null)
    const [displayedCountry, setDisplayedCountry] = useState(null)
    const [displayedWeather, setDisplayedWeather] = useState(null)

    useEffect (
        () => {
            countryService
                .getAll()
                .then(data => setCountries(data))
        }, []
    )

    useEffect (
        () => {
            if (countries)
                setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())))
        }, [search]
    )

    useEffect (
        () => {
            if (filteredCountries && filteredCountries.length === 1)
                setDisplayedCountry(filteredCountries[0])
        }, [filteredCountries]
    )

    useEffect (
        () => {
            if (displayedCountry)
                weatherService
                    .getWeather(displayedCountry)
                    .then(data => setDisplayedWeather(data))

        }, [displayedCountry]
    )

    return (
        <div>
            <SearchBar
                search={search}
                setSearch={setSearch}
            />
            {
                filteredCountries && displayedCountry && displayedWeather && filteredCountries.length === 1 ? 
                    <CountryInformation
                        country={displayedCountry}
                        weather={displayedWeather}
                    />
                :
                    <CountriesList
                        countries={filteredCountries}
                        setSearch={setSearch}
                    />
            }
        </div>
    )
}

export default App