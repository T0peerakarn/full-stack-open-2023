const Notify = ({ errorMessage }) => {
  return (
    errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

export default Notify