const normalizr = require('normalizr');

const util = require('util')

const normalizar = normalizr.normalize;
const desnormalizar = normalizr.denormalize;



const chat ={
    id:32,
    author: { 
        id: 1, 
        nombre: "Swicho",
        apellido: "L", 
        edad:32, 
        alias:"3123",
        avatar: "None", 
    },
    comments: 
    [
        {
            id:323,
            texto:"wenas que tal",
            date:"28/nov"
        },
        {
            id:324,
            texto:"xD",
            date:"28/nov"
        },
        {
            id:325,
            texto:"v:",
            date:"28/nov"
        }
    ],
    
    id:36,
    author: { 
        id: 2, 
        nombre: "Nalcorion",
        apellido: "S", 
        edad:19, 
        alias:"3123",
        avatar: "None", 
    },
    comments: 
    [
        {
            id:326,
            texto:"n0",
            date:"28/nov"
        },
        {
            id:327,
            texto:":v",
            date:"28/nov"
        },
        {
            id:328,
            texto:"XD",
            date:"28/nov"
        }
    ],
    
    id:1233,
    author: { 
        id: 81, 
        nombre: "Cynthia",
        apellido: "L", 
        edad:23, 
        alias:"3123",
        avatar: "None", 
    },
    comments: 
    [
        {
            id:3123,
            texto:"wenas que tal",
            date:"28/nov"
        },
        {
            id:41,
            texto:"xD",
            date:"28/nov"
        },
        {
            id:123,
            texto:"v:",
            date:"28/nov"
        }
    ],
    
    id:123,
    author: { 
        id: 1765, 
        nombre: "Balki",
        apellido: "F", 
        edad:36, 
        alias:"3123",
        avatar: "None", 
    },
    comments: 
    [
        {
            id:56,
            texto:"n0",
            date:"28/nov"
        },
        {
            id:37,
            texto:":v",
            date:"28/nov"
        },
        {
            id:854,
            texto:"XD",
            date:"28/nov"
        }
    ]
    }
            




const usuarioChema = new normalizr.schema.Entity('usuario');
const mensajeSchema = new normalizr.schema.Entity('mensaje', {
	author: usuarioChema,
});

const mensajesSchema = new normalizr.schema.Entity('mensajes',{
    author: usuarioChema,
    mensaje: mensajeSchema
})

const normalizada = normalizar(chat, mensajesSchema)

// console.log(chat)
// console.log( normalizada)


console.log('chat normalizada',normalizada )
console.log('Length chat normalizada', JSON.stringify(normalizada).length);

const data_denormalizada = desnormalizar(normalizada.result, mensajesSchema, normalizada.entities);
console.log('chat desnormalizada',util.inspect(data_denormalizada,false,12,true) )
console.log('Length chat desnormalizada', JSON.stringify(data_denormalizada).length);