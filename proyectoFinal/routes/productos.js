const Contenedor = require('../clases/class')

const usuarios = require('../usuarios/usuarios')

const productos = new Contenedor('./db/productos.txt')

const router = require('express').Router();

/* Middleware para saber si es admin */
function isAdmin (req,res,next){
    
    usuarios.isAdmin(req.body.key)
        .then(data=>{
            if (data === true){
                next()
            }
            else{
                res.json({error:"usuario no permitido"})
            }
        })
}

/* Traer todos los juegos o solo 1 */
router.get('/productos/:id?', (req,res)=>{
    if(req.params.id){
        productos.getAll().then(resp=>{
            resp.forEach(element => {
                if(element.id === Number(req.params.id)){
                    res.json(element)
                }
            })
        })
    }else{
        productos.getAll().then(resp=> res.json(resp))
    }    
})
/* Ingresar Juego */
router.post('/productos', isAdmin, (req,res)=>{
    const prod = req.body
    delete prod.key
    productos.save(prod).then(e=> res.json(e))
})

/* Enviar con ID - Editar juego por ID  */
router.put('/productos', isAdmin, (req,res)=>{
    const prod = req.body
    delete prod.key
    productos.editProd(prod).then(e=>res.json(e))
})

/* Enviar con ID - Borrar juego por ID  */
router.delete('/productos', isAdmin, (req,res)=>{
    const prod = req.body
    delete prod.key
    console.log(prod)
    productos.deleteById(prod).then(e=>res.json(e))
})


module.exports = router