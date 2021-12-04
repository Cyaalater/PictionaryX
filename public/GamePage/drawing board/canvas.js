window.addEventListener('load',() =>{
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d');
    const colors = document.querySelectorAll('.color')
    const fill = document.querySelector('.fill')
    const erase = document.querySelector('.eraser')
    const colorsArr = ['black','red','green','blue','yellow','white'];
    //Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth * 0.9;
    
    //variables
    let painting = false;

    
    function startPosition(e){
        painting = true;
        draw(e);
    }
    function finishedPosition(){
        painting = false;
        ctx.beginPath();
    }
    function draw(e){
        if(!painting) return;
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX,e.clientY);
    }

     //EventListeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup',finishedPosition);
    canvas.addEventListener('mousemove',draw);
    fill.addEventListener('click',() => {
        ctx.fillStyle = fill.innerHTML.slice(19);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
    erase.addEventListener('click',()=> {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    for (let i = 0;i < colorsArr.length;i++) {
        const button = colors[i];
        button.addEventListener('click', function(event) {
            ctx.strokeStyle = colorsArr[i];
            fill.innerHTML =  `Set Background as: ${colorsArr[i]}`;
        });
    }
  
});
