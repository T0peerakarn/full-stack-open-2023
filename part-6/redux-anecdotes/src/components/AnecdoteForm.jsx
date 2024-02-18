import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
const AnecdoteForm = () => {

  const [typedAnecdote, setTypedAnecdote] = useState('')
  const dispatch = useDispatch()

  const create = (e) => {
    e.preventDefault()
    dispatch(createAnecdote({ content: typedAnecdote }))
    dispatch(setNotification({ notification: `you created '${typedAnecdote}'` }))
    setTimeout(() => dispatch(removeNotification()), 5000)
    setTypedAnecdote('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input value={typedAnecdote} onChange={e => setTypedAnecdote(e.target.value)}/></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm