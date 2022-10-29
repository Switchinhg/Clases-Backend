const Contenedor = require('../clases/cartContenedor')

const cart = new Contenedor('./db/carts.txt')

const router = require('express').Router();

router.post('/cart', (req,res)=>{
    const carrito = req.body
    cart.save(carrito).then(e=> res.send(e))
})

router.delete('/cart/:id?', (res,req)=>{
    console.log(req.params.id)
})





module.exports = router
