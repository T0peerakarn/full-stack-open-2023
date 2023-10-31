import Blog from './Blog'

const Blogs = ({ blogs }) => {
    return (
        <div>
            <h2>your blogs</h2>
            { blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
        </div>
    )
}

export default Blogs