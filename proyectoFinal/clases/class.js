const e = require('express')
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
                /* buscar la id mas alta o ponerle 1 */
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
        return {"success":"Producto agregado correctamente"}
    }
    
        /* Edita el producto */
        async editProd(prod){
            let res 
            this.getAll()
                .then(resp=>{
                    const resultado = resp.find((elem)=> elem.id===prod.id)
                    if(resultado){
                        resp.splice(resp.indexOf(resultado),1,prod)
                        fs.promises.writeFile(this.archivo, JSON.stringify(resp))
                        return res =  {"success": "producto editado"}
                    }else{
                        return res =  {"error": "No se pudo editar el producto"}
                    }
                })
            .catch(e=>console.log('error', e))
            return res
            }


    // Mostrar Todos los Productos
    async getAll(){
        let productos = await fs.promises.readFile(this.archivo, 'utf-8')
        return JSON.parse(productos)
    }
    
    /* Borrar prod por id */
    async deleteById(id){
        let res
        await fs.promises.readFile(this.archivo, 'utf-8')
        .then(data=>{
            let prods = JSON.parse(data)
            for (const i of prods) {
                if(i.id===id.id){
                    prods.splice(prods.indexOf(i),1)
                    fs.promises.writeFile(this.archivo, JSON.stringify(prods))
                    return res =  {"success": "producto borrado"}
                }
            }
        })
        .catch(e=>console.log('error', e))
        return res? res : {"error": "No se pudo editar el producto"}
}}

module.exports = Contenedor