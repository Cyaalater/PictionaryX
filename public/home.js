// Making a socket to the server
var socket = io.connect('http://localhost:3000');


var nameInput  = document.querySelector("#name");
var nameButton = document.querySelector("#continue_name");

var createInput = document.getElementById('room');
var createButton = document.querySelector("#continue_room")

var joinInput = document.querySelector("#join");
var joinButton = document.querySelector("#join_room")

var textInput = document.querySelector("#text");
var textButton = document.querySelector("#send");

var messages = document.querySelector("#messages")

var players = document.querySelector(".column-right")

nameButton.addEventListener('click',() => {
    socket.emit('newPlayer',{name:nameInput.value},(dataText) => {
        messages.innerHTML += `<p>${dataText}</p>`
        joinInput.disabled = false;
        createInput.disabled = false;

    })
    console.log(nameInput.value)
})

joinButton.addEventListener('click',(evt) => {
    socket.emit('joinRoom',joinInput.value,(dataText) => {
        console.log(dataText)
        messages.innerHTML += `<p>${dataText.text}</p>`
        textInput.disabled = false;
        players.innerHTML += dataText.players.map((val) => {
            return `<p>${val}</p>`
        })
        console.log(dataText.players)
    })
})

textButton.addEventListener('click',(evt) => {
    socket.emit('sendText',textInput.value)
})

createButton.addEventListener('click',(event) => {
    socket.emit('createRoom',`${createInput.value}`,(dataText) => {
        console.log(dataText)
        messages.innerHTML += `<p>${dataText}</p>`
        textInput.disabled = false;
    })
})

socket.on('textSend',(data) => {
    messages.innerHTML += `<p>${data.name} >> ${data.text}</p>`
})

// socket.on('con',(data) => {
//     document.getElementById('data').innerHTML += `<p>|| ${data} || </p>`
// })

