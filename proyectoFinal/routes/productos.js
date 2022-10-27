const Contenedor = require('../contenedor/class')

const usuarios = require('../usuarios/usuarios')

const router = require('express').Router();

let productos = new Contenedor('./db/productos.txt')


/* Middleware para saber si es admin */
async function isAdmin (req,res,next){
    await usuarios.isAdmin(req.body.key)
        .then(data=>{
            console.log(data)
        })

    next()
}


router.get('/productos/:id?', (req,res)=>{
    if(req.params.id){
        productos.getAll().then(resp=>{
            resp.forEach(element => {
                if(element.id === Number(req.params.id)){
                    res.send(element)
                }
            })
            res.json({error:'producto no encontrado'})
        })
    }else{
        productos.getAll().then(resp=> res.json(resp))
    }    
})

router.post('/productos', isAdmin, (req,res)=>{
    console.log('entre a post')
})


module.exports = router