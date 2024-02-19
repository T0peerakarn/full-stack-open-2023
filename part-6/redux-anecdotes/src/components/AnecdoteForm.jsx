import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

  const [typedAnecdote, setTypedAnecdote] = useState('')
  const dispatch = useDispatch()

  const create = (e) => {
    e.preventDefault()

    anecdoteService
      .createAnecdote(typedAnecdote)
      .then(data => dispatch(appendAnecdote({ anecdote: data })))

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