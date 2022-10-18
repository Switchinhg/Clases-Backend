const express = require('express')
const path = require('path');


const app = express()
const PORT = 8080;
const routerProds = require('./routes/productos.js')
const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
/* JSON */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* USANDO EL ROUTER */

app.use('/productos', routerProds)


/* Form */

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', function(req, res) {
    res.render('./layouts/index.pug')
});


app.use(express.static('public'))