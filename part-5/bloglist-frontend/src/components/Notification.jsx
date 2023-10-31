const Notification = ({ message, isError }) => {
    const style = {
        color: isError ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    return message === null
        ? null
        : (
            <div style={style}>
                {message}
            </div>
        )
}

export default Notification