const express = require('express')
const routerProds = require('./routes/productos.js')

const app = express()
const PORT = 8080;


const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
/* JSON */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api', routerProds)
