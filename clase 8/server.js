const express = require('express')

const app = express()
const PORT = 8080;
const routerProds = require('./routes/productos.js')
const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
/* JSON */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* USANDO EL ROUTER */

app.use('/api', routerProds)

/* Form */

app.use('/formulario', express.static(__dirname+'/public/index.html'));
console.log( 'link formulario: http://localhost:8080/formulario')
