/* Inicializar Express */
const express = require('express')
/* Routers */
const routerProds = require('../routes/productos.js')
const routerCart = require('../routes/cart.js')

const app = express()
/* PORT */
const PORT = process.env.PORT || 8080;


const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
/* JSON */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api', routerProds)
app.use('/api', routerCart)
