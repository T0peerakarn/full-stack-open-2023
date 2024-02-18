import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {

  const [typedFilter, setTypedFilter] = useState('')
  const dispatch = useDispatch()

  const changeHandler = (e) => {
    setTypedFilter(e.target.value)
    dispatch(setFilter({ filter: e.target.value }))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter
      <input value={typedFilter} onChange={changeHandler}/>
    </div>
  )
}

export default Filter