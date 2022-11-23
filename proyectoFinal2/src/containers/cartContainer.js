const fs = require('fs')

class Contenedor{
    constructor(archivo){
        this.archivo=archivo

        /* Guarda cart */
    }async save(obj){
        await fs.promises.readFile(this.archivo, 'utf-8')
        .then(data=>{
            /* 
            
            obj = {
                "userId": 2,
                "productsIds": [2, 5, 87, 6, 3, 1]
            }

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

        /* Edita prods en carrito */
        async editCart(obj){
            try{
                const carritos = await this.getAll()
                const indexCart = carritos.findIndex(e => e.id == obj.id)
                if(indexCart == -1)return null
								
                let carritoFinal = carritos[indexCart]
                carritoFinal.productsIds = [
                  ...carritos[indexCart].productsIds,
									...obj.prod
								]
                carritos.splice(indexCart, 1, carritoFinal)
                fs.promises.writeFile(this.archivo, JSON.stringify(carritos))   
                
            }catch(e){
                console.log(e)
            }
        }


    // Mostrar Todos los carritos GET
    async getAll(){
        let carts = await fs.promises.readFile(this.archivo, 'utf-8')
        return JSON.parse(carts)
    }
    
    /* Borrar cart por id */
    async deleteById(id){
        let res
        await fs.promises.readFile(this.archivo, 'utf-8')
        .then(data=>{
            let prods = JSON.parse(data)
            for (const i of prods) {
                if(i.id===id){
                    prods.splice(prods.indexOf(i),1)
                    fs.promises.writeFile(this.archivo, JSON.stringify(prods))
                    return res =  {"success": "producto editado"}
                }
            }
        })
        .catch(e=>console.log('error', e))
        return res? res : {"error": "No se pudo editar el producto"}
}
    async getById(id){
        let prod
        await fs.promises.readFile(this.archivo, 'utf-8')
        .then(data=>{
            let prods = JSON.parse(data)
            for (const i of prods) {
                if(i.id===id){
                    return prod = i
                    
                }
            }
        })
        .catch(e=>console.log('error', e))
        return prod? prod: {"error": "producto no encontrado"}
    }
    async delProdId(ids){
        let res
        await fs.promises.readFile(this.archivo, 'utf-8')
        .then(data=>{
            let cart = JSON.parse(data)
            for (const i of cart) {
                if(i.id===ids.id){
                    console.log(i.productsIds.indexOf(ids.idProd))
                    if(i.productsIds.indexOf(ids.idProd) !== -1){
                        i.productsIds.splice(i.productsIds.indexOf(ids.idProd),1)
                    }
                    // cart.splice(cart.indexOf(i),1)
                    fs.promises.writeFile(this.archivo, JSON.stringify(cart))
                    return res =  {"success": "carrito editado"}
                }
            }
        })
        .catch(e=>console.log('error', e))
        return res? res : {"error": "No se pudo editar el carrito"}
    }
    
}



module.exports = Contenedor