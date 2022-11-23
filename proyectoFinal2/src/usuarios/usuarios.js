
const Contenedor = require('../containers/usuariosContainer')

const router = require('express').Router()

let usuarios= new Contenedor('./db/usuarios.json')


module.exports = usuarios