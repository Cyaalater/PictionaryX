const express = require('express')
const app = express()

const Socket = require('socket.io')

const uuid = require('uuid').v3
// Server info setup
let info = {
    users:0,

}
let names = {}
let rooms = {}
// Player info setup
class Player{
    constructor(sid,name) {
        this.sid = sid
        this.name = name
    }
    get all(){ return({sid:this.sid,name:this.name})}
}


// Express bullshittery

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', (req, res) => {
    res.sendFile('./src/home.html', { root: __dirname })
})
app.get('/game', (req, res) => {
    res.sendFile('./src/game.html', { root: __dirname })
})
app.get('/canvas', (req, res) => {
    res.sendFile('./src/canvas.html', { root: __dirname })
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
    io.sockets.emit('con',socket.id)
})

io.on('newPlayer',(socket) => {
    console.log(socket.id)
})

io.on('newRoom',(roomName,callback) => {
    const newRoom = {
        name: roomName,
        id: uuid(),
        sockets: []
    }
    rooms[newRoom.id] = newRoom
})