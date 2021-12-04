// Making a socket to the server
var socket = io.connect('http://localhost:3000');


var nameInput  = document.querySelector("#name");
var nameButton = document.querySelector("#continue_name");

nameButton.addEventListener('click',() => {
    socket.emit('newPlayer',`${nameInput.innerText}`)
})

document.getElementById('continue_room').addEventListener('click',(event) => {
    socket.emit('newRoom',`${document.getElementById('room').innerText}`)
})

// socket.on('con',(data) => {
//     document.getElementById('data').innerHTML += `<p>|| ${data} || </p>`
// })

