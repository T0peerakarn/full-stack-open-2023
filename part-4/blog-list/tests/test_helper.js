const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0
    }
]

const normalBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
}

const likesMissingBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
}

const titleMissingBlog = {
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
}

const urlMissingBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    likes: 2
}

const initialUsers = [
    {
        username: "alice01",
        password: "1234",
        name: "Alice"
    },
    {
        username: "bob02",
        password: "1234",
        name: "Bob"
    }
]

const normalUser = {
    username: "catherine03",
    password: "1234",
    name: "Catherine"
}

const shortUsernameUser = {
    username: "03",
    password: "1234",
    name: "Catherine"
}

const shortPasswordUser = {
    username: "catherine03",
    password: "12",
    name: "Catherine"
}

module.exports = {
    initialBlogs,
    normalBlog,
    likesMissingBlog,
    titleMissingBlog,
    urlMissingBlog,
    initialUsers,
    normalUser,
    shortUsernameUser,
    shortPasswordUser
}