const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initailly blogs in db', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        // for (let blog of helper.initialBlogs) {
        //     const blogObject = new Blog(blog)
        //     await blogObject.save()
        // }
    }, 30000)

    test('get the correct amount of blog posts in the JSON format', async () => {
        const response = await api
                            .get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    }, 30000)

    test('get unique identifier property of the blog posts (id)', async () => {
        const response = await api
                            .get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)

        const isArrayUnique = arr => Array.isArray(arr) && new Set(arr).size === arr.length

        response.body.forEach(blog => {
            expect(blog.id).toBeDefined()
        });
        expect(isArrayUnique(response.body.map(blog => blog.id))).toBeTruthy()
    }, 30000)

    test('post a normal blog', async () => {
        await api
            .post('/api/blogs')
            .send(helper.normalBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    }, 30000)

    test('post a blog that missing likes property', async () => {
        const response = await api
                            .post('/api/blogs')
                            .send(helper.likesMissingBlog)
                            .expect(201)
                            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toEqual(0)
    }, 30000)

    test('post a blog that missing title or url properties', async () => {
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
    }, 30000)

    test('delete an existing blog', async () => {
        const oldResponse = await api.get('/api/blogs')

        await api
            .delete(`/api/blogs/${oldResponse.body[0].id}`)
            .expect(204)
        
        const newResponse = await api.get('/api/blogs')

        expect(newResponse.body).toHaveLength(helper.initialBlogs.length - 1)
    }, 30000)

    test('delete a non-existing blog', async () => {
        const oldResponse = await api.get('/api/blogs')

        await api
            .delete(`/api/blogs/${oldResponse.body[0].id}`)
            .expect(204)
        
        await api
            .delete(`/api/blogs/${oldResponse.body[0].id}`)
            .expect(404)
        
        const newResponse = await api.get('/api/blogs')

        expect(newResponse.body).toHaveLength(helper.initialBlogs.length - 1)
    }, 30000)

    test('patch a 100-likes to the first blog', async () => {
        const oldResponse = await api.get('/api/blogs')

        const blog = await api
                        .patch(`/api/blogs/${oldResponse.body[0].id}`)
                        .send({ likes: 100 })
                        .expect(200)
        
        expect(blog.body.likes).toEqual(100)
    }, 30000)

    test('patch a 100-likes to a non-existent id', async () => {
        const oldResponse = await api.get('/api/blogs')

        await api
            .delete(`/api/blogs/${oldResponse.body[0].id}`)
            .expect(204)

        await api
            .patch(`/api/blogs/${oldResponse.body[0].id}`)
            .send({ likes: 100 })
            .expect(404)
    }, 30000)
})

describe('when there is an authorization', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
    }, 30000)

    test('post a normal blog with authorization', async () => {
        const loginResponse = await api
            .post('/api/login')
            .send({ username: "alice01", password: "1234" })
        
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loginResponse.body.token}`)
            .send(helper.normalBlog)
            .expect(201)
    }, 30000)

    test('post a normal blog without authorization', async () => {
        await api
            .post('/api/blogs')
            .send(helper.normalBlog)
            .expect(401)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})