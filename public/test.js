const AppendBody = () => {
    let body = document.getElementById("main-body")
    let actualBody = document.body;

    let para = document.createTextNode("gaming")
    actualBody.append(para)
}