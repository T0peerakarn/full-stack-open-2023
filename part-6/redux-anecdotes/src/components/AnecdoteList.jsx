import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.filter === ''
    ? state.anecdotes
    : state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  
  return [...anecdotes]
    .sort((a, b) => a.votes - b.votes)
    .map(a => <Anecdote key={a.id} anecdote={a}/>)
}

export default AnecdoteList