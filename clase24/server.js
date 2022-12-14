require("dotenv").config()
// Const y imports
const express = require("express")
const app = express()
const auth = require("./auth")
const handlebars = require("express-handlebars")
const session = require("express-session")
const MongoStore = require("connect-mongo");
const passport = require("passport")

const PORT = process.env.PORT || 8080

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
    req.session.passport?.user? res.render("index", {username: req.session.passport.user.username , admin: req.session.passport.user.role }) : res.redirect("/login")
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})
app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/public/register.html")
})


// 404 Error
app.use((req, res) => {
    const response = {
        description: "error"
    }
    res.status(404).json(response)
})

// Server start
const server = app.listen(PORT, () => {
    console.log(`server on en: ${PORT}`)
})