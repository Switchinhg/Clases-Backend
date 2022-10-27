
const Contenedor = require('./usuariosContenedor')

const router = require('express').Router()

let usuarios= new Contenedor('./db/usuarios.txt')




module.exports = usuarios