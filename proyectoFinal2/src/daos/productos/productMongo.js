const { ProdMongoDbContainer } = require("../../containers/ProdsMongoContainer")
const ProductModel = require("../../models/ProductModel.js")

module.exports = class productsMongo extends ProdMongoDbContainer{
        constructor(){
            super({
                name:ProductModel.gamesCollection,
                schema: ProductModel.gamesSchema
            })
        }
}
