const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const { title, url } = request.body

    if (!title || !url) return response.status(400).end()

    const decodedToken = request.token
        ? jwt.verify(request.token, process.env.SECRET)
        : undefined
    if (!(decodedToken && decodedToken.id)) return response.status(401).json({ error: 'token invalid' })

    const user = request.user

    const newBlog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user.id
    })
    const savedBlog = await newBlog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) return response.status(401).json({ error: 'token invalid' })

    const blog = await Blog.findByIdAndRemove(request.params.id)

    const user = request.user
    user.blogs = user.blogs.filter(blog => blog.id !== request.params.id)
    await user.save()

    response.status(blog ? 204 : 404).end()
})

blogsRouter.patch('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.status(blog ? 200 : 404).json(blog)
})

module.exports = blogsRouter

  