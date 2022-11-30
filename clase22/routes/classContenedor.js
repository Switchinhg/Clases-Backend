const { BDMaria } = require('../db/conection/conection');
const sendProd = require('../server')




class Contenedor{
    constructor(archivo){
        this.archivo=archivo

        /* Guarda producto */
    }async save(obj){
        console.log('en class COntenedor')
        console.log(obj)
        BDMaria('productos')
            .insert({name: obj.name, price:obj.price, description: obj.description, thumbnail: obj.thumbnail})
            .then(console.log('agregado'))
    }
    // Mostrar Todos los Productos
    async getAll(){
        return await BDMaria.from('productos').select('*').orderBy('id', 'asc')

}
}

module.exports = Contenedor