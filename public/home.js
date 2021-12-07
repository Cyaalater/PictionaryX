// Making a socket to the server
var socket = io.connect('http://localhost:3000');

var body = document.body



var nameDiv = document.getElementsByName("name_div")
var nameInput  = document.querySelector("#name");
var nameButton = document.querySelector("#continue_name");

var createDiv = document.createElement("div", {id:"create_div"})
var createInput = Object.assign(document.createElement("input"),{id:'room',type:'text',placeholder:"Put lobby's name"});
var createButton = Object.assign(document.createElement("button"),{id:"continue_room"})
createDiv.append(createInput,createButton)
createDiv.id = "create_div"

var joinDiv = document.createElement("div", {id:"join_div"})
var joinInput = Object.assign(document.createElement("input"),{id:"join",type:'text',placeholder:"Put lobby's id"});
var joinButton = Object.assign(document.createElement("button"),{id:"join_room"})
joinDiv.append(joinInput,joinButton)
joinDiv.id = "join_div"

var chatDiv = document.createElement("div",{id:"chat"})
var textInput = document.createElement("input",{id:"text",type:"text",placeholder:"Enter text"});
var textButton = document.createElement("button",{id:"send"});
var messages = document.createElement("div",{id:"messages"})
chatDiv.append(textInput,textButton,messages)
chatDiv.id = "chat"


var playersList = document.querySelector(".column-right") 
var players = [] // Player names

nameButton.addEventListener('click',() => {
    socket.emit('newPlayer',{name:nameInput.value},(dataText) => {
        messages.innerHTML += `<p>${dataText}</p>`
        joinInput.disabled = false;
        createInput.disabled = false;
        
    })
    body.append(createDiv,joinDiv)
    body.remove()
    console.log(nameInput.value)
})

joinButton.addEventListener('click',(evt) => {
    socket.emit('joinRoom',joinInput.value,(dataText) => {
        console.log(dataText)
        messages.innerHTML += `<p>${dataText.text}</p>`
        textInput.disabled = false;
        players = dataText.players
        playersList.innerHTML += dataText.players.map((val) => {
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


// Divs are pretty cool




{/* <h1>Enter a name</h1>
<div class="column-main">
    <div class="column-left">
        <div>
            <input type="text" id="name" placeholder="Put name">
            <button id="continue_name">Continue</button>
        </div>
        <h1>Create a room</h1>
        <div>
            <input type="text" id="room" placeholder="Put room name" disabled="true">
            <button id="continue_room">Create</button>
        </div>
        <h1>Join a room</h1>
        <div>
            <input type="text" id="join" placeholder="Put room name" disabled="true">
            <button id="join_room">Join</button>
        </div>
    </div>
    <div class="column-right">
    </div>
</div>
<div id="chat">
    <div id="messages"></div>
    <input type="text" id="text" placeholder="Enter text" disabled="true">
    <button id="send">Send</button>
</div> */}