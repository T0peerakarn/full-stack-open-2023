import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ currentUser, blogs, setBlogs, setMessage, setIsError }) => {

    const removeHandler = async b => {
        if (window.confirm(`Remove blog ${b.title} - ${b.author}?`)) {
            await blogService.remove(b.id)

            setBlogs(blogs.filter(blog => blog.id !== b.id))

            setMessage('The blog has been removed')
            setIsError(false)
            setTimeout(() => setMessage(null), 3000)
        }
    }

    return (
        <div>
            <h2>your blogs</h2>
            {
                blogs
                    ? blogs
                        .sort((a, b) => a.likes - b.likes)
                        .map(blog => <Blog
                            key={blog.id}
                            currentUser={currentUser}
                            blog={blog}
                            removeHandler={removeHandler} />)
                    : <></>
            }
        </div>
    )
}

export default Blogs