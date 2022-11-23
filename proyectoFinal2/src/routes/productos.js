const Contenedor = require('../containers/prodsContainer')


const   {ProductDao} = require("../daos/index.js")

const usuarios = require('../usuarios/usuarios')

// const productos = new Contenedor('../containers/ProdsMongoContainer.js')

const router = require('express').Router();

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

/* Traer todos los juegos o solo 1 */
router.get('/productos/:id?', (req,res)=>{


    if(req.params.id){
        ProductDao.getAll().then(resp=>{
            resp.forEach(element => {
                if(element.id === req.params.id){
                    res.json(element)
                }
            })
        })
    }else{
        ProductDao.getAll().then(resp=> res.json(resp))
    }    
})
/* Ingresar Juego */
router.post('/productos', isAdmin, (req,res)=>{
    const prod = req.body
    delete prod.key
    ProductDao.save(prod).then(e=> res.json(e))
})

/* Enviar con ID - Editar juego por ID  */
router.put('/productos', isAdmin, (req,res)=>{
    const prod = req.body
    delete prod.key
    ProductDao.editProd(prod).then(e=>res.json(e))
})

/* Enviar con ID - Borrar juego por ID  */
router.delete('/productos/:id?', isAdmin, (req,res)=>{

    if(req.params.id){
    ProductDao.deleteById(req.params.id).then(e=>res.json(e))
    }else{
        res.json({error:'error'})
    }    

/* 
{
              "key": "testKEY",
              "id": "637d68a7d57b492880933d12"
}


*/
    
    // const prod = req.body
    // delete prod.key
    // console.log(prod)
    // ProductDao.deleteById(prod).then(e=>res.json(e))
})


module.exports = router