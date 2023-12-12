import { useState } from 'react'
import ToggleDetail from './ToggleDetail'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ currentUser, blog, removeHandler }) => {

    const [likes, setLikes] = useState(blog.likes)

    const likeHandler = async () => {

        setLikes(likes + 1)

        const updatedBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: likes + 1,
            user: blog.user.id,
        }

        await blogService.update(blog.id, updatedBlog)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} - {blog.author}
                &nbsp;
                <ToggleDetail showLabel='view' hideLabel='hide'>
                    <div>
                        <p>url: {blog.url}</p>
                        <p>likes: {likes} <button onClick={likeHandler}>like</button></p>
                        <p>added by {blog.user.name}</p>
                        {
                            currentUser.username === blog.user.username
                                ? <button onClick={() => removeHandler(blog)}>remove</button>
                                : <></>
                        }
                    </div>
                </ToggleDetail>
            </div>
        </div>
    )
}

Blog.propTypes = {
    currentUser: PropTypes.object.isRequired,
    blog: PropTypes.object.isRequired,
    removeHandler: PropTypes.func.isRequired
}

export default Blog