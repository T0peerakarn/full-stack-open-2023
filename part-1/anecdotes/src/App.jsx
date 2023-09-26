import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )  
}

const Display = ({ text, point }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {point} votes</p>
    </div>
  )
}

const App = () => {

  const [selected, setSelected] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  
  const [mx, setMx] = useState({
    index: 0,
    point: 0
  })

  const updateVote = () => {
    const _point = { ...points }
    _point[selected] += 1

    if (_point[selected] > mx.point)
    {
      const _mx = {
        index: selected,
        point: _point[selected]
      }
      setMx(_mx)
    }

    setPoints(_point)
  }

  const randomAnecdote = () => {
    const n = Math.floor(Math.random() * 8)

    setSelected(n)
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Display text={anecdotes[selected]} point={points[selected]}/>
      <div>
        <Button text="vote" handleClick={updateVote}/>
        <Button text="next anecdote" handleClick={randomAnecdote}/>
      </div>
      <Header text="Anecdote with most votes"/>
      <Display text={anecdotes[mx.index]} point={mx.point}/>
    </div>
  )
}

export default App