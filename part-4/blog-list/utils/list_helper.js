const lodash = require('lodash')

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    return blogs
            .reduce((prv, cur) => prv + cur.likes, 0)
}

const favoriteBlog = blogs => {

    const format = blog => Object({ title: blog.title, author: blog.author, likes: blog.likes})

    return blogs
            .reduce((prv, cur) => prv === null ? format(cur) : prv.likes < cur.likes ? format(cur) : prv, null)
}

const mostBlogs = blogs => {

    const data = lodash.countBy(blogs, 'author')
    const format = author => Object({ author: author, blogs: data[author]})

    return Object
            .keys(data)
            .reduce((prv, cur) => prv === null ? format(cur) : prv.blogs < data[cur] ? format(cur) : prv, null)
}

const mostLikes = blogs => {

    const data = lodash.groupBy(blogs, 'author')
    const format = author => Object({ author: author, likes: data[author].reduce((prv, cur) => prv + cur.likes, 0) })

    return blogs.length === 0 ? null : lodash.maxBy(Object.keys(data).map(author => format(author)), x => x.likes)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}