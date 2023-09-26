import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, number, isPercentage }) => {

  if (isPercentage)
  {
    return (
      <tr>
        <td>{text}</td>
        <td>{number} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{number}</td>
    </tr>
  )
}

const Statistic = (props) => {

  const {good, neutral, bad} = props

  if (good + neutral + bad === 0)
  {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } 
  
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" number={good}/>
          <StatisticLine text="neutral" number={neutral}/>
          <StatisticLine text="bad" number={bad}/>
          <StatisticLine text="all" number={good + neutral + bad}/>
          <StatisticLine text="average" number={(good - bad)/(good + neutral + bad)}/>
          <StatisticLine text="positive" number={good * 100 / (good + neutral + bad)} isPercentage={true}/>
        </tbody>
      </table>
    </div>
  )
} 

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={() => setGood(good+1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={() => setBad(bad+1)} text="bad"/>

      <Header text="statistics"/>
      <Statistic good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App