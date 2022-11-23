const mongoose = require('mongoose');

class ProdMongoDbContainer{
    constructor({name,schema}){
        this.model = mongoose.model(name, schema)
    }
    // Mostrar Todos los Productos
    async getAll(){
        const response = await this.model.find({})
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

    /* Edita el producto */
    async editProd(prod){
        let id = prod.id
        delete prod.id
        console.log(prod)
        const response = await this.model.findByIdAndUpdate(id, prod, {new:true})
         return response
    }

    /* Borrar prod por id */
    async deleteById(id){
        const response = await this.model.findByIdAndDelete(id);
        return response;
    }

}

module.exports= {ProdMongoDbContainer};
