const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    
    response.json(blogs)
})
  
router.post('/', async (request, response) => {
    const user = request.user
    if (!user) return response.status(401).json({ error: 'operation not permitted' })

    const { title, author, url, likes } = request.body
    const newBlog = new Blog({
        title,
        author,
        url, 
        likes: likes ? likes : 0,
        user: user._id
    })
    const savedBlog = await newBlog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if (!user || blog.user.toString() !== user.id.toString()) return response.status(401).json({ error: 'operation not permitted' })

    user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
    await user.save()

    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
})

router.put('/:id', async (request, response) => {
    const user = request.user
    if (!user) return response.status(401).json({ error: 'operation not permitted' })

    const { title, url, author, likes } = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, url, author, likes, user }, { new: true })

    response.json(updatedBlog)
})

module.exports = router