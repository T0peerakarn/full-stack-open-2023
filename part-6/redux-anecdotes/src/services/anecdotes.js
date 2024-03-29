import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createAnecdote = async (content) => {
  const anecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const voteAnecdote = async (id) => {
  const anecdote = await getById(id)
  const response = await axios.patch(`${baseUrl}/${id}`, { votes: anecdote.votes + 1 })
  return response.data
}

export default {
  getAll,
  createAnecdote,
  voteAnecdote
}