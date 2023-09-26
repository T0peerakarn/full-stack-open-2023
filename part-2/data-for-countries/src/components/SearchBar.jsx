
const SearchBar = ({ search, setSearch }) => {
    
    return (
        <div>
            <p>find countries <input value={search} onChange={(event) => setSearch(event.target.value)}></input></p>
        </div>
    )
}

export default SearchBar