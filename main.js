'use strict';
const express = require('express')
const app = express()

const Socket = require('socket.io')

const uuid = require('uuid').v4

// Objects used as dictionary
let rooms = {}
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
app.get('/game', (req, res) => {
    res.sendFile('./src/game.html', { root: __dirname })
})
app.get('/canvas', (req, res) => {
    res.sendFile('./src/canvas.html', { root: __dirname })
})

app.get('/test',(req,res) => {
    res.sendFile('./src/test.html', {root:__dirname})
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

    socket.on('newPlayer', function (data,callback) {
        console.log(data)
        if (data.name.length < 6) {return;} // Name length needs to be above 6 letters
        socketData[socket.id] = {
            room:'',
            name:data.name
        }
        callback(`Your name has been set to ${data.name}`)
    })

    socket.on('createRoom', (roomName,callback) => {
        if(socketData[socket.id] == undefined){
            return;
        } // Mitigation to ignore any socket that contains no data in the server
        else if(roomName.length < 4) {return;} // Lobby Name length needs to be above 4 letters
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

    socket.on('joinRoom', async (roomId,callback) => {
        if(socketData[socket.id] == undefined){
            return;
        } // Mitigation to ignore any socket that contains no data in the server
        else if(rooms[roomId] == undefined) {return;}
        // Mitigation to ignore socket that suggest non-existant lobby id
        const room = rooms[roomId];
        await joinRoom(socket, room);
        console.log(rooms[roomId])
        callback({
            text:`LOBBY ID: ${roomId}\nNAME: ${room.name}`,
            players: rooms[roomId].sockets.map((sock) => {
                if(socketData[sock.id].room == roomId){
                    return socketData[sock.id].name
                }
            })
        })
    });

    socket.on('sendText', (textValue) => {
        if(socketData[socket.id] == undefined) {return;} // Mitigation to ignore any socket that contains no data in the server
        console.log(`Group id:\n${JSON.stringify(socketData[socket.id].room)}\nText: ${textValue}`)
        // const room = rooms[socket.roomId]
        // const roomSocketId = room.id
        io.to(socketData[socket.id].room).emit("textSend",{name:socketData[socket.id].name,text:textValue})
    })
})

