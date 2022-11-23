const Contenedor = require('../containers/cartContainer')

const cart = new Contenedor('../db/carts.json')
const   {CartDao} = require("../daos/index.js")


const router = require('express').Router();


const usuarios = require('../usuarios/usuarios')
/* Middleware para saber si es admin */
function isAdmin (req,res,next){
    
    // usuarios.isAdmin(req.body.key)
    //     .then(data=>{
    //         if (data === true){
                next()
    //         }
    //         else{
    //             res.json({error:"usuario no permitido"})
    //         }
    //     })
}

/* crea carrito y devuelve el id */
router.post('/cart', (req,res)=>{
    const carrito = req.body
    CartDao.save(carrito).then(e=> res.send(e))
})
/* vacia un carrrito y lo elimina */
router.delete('/cart/:id', (req,res)=>{
    CartDao.deleteById(req.params.id).then(e=>res.json(e))
})

/* listar todos los productos guardados del carrito */
router.get('/cart/:id/productos',(req,res)=>{
    CartDao.GetById(req.params.id).then(data=> res.send(data.productsIds))
})
/* para incorporar productos al carrito por su id */
router.post('/cart/:id/productos', (req,res)=>{
    const prod = req.body
    const editar = {id:req.params.id, prod: prod.prod}
    /* { id: '2', prod: 2 } */
    CartDao.editCart(editar).then(resp=>res.json(resp))

})
/* borra un prod del carrito por su id de carrito y prod */
router.delete('/cart/:id/productos/:id_prod', (req, res)=>{
    const ids = {id: req.params.id, idProd: req.params.id_prod}
    CartDao.deleteById(ids).then(e=> res.json(e))
})

router.get('/cart/admin',isAdmin, (req,res)=>{
    CartDao.getAll().then(resp=> res.json(resp))
})




module.exports = router
