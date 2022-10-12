const fs = require('fs')
class Contenedor{
    constructor(archivo){
        this.archivo=archivo

        /* Guarda producto */
    }async save(obj){
        await fs.promises.readFile(this.archivo, 'utf-8')
        .then(data=>{
            let prods = JSON.parse(data)
            if(!obj.id){
                obj.id = prods.length >0? prods.length + 1 : 1
            }
            console.log('id asignado: ',obj.id)
            prods.push(obj)
            fs.promises.writeFile('./productos.txt', JSON.stringify(prods))          
        })
        .catch(e=> console.log('error', e))
    }

    /* Edita el producto */
    async editProd(prod){
        this.getAll()
            .then(resp=>{
                resp.forEach(element => {
                    if(element.id === prod.id){
                        p.deleteById(prod.id)
                        setTimeout(() => {
                            p.save(prod)
                        }, 1000);
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
                    fs.promises.writeFile('./productos.txt', JSON.stringify(prods))
                }
            }
        })
        .catch(e=>console.log('error', e))
}
}

let p = new Contenedor('./productos.txt')

const router = require('express').Router();

/* Router api/productos */
router.get('/productos', (req,res ) =>{
    p.getAll().then(resp=>res.send(resp))
})
/* Router api/productos/2 */
router.get('/productos/:id', (req,res ) =>{
    p.getAll().then(resp=>{
        resp.forEach(element => {
            if(element.id === Number(req.params.id)){
                res.send(element)
            }
        })
        res.send()
    })
})
router.post('/productos',(req,res)=>{
    p.save(req.body)
    .then(res.json({agregado:true}))
})
router.put('/productos/:id',(req,res)=>{
    const id = Number(req.params.id)
    const prod = req.body
    prod.id= id
    id?
    p.editProd(prod)
        .then(res.json({"cambiado": true}))
    : 
    res.json({"error": 'no pudo editarse'})

})
router.delete('/productos/:id',(req,res)=>{
    p.deleteById(Number(req.params.id)).then(res.json({borrado:true}) )
})

module.exports = router