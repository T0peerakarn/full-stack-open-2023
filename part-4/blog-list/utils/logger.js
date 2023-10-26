
const info = async (...params) => console.log(...params)

const error = async (...params) => console.log(...params)

module.exports = {
    info,
    error
}