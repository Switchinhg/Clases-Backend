
const fs = require('fs')


class Contenedor{
    constructor(archivo){
        this.archivo=archivo
    }

    // Guardar Producto 
    async save(obj){
            await fs.promises.readFile(this.archivo, 'utf-8')
            .then(data=>{
                let prods = JSON.parse(data)
                obj.id = prods.length >0? prods[prods.length-1].id  + 1 : 1
                console.log('id asignado: ',obj.id)
                prods.push(obj)
                fs.promises.writeFile('./productos.txt', JSON.stringify(prods))          
            })
            .catch(e=> console.log('error', e))
    }
    
    // Buscar Productos por ID
    async getById(id){
            await fs.promises.readFile(this.archivo, 'utf-8')
            .then(data=>{
                if(!data) return console.log(null)
                let prods = JSON.parse(data)
                let flag = 1
                
                for (const i of prods) {
                    if(i.id===id){
                        console.log(i)
                        flag=0
                            break;
                    }
                }
                if(flag===1) return console.log(null)
            })
            .catch(e=>console.log('error', e))
    }
    // Mostrar Todos los Productos
    async getAll(){
            await fs.promises.readFile(this.archivo, 'utf-8')
            .then(data=>{
                if(!data) return console.log(null)
                let prods = JSON.parse(data)
                
                for (const i of prods) {
                    console.log(i)
                    
                }
            })
            .catch(e=>console.log('error', e))

    }
    // Borrar Producto por ID
    async deleteById(id){
            await fs.promises.readFile(this.archivo, 'utf-8')
            .then(data=>{
                if(!data) return console.log(null)
                let prods = JSON.parse(data)
                
                
                for (const i of prods) {
                    if(i.id===id){
                        prods.splice(prods.indexOf(i),1)
                        console.log('borrado')
                        fs.promises.writeFile('./productos.txt', JSON.stringify(prods))
                    }
                }
            })
            .catch(e=>console.log('error', e))
    }
    // Borrar todos los Productos
    async deleteAll(){
        await fs.promises.writeFile('./productos.txt', JSON.stringify([]))
        .catch(e=>console.log('error', e))
    }

}


let p = new Contenedor('./productos.txt')

// Producto
const prod= {name:'Minecraft', price:29.99,description:'Minecraft is a 3-D computer game where players can build anything.',thumbnail:'https://www.minecraft.net/content/dam/games/minecraft/key-art/MC_One-Vanilla_285x380px.jpg'}

// Guardar Producto 
p.save(prod)

// Buscar Productos por ID
// p.getById(9)

// Borrar Producto por ID
// p.deleteById(3)

// Borrar todos los Productos
// p.deleteAll()

// Mostrar Todos los Productos
// p.getAll()