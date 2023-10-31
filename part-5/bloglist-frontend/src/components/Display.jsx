const Display = ({ name, handleLogout }) => {
    return (
        <div>
            <p>{name} is logged in</p>
            <button type='submit' onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Display