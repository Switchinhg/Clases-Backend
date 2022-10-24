const sendProd = require('../server')

const Contenedor = require('./classContenedor')


let p = new Contenedor('./productos.txt')

const router = require('express').Router();

/* Router api/productos */
router.get('/', (req,res ) =>{

    p.getAll().then(data=> res.render('view/form', {data}))
    
})

/* Router api/productos/2 */

router.post('/',(req,res)=>{
    p.save(req.body)
    .then(sendProd.newProd(req.body))
    .then(res.redirect('/'))
})

router.delete('/:id',(req,res)=>{
    p.deleteById(Number(req.params.id)).then(res.json({borrado:true}) )
})





module.exports = router