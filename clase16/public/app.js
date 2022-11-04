
const form = document.getElementById('form')
let msgs = document.getElementById('msgs')
let error = document.getElementById('error')
let formMsgInput = document.getElementById('formMsgInput')
let productosContainer = document.getElementsByClassName('productosContainer')[0]

/* Socket.io */
const socket = io()

// const formProd = document.getElementById('formProd')
// formProd.addEventListener('submit', e =>{
//     e.preventDefault()

// })


form.addEventListener('submit', e =>{
    e.preventDefault()
    if(e.target.sendUsu.value && e.target.sendMsg.value){
        error.innerText = ''
        
    let msgData = {
        nombre: e.target.sendUsu.value,
        mensaje: e.target.sendMsg.value
    }
    socket.emit('msgs', msgData )
    formMsgInput.value = ''
}
else{
    error.innerText = 'Error, no se pueden enviar mensajes vacios o sin nombre'
}

})

/* Al escribir mensaje mensaje */
socket.on('mensajes', data =>{
    msgs.appendChild(createDiv(data))
    msgs.scrollTo(0, msgs.scrollHeight)
})
/* el 'historial del chat' - al recargar o entrar nuevo usuario */
socket.on('historial', data =>{
    data.forEach(e => {
        msgs.appendChild(createDiv(e))
    });
})
socket.on('newProd',data=>{
    productosContainer.appendChild(newProd(data))
})


function createDiv (data){
    let div = document.createElement('div')
    div.innerHTML = `<p class="bluetext">${data.nombre}</p> <div class="flex">[<p class="redtext"> ${data.date} </p>] :</div> <p class="greentext">${data.mensaje}</p> `
    div.style.display = "flex"
    div.style.gap = "0.5rem"

    return div
}

function newProd (prod) {
    let div = document.createElement('div')

    div.innerHTML = `<div class="producto">
                        <div class="thumb">
                            <img src="${prod.thumbnail}" alt="">
                        </div>
                        <div class="nombreyprecio">
                            ${prod.name} <br>
                            ${prod.price != 0? `<p>$ ${prod.price}</p>` : `<p>FREE</p>`}
                        </div>
                        <div class="decrip">
                            ${prod.description}
                        </div>
                    </div>`
    return div


}