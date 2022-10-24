const express = require('express')
const path = require('path');
const { create } = require('express-handlebars');
const mensajesjs = require('./mensajes')




const app = express()
const PORT = 8080;

const { Server:HttpServer} = require('http')

const { Server:IOServer} = require('socket.io')








const routerProds = require('./routes/productos.js')
const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
/* JSON */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* USANDO EL ROUTER */

app.use('/', routerProds)


/* Form */

app.get('/', function(req, res) {
    res.render('view/form')
});




const hbs = create({});
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.set('views', './views');

app.use(express.static('public'))







const io = new IOServer(server)




io.on('connection', (usuario)=>{
    /* siempre que se conecte un usuario recibe todos los mensajes */
    console.log('Un cliente se ha conectado');

    mensajesjs.msg.getAll()
    .then(data =>{
        usuario.emit('historial', data)
    })


    /* al recibir mensaje nuevo */
    usuario.on('msgs' , data=>{
        
        data.fecha = new Date().toLocaleString()
        mensajesjs.msg.save(data)
        io.sockets.emit('mensajes', data)
    })
    const newProd = (prod) =>{io.sockets.emit('newProd', prod)}
    exports.newProd = newProd
})


const mensajes = []


