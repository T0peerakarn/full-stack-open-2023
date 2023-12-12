import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const Login = ({ setUser, setMessage, setIsError }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password
            })

            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        }
        catch (error) {
            setMessage('invalid username or password')
            setIsError(true)
            setTimeout(() => setMessage(null), 3000)
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username <input
                        type='text'
                        value={username}
                        name='username'
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    password <input
                        type='password'
                        value={password}
                        name='password'
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <button type='submit'>login</button>
                </div>
            </form>
        </div>
    )
}

export default Login