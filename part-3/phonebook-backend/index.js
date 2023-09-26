const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token("body", request => (request.method === "POST") ? JSON.stringify(request.body) : "")

app.use(express.json())
app.use(express.static("dist"))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))
app.use(cors())

notes = [ 
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(notes)
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${notes.length} people<br/>${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    note ? response.json(note) : response.status(400).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) return response.status(400).json({ error: "content missing" })
    if (notes.find(note => note.name === body.name)) return response.status(400).json({ error: "name must be unique" })
    
    const note = {
        "id": Math.floor(Math.random() * 1000000 + 1),
        "name": body.name,
        "number": body.number
    }
    notes = notes.concat(note)

    response.send(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})