import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const authors = useQuery(
    ALL_AUTHORS,
    {
      skip: !props.show
    }
  )

  const [updateAuthor, result] = useMutation(
    UPDATE_AUTHOR,
    {
      refetchQueries: [
        { query: ALL_AUTHORS }
      ],
      onError: (error) => {
        const messages = error.graphQLErrors.map(e => e.message).join('\n')
        props.setError(messages)
      }
    }
  )

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({
      variables: {
        name,
        born: parseInt(born)
      }
    })

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      props.setError('author not found')
    }
  }, [result.data])

  return (
    !authors.loading && props.show &&
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option hidden>select an author</option>
            { authors.data.allAuthors.map(a =>
              <option
                key={a.name}
                value={a.name}
              >
                {a.name}
              </option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
