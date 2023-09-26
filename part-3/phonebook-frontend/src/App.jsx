import { useState, useEffect } from 'react'

import Notification from './components/Notification'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'

import contactService from './services/contact'

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setError] = useState(false)

  const addPerson = event => {
    event.preventDefault()
    
    if (persons.find(person => person.name === newName))
    {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        const person = persons.find(person => person.name === newName)

        contactService
          .update(person.id, { ...person, number: newNumber })
          .then(data => setPersons(persons.map(person => person.id === data.id ? data : person)))
          .then(() => {
            setError(false)
            setMessage(`Replaced ${person.name}`)
            setTimeout(() => setMessage(null), 3000)
          })
        setNewName('')
        setNewNumber('')
      }

      return
    }

    contactService
      .create({name: newName, number: newNumber})
      .then(data => setPersons(persons.concat(data)))
      .then(() => {
        setError(false)
        setMessage(`Added ${newName}`)
        setTimeout(() => setMessage(null), 3000);
      })
    
    setNewName('')
    setNewNumber('')
  }

  const removePerson = id => {

    const name = persons.find(person => person.id === id).name

    if (window.confirm(`Delete ${name} ?`))
    {
      contactService
        .remove(id)
        .then(() => {
          setError(false)
          setMessage(`Deleted ${name}`)
          setTimeout(() => setMessage(null), 3000);
        })
        .catch(error => {
          setError(true)
          setMessage(`Information of ${name} has already been removed from server`)
          setTimeout(() => setMessage(null), 3000);
        })

      setPersons(persons.filter(person => person.id !== id))
    }
  }

  useEffect(() => {
    contactService
      .getAll()
      .then(data => setPersons(data))
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} isError={isError}/>
      <Filter search={search} setSearch={setSearch}/>
      <Form newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addPerson={addPerson}/>
      <Numbers persons={persons.filter(person => person.name.includes(search))} remove={removePerson}/>
    </div>
  )
}

export default App