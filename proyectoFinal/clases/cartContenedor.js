const fs = require('fs')

class Contenedor{
    constructor(archivo){
        this.archivo=archivo

        /* Guarda producto */
    }async save(obj){
        await fs.promises.readFile(this.archivo, 'utf-8')
        .then(data=>{
            /* 
            
            obj = [{
                "id": 1,
                "userId": 2,
                "productsIds": [2, 5, 87, 6, 3, 1]
            }]

            */
            /* Lista del archivo carts.txt */
            let carts = JSON.parse(data)

            if(!obj.id){
                let flag = 0
                // Math.max(...data.map(o => o.y)) dice data.map is not a function
                carts.forEach(e=>{
                    e.id>flag?flag=e.id:null
                })
                obj.id = flag >0? flag + 1 : 1
            }
            carts.push(obj)
            fs.promises.writeFile(this.archivo, JSON.stringify(carts))   
            return obj.id
        })
        .catch(e=> console.log('error', e))
        return {"cartID": obj.id}
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


    // Mostrar Todos los carritos GET
    async getAll(){
        let carts = await fs.promises.readFile(this.archivo, 'utf-8')
        return JSON.parse(carts)
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