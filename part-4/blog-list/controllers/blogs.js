const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const title = request.body.title
    const url = request.body.url

    if (!title || !url) return response.status(400).end()

    const newBlog = new Blog(request.body)
    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndRemove(request.params.id)
    response.status(blog ? 204 : 404).end()
})

blogsRouter.patch('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.status(blog ? 200 : 404).json(blog)
})

module.exports = blogsRouter

  