const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initial users in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        for (let user of helper.initialUsers) {
            await api
                .post('/api/users')
                .send(user)
        }
    }, 30000)

    test('post a normal user', async () => {
        await api
            .post('/api/users')
            .send(helper.normalUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/users')

        expect(response.body).toHaveLength(helper.initialUsers.length + 1)
        expect(response.body.map(user => user.username)).toContain(helper.normalUser.username)
    }, 30000)

    test('post short-username and short-password users', async() => {
        await api
            .post('/api/users')
            .send(helper.shortUsernameUser)
            .expect(400)
        
        await api
            .post('/api/users')
            .send(helper.shortPasswordUser)
            .expect(400)
        
        const response = await api.get('/api/users')

        expect(response.body).toHaveLength(helper.initialUsers.length)
    }, 30000)
})

afterAll(async () => {
    await mongoose.connection.close()
})