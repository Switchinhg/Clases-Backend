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




const hbs = create({
    helpers: {
        estadoSuscripcion(fecha){
            const ahora=new Date().getTime();
            const fechaSuscripcion=new Date(fecha).getTime();
            let diferenciaDias =  fechaSuscripcion - ahora  
            diferenciaDias = diferenciaDias / (1000*60*60*24);
            if(diferenciaDias > 0 )
                return 'Te quedan '+parseInt(diferenciaDias)+' dias'
            return 'Plan vencido'
        },
        debug(algo){
            console.log(algo)
        },
        debo(facturas){
            let monto=0
            if(facturas && facturas.length)
            facturas.forEach(element => {
                if(element.pagado==false)
                    monto+=element.monto
            });
            if(!monto)
                return "Estas al dia"
            return "Debes $"+monto
        }
    }
 });
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.set('views', './views');

app.use(express.static('public'))