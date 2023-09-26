
const Filter = ({ search, setSearch }) => {
    return (
        <div>
            <h2>Filter</h2>
            <div>
                filter shown with <input value={search} onChange={() => setSearch(event.target.value)}/>
            </div>
        </div>
    )
}

export default Filter