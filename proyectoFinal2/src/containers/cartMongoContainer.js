const mongoose = require('mongoose');

class CartMongoDbContainer{
    constructor({name,schema}){
        this.model = mongoose.model(name, schema) 
    }
    // Mostrar Todos los Productos
    async getAll(){
        const response = await this.model.find()
        console.log('entre en getall')
        return response
    }

    /* Guarda producto */
    async save(obj){
        const response = await this.model.create(obj)
        return response
    }
    
    /* Buscar por id */
    async GetById(id){
        const response = await this.model.findById(id)
        return response
    }    

    /* Edita el carrrito */
    async editCart({prod, id}){
        const response = await this.model.findByIdAndUpdate(id, 
            {"$push":{"productsIds":prod}}, 
            {new:true})
        return response
    }

    /* Borrar prod por id */
    async deleteById({id, idProd}){
        const response = await this.model.updateOne(
            {_id: id}, {$pull: {"productsIds":idProd}})
        return response; 
    }

}

module.exports = {CartMongoDbContainer};
