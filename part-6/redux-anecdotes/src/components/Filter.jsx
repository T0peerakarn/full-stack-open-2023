import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = () => {

  const [filter, setFilter] = useState('')
  const dispatch = useDispatch()

  const changeHandler = (e) => {
    setFilter(e.target.value)
    dispatch(updateFilter(e.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter
      <input value={filter} onChange={changeHandler}/>
    </div>
  )
}

export default Filter