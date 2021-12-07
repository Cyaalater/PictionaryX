const table = document.querySelector("table");
const first = document.querySelector("#first");
const middle = document.querySelector("#middle");
const second = document.querySelector("#second");



for(let i = 0; i < 10;i++){
    const td = document.createElement("td")
    td.innerHTML = "dayan";
    first.append(td);
}


for(let i = 0; i < 8;i++){
    
    for(let j = 0; j < 2;j++){
        const td = document.createElement("td");
        td.innerHTML = "dayan";
        middle.append(td);
    }
}
for(let i = 0; i < 10;i++){
    const td = document.createElement("td")
    td.innerHTML = "dayan";
    second.append(td);
}