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
                let flag = 0
                prods.forEach(e=>{
                    e.id>flag?flag=e.id:null
                })
                obj.id = flag >0? flag + 1 : 1
            }
            console.log('id asignado: ',obj.id)
            prods.push(obj)
            fs.promises.writeFile('./productos.txt', JSON.stringify(prods))   
        })
        .catch(e=> console.log('error', e))
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
router.get('/', (req,res ) =>{

    p.getAll().then(data=> res.render('view/listaprods', {data}))
    
})

/* Router api/productos/2 */

router.post('/',(req,res)=>{
    p.save(req.body)
    .then(res.redirect('/productos'))
})

router.delete('/:id',(req,res)=>{
    p.deleteById(Number(req.params.id)).then(res.json({borrado:true}) )
})





module.exports = router