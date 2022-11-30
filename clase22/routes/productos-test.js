const router = require('express').Router();

/* Faker */
const {faker} = require('@faker-js/faker')



const crearProductos = (cuantos = 10)=>{
  return Array.from({length:cuantos}, createRandomProduct)
}

 function createRandomProduct() {
    return {
      id:faker.database.mongodbObjectId(),
      productName: faker.commerce.productName(),
      productDescription:faker.commerce.productDescription(),
      price:faker.commerce.price(),
      thumbnail:faker.image.food(200,100)

    };
  }
  

console.log(crearProductos())

router.get('/productos-test', (req,res)=>{
  res.render('layouts/productos-test', crearProductos())
})

module.exports = router