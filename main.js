'use strict';
const express = require('express')
const app = express()

const Socket = require('socket.io')

const uuid = require('uuid').v4
// Server info setup
let info = {
    users: 0,

}
// Objects used as dictionary
let names = {}
let rooms = {}
var socketsRooms = {}
var socketData = {} // Struct: = {1:{room:'',name:''},2:{room:'',name:''}}
// Player info setup


/**
 * Will connect a socket to a specified room
 * @param socket A connected socket.io socket
 * @param room An object that represents a room from the `rooms` instance variable object
 */
const joinRoom = async (socket, room) => {
    room.sockets.push(socket);
    await socket.join(room.id)
    // store the room id in the socket for future use
    socketData[socket.id].room = room.id;
    console.log(socket.id, "Joined", room.id);
};


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
io.on('connection', (socket) => {

    console.log(`Hello, ${socket.id}}`)

    socket.on('newPlayer', function (data) {
        console.log(data)
        socketData[socket.id] = {
            room:'',
            name:data.name
        }
    })

    socket.on('createRoom', (roomName,callback) => {
        if(socketData[socket.id] == undefined){
            return;
        }
        const newRoom = {
            name: roomName,
            id: uuid(),
            sockets: []
        }
        rooms[newRoom.id] = newRoom
        joinRoom(socket, newRoom)
        console.log(rooms)
        callback(`LOBBY ID: ${newRoom.id}\nNAME: ${roomName}`)
    })

    socket.on('joinRoom', (roomId,callback) => {
        if(socketData[socket.id] == undefined){
            return;
        }
        const room = rooms[roomId];
        joinRoom(socket, room);
        console.log(rooms[roomId])
        callback(`LOBBY ID: ${roomId}\nNAME: ${room.name}`)
    });

    socket.on('sendText', (textValue) => {
        console.log(`Group id:\n${JSON.stringify(socketData[socket.id].room)}\nText: ${textValue}`)
        // const room = rooms[socket.roomId]
        // const roomSocketId = room.id
        io.to(socketData[socket.id].room).emit("textSend",{name:JSON.stringify(socketData[socket.id].name),text:textValue})
    })
})

