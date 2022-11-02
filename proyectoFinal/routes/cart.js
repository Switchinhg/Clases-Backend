const Contenedor = require('../clases/cartContenedor')

const cart = new Contenedor('./db/carts.txt')

const router = require('express').Router();

/* crea carrito y devuelve el id */
router.post('/cart', (req,res)=>{
    const carrito = req.body
    cart.save(carrito).then(e=> res.send(e))
})
/* vacia un carrrito y lo elimina */
router.delete('/cart/:id', (req,res)=>{
    cart.deleteById(Number(req.params.id)).then(e=>res.json(e))
})

/* listar todos los productos guardados del carrito */
router.get('/cart/:id/productos',(req,res)=>{
    cart.getById(Number(req.params.id)).then(data=> res.send(data.productsIds))
})
/* para incorporar productos al carrito por su id */
router.post('/cart/:id/productos', (req,res)=>{
    const prod = req.body
    const editar = {id:Number(req.params.id), prod: prod.prod}
    /* { id: '2', prod: 2 } */
    cart.editCart(editar).then(resp=>res.json(resp))

})
/* borra un prod del carrito por su id de carrito y prod */
router.delete('/cart/:id/productos/:id_prod', (req, res)=>{
    const ids = {id: Number(req.params.id), idProd: Number(req.params.id_prod)}
    cart.delProdId(ids).then(e=> res.json(e))
})




module.exports = router
