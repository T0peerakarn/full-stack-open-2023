import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  
  const dispatch = useDispatch()
  
  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote({ id }))
    dispatch(setNotification({ notification: `you voted '${anecdote.content}'` }))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
  
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote