import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Display from './components/Display'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState(null)
    const [isError, setIsError] = useState(false)

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
    
    const handleLogout = (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    const handleCreate = async (event) => {
        event.preventDefault()

        try {
            const blog = { title, author, url }
            const response = await blogService.create(blog)

            setBlogs(blogs.concat(response))

            setMessage(`a new blog \`${title} - ${author}\` has been added`)
            setIsError(false)

            setTitle('')
            setAuthor('')
            setUrl('')
            
            setTimeout(() => setMessage(null), 3000)
        }
        catch (error) {
            console.log('Unsuccessful create')
        }
    }

    useEffect(() => {
        if (user) {
            blogService
                .getAll()
                .then(blogs => setBlogs(blogs)) 
        }
    }, [user])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')

        if (loggedUser) {
            const user = JSON.parse(loggedUser)

            blogService.setToken(user.token)
            setUser(user)
        }
    }, [])

    return user === null
        ?   (
            <div>
                <h2>login to application</h2>
                <Notification
                    message={message}
                    isError={isError}
                />
                <Login 
                    handleLogin={handleLogin}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                />
            </div>
        )
        :   (
            <div>
                <h2>blogs application</h2>
                <Notification
                    message={message}
                    isError={isError}
                />
                <Display
                    name={user.name}
                    handleLogout={handleLogout}
                />
                <CreateBlog
                    title={title}
                    setTitle={setTitle}
                    author={author}
                    setAuthor={setAuthor}
                    url={url}
                    setUrl={setUrl}
                    handleCreate={handleCreate}
                />
                <Blogs
                    blogs={blogs}
                />
            </div>
        )
}

export default App