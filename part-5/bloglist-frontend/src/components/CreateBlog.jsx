import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ user, blogs, setBlogs, setMessage, setIsError,  }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = async (event) => {
        event.preventDefault()

        try {
            const blog = { title, author, url }
            const response = await blogService.create(blog)

            setBlogs(blogs.concat({
                ...response,
                user: {
                    id: response.user,
                    username: user.username,
                    name: user.name
                }
            }))

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

    return (
        <div>
            <h2>create new</h2>
            <form>
                <div>
                    title <input
                        type='text'
                        value={title}
                        name='title'
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>
                <div>
                    author <input
                        type='text'
                        value={author}
                        name='author'
                        onChange={event => setAuthor(event.target.value)}
                    />
                </div>
                <div>
                    url <input
                        type='text'
                        value={url}
                        name='url'
                        onChange={event => setUrl(event.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleCreate}>create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBlog

