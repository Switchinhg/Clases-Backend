const fs = require('fs')

class Contenedor{
    constructor(archivo){
        this.archivo=archivo

        /* Guarda producto */
    }async save(obj){
        obj.price = Number(obj.price)
        await fs.promises.readFile(this.archivo, 'utf-8')
        .then(data=>{
            let prods = JSON.parse(data)
            if(!obj.id){
                let flag = 0
                prods.forEach(e=>{
                    e.id>flag?flag=e.id:null
                })
                obj.id = flag >0? flag + 1 : 1
            }
            prods.push(obj)
            fs.promises.writeFile(this.archivo, JSON.stringify(prods))   
        })
        .catch(e=> console.log('error', e))
    }

        /* Edita el producto */
        async editProd(prod){
            this.getAll()
                .then(resp=>{
                    resp.forEach(element => {
                        if(element.id === prod.id){
                            resp.splice(element.indexOf(i),1)
                            fs.promises.writeFile(this.archivo, JSON.stringify(resp))
                        }
                    })
                })
            }


    // Mostrar Todos los Productos
    async getAll(){
        let productos = await fs.promises.readFile(this.archivo, 'utf-8')
        return JSON.parse(productos)
    }
    
    /* Borrar prod por id */
    async deleteById(id){
        await fs.promises.readFile(this.archivo, 'utf-8')
        .then(data=>{
            let prods = JSON.parse(data)
            for (const i of prods) {
                if(i.id===id){
                    prods.splice(prods.indexOf(i),1)
                    fs.promises.writeFile(this.archivo, JSON.stringify(prods))
                }
            }
        })
        .catch(e=>console.log('error', e))
}}

module.exports = Contenedor