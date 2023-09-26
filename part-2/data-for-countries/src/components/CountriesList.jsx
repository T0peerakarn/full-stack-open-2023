
const CountriesList = ({ countries, setSearch }) => {

    return (
        countries ?
            countries.length > 10 ?
                <div>
                    <p>Too many matches, specify another filter</p>
                </div>
            :
                <div>
                    {countries.map((country, i) => <p key={i}>{country.name.common} <button onClick={() => setSearch(country.name.common)}>show</button></p>)}
                </div>
        :
            null
    )
}

export default CountriesList