const express = require('express')
const app = express()

const Socket = require('socket.io')



// Express bullshittery

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', (req, res) => {
    res.sendFile('./src/home.html', { root: __dirname })
})

app.use((req, res) => {
    res.sendFile('./src/404.html', { root: __dirname });
})

let server = app.listen(3000, () => {
    console.log("Now listening to port 3000")
})

// Socketio bullshittery
var io = Socket(server)
io.on('connection',(socket) => {
    console.log(`Hello, ${socket.id}}`)
})