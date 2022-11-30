const { BDSQLite } = require('../db/conection/conection');



class Contenedor{
    async save(obj){
        BDSQLite('mensajes')
            .insert({mensaje: obj.mensaje, nombre: obj.nombre, date: obj.date })
            .then(console.log('guardado'))
        }
    
    async getAll(){
        return await BDSQLite.from('mensajes').select('*')
        
    }
}
module.exports = Contenedor