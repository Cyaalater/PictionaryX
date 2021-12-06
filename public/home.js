// Making a socket to the server
var socket = io.connect('http://localhost:3000');


var nameInput  = document.querySelector("#name");
var nameButton = document.querySelector("#continue_name");

var joinInput = document.querySelector("#join");
var joinButton = document.querySelector("#join_room")

var textInput = document.querySelector("#text");
var textButton = document.querySelector("#send");

var messages = document.querySelector("#messages")

nameButton.addEventListener('click',() => {
    socket.emit('newPlayer',{name:nameInput.value})
    console.log(nameInput.value)
})

joinButton.addEventListener('click',(evt) => {
    socket.emit('joinRoom',joinInput.value,(dataText) => {
        console.log(dataText)
    })
})

textButton.addEventListener('click',(evt) => {
    socket.emit('sendText',textInput.value)
})

document.getElementById('continue_room').addEventListener('click',(event) => {
    socket.emit('createRoom',`${document.getElementById('room').value}`,(dataText) => {
        console.log(dataText)
    })
})

socket.on('textSend',(data) => {
    messages.innerHTML += `<p>${data.name} || ${data.text}</p>`
})

// socket.on('con',(data) => {
//     document.getElementById('data').innerHTML += `<p>|| ${data} || </p>`
// })

