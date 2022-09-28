const express = require('express')
const fs = require('fs')


// Inicializo express
const app = express()
const port = 8080

class Contenedor{
    constructor(archivo){
        this.archivo=archivo
    }
    // Mostrar Todos los Productos
    async getAll(){
        let productos = await fs.promises.readFile(this.archivo, 'utf-8')
        return JSON.parse(productos)
    }
}
let p = new Contenedor('./productos.txt')


const randomNum = (maximo) =>{
    return parseInt(Math.random() * maximo)
}

/* ruta /productos */
app.get('/productos', (req,res)=>{ 
    p.getAll().then(resp=>res.send(resp))
})

/* ruta /productoRandom */
app.get('/productoRandom', (req,res)=>{
    p.getAll()
        .then(productos=> res.send(productos[randomNum(productos.length)]))
})
/* toda otra ruta */

app.all('*', (req,res)=>res.send('Esta ruta no existe!'))

const server = app.listen(port, ()=>{
    console.log('escuchando')
})

/* si falla:  */

server.on('error',error=>console.log(error))
