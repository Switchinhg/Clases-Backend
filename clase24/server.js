require("dotenv").config()
// Const y imports
const express = require("express")
const app = express()
const auth = require("./auth")
const handlebars = require("express-handlebars")
const session = require("express-session")
const MongoStore = require("connect-mongo");
const passport = require("passport")
/* Compression */
const compression = require('compression');
/* Winston */
const winston = require('winston');
 /* fs */
const fs = require('fs');

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

/* Request recived */

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});


/*  */
const router = require('./router/randomRouter.js');

let PORT = process.argv[2]

if(!isNaN(process.argv[2])){
  PORT = process.argv[2]
}else if (!isNaN(process.argv[4])){
  PORT = process.argv[4]
}else{
  PORT = 8080
}

let mode = 'fork';

    // Ejecutar el servidor en modo fork o cluster
for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === '--mode') {
      mode = process.argv[i + 1];
      break;
    }
  }
  
  if (mode === 'cluster') {

    const cluster = require('cluster');

    if (cluster.isMaster) {
      // Crear varias instancias del servidor y distribuir las conexiones entrantes entre ellas
      const numCPUs = require('os').cpus().length;
      console.log(numCPUs)
      for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
          console.log('foor')
      }
    }
    else {
        // Ejecutar el servidor en una instancia
      
        app.listen(8080, () => {
          console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
      }
  }




app.use(session({
    store: new MongoStore({
        mongoUrl: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_URI}/${process.env.DATABASE_NAME}`,
        ttl:  30 // 10 minuto
    }),
    secret: "secretoJiji",
    resave: "true",
    saveUninitialized: true
}))
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(compression())

// Handlebars configuration
const hbs = handlebars.create({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
})

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "views")

// Sign in and signout
app.post("/signin", passport.authenticate('login', {failureRedirect: '/error'}), function (req,res){
  res.redirect('/');
})

app.post("/signout", (req, res) => {
    const username = req.session.passport?.user?.username
    req.session.destroy( err => {
        if (!err) res.render("logout", {username: username})
        else res.send({status: "Error al desloguear", body: err})
    })
})

app.post("/signup", passport.authenticate('register', {failureRedirect: '/error'}), function (req,res){
  res.redirect('/');
})

// Endpoints
app.get("/", (req, res) => {
    req.session.passport?.user? res.render("index", {username: req.session.passport.user.username , admin: req.session.passport.user.role,PORT:PORT }) : res.redirect("/login")
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})
app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/public/register.html")
})


app.get('/info',(req,res)=>{
        /* Ags entrada, SO, version Node */
        const args = process.argv
        const sistemaOperativo = process.platform
        const VersionNode = process.version

        /* Memoria total y ruta */
        const memoriaTotal = process.memoryUsage().rss
        const ruitaEjecucion = process.cwd()
        /* id del proceso y dir */
        const idProceso = process.pid
        const carpetaProyecto = __dirname

        const profileData = fs.readFileSync('./procesado.json', 'utf8', (err, data) => {
          console.log(data)
          if (err) {
              res.status(500).send('Error reading profile data');
          } 
            return JSON.parse(data);
              // logic to display profile data

        }

          )

        res.render('process',{
            args,
            sistemaOperativo,
            VersionNode,
            memoriaTotal,
            ruitaEjecucion,
            idProceso,
            carpetaProyecto,
            profileData,
        })

})


app.use('/api', router)



// 404 Error
app.use((req, res) => {
    const response = {
        description: "error"
    }
    logger.warn(`${req.method} ${req.url} - Route not found`);
    res.status(404).json(response)

})

if(mode === 'fork'){

  const server = app.listen(PORT, () => {
    console.log(`server on en: ${PORT}`)
  })
}