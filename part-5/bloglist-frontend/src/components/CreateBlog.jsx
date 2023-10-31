const CreateBlog = ({ title, setTitle, author, setAuthor, url, setUrl, handleCreate }) => {
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

