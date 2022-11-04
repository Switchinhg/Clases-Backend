const express = require('express')
const path = require('path');
const { create } = require('express-handlebars');

const msgss = require('./mensajes/mensajes')


const Contenedor = require('./routes/classContenedor')

const p = new Contenedor()


const app = express()
const PORT = 8080;

const { Server:HttpServer} = require('http')

const { Server:IOServer} = require('socket.io')









const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
/* JSON */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* USANDO EL ROUTER */



/* Form */

app.get('/', function(req, res) {
    p.getAll().then(data=> res.render('view/form', {data}))

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

    msgss.msg.getAll()
    .then(data =>{
        usuario.emit('historial', data)
    })


    /* al recibir mensaje nuevo */
    usuario.on('msgs' , data=>{
        data.date = new Date().toLocaleString()
        msgss.msg.save(data)
        io.sockets.emit('mensajes', data)
    })

        app.post('/',(req,res)=>{
            p.save(req.body)
            io.sockets.emit('newProd', req.body) 
            res.redirect('/')
        })

    
})

app.delete('/:id',(req,res)=>{
    p.deleteById(Number(req.params.id)).then(res.json({borrado:true}) )
})
