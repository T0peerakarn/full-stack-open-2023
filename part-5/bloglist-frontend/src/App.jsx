import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Display from './components/Display'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'

const App = () => {

    const [blogs, setBlogs] = useState(null)
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [isError, setIsError] = useState(false)

    const handleLogout = (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')

        if (loggedUser) {
            const user = JSON.parse(loggedUser)

            blogService.setToken(user.token)
            setUser(user)
        }
    }, [])

    useEffect(() => {
        if (user) {
            blogService
                .getAll()
                .then(blogs => setBlogs(blogs))
        }
    }, [user])

    return user === null
        ?   (
            <div>
                <h2>login to application</h2>
                <Notification
                    message={message}
                    isError={isError}
                />
                <Login
                    setUser={setUser}
                    setMessage={setMessage}
                    setIsError={setIsError}
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
                <Togglable showLabel='new blog' hideLabel='cancel'>
                    <CreateBlog
                        user={user}
                        blogs={blogs}
                        setBlogs={setBlogs}
                        setMessage={setMessage}
                        setIsError={setIsError}
                    />
                </Togglable>
                <Blogs
                    currentUser={user}
                    blogs={blogs}
                    setBlogs={setBlogs}
                    setMessage={setMessage}
                    setIsError={setIsError}
                />
            </div>
        )
}

export default App