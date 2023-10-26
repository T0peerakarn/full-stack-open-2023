const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        const blogObject = new Blog(blog)
        await blogObject.save()
    }
}, 10000)

test('blog list application returns the correct amount of blog posts in the JSON format', async () => {
    const response = await api
                        .get('/api/blogs')
                        .expect(200)
                        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 10000)

test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api
                        .get('/api/blogs')
                        .expect(200)
                        .expect('Content-Type', /application\/json/)

    const isArrayUnique = arr => Array.isArray(arr) && new Set(arr).size === arr.length

    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    });
    expect(isArrayUnique(response.body.map(blog => blog.id))).toBeTruthy()
}, 10000)

test('make a post request', async () => {
    await api
        .post('/api/blogs')
        .send(helper.normalBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
}, 10000)

test('likes property is missing', async () => {
    const response = await api
                        .post('/api/blogs')
                        .send(helper.likesMissingBlog)
                        .expect(201)
                        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0)
}, 10000)

test('title or url properties are missing', async () => {

    await api
        .post('/api/blogs')
        .send(helper.titleMissingBlog)
        .expect(400)

    await api
        .post('/api/blogs')
        .send(helper.urlMissingBlog)
        .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 10000)

afterAll(async () => {
    await mongoose.connection.close()
})