var socket = io.connect('http://localhost:3000');

window.addEventListener('load',() =>{
    const _ = document.getElementById('canvas')
    const boundingRect = _.getBoundingClientRect();

    const canvas = new fabric.Canvas('canvas')
    canvas.setWidth(boundingRect.width);
    canvas.setHeight(boundingRect.height)

    const colors = document.querySelectorAll('.color')
    const fill = document.querySelector('.fill')
    const erase = document.querySelector('.eraser')
    const colorsArr = ['black','red','green','blue','yellow','white'];

    canvas.isDrawingMode = true

    canvas.on('mouse:up',() => {
        socket.emit('canvas',canvas.toJSON())
    })
    for (let i = 0;i < colorsArr.length;i++) {
        const button = colors[i];
        button.addEventListener('click', function(event) {
            ctx.strokeStyle = colorsArr[i];
            fill.innerHTML =  `Set Background as: ${colorsArr[i]}`;
        });
    }
  
});
