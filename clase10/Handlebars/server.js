const express = require('express')
const path = require('path');
const { create } = require('express-handlebars');


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

app.get('/', function(req, res) {
    res.render('view/form')
});




const hbs = create({});
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.set('views', './views');

app.use(express.static('public'))