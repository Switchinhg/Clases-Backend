const { CartMongoDbContainer } = require("../../containers/cartMongoContainer")
const CartModel = require("../../models/CartModel")

module.exports =  class CartMongo extends CartMongoDbContainer{
        constructor(){
            super({
                name:CartModel.cartCollection,
                schema: CartModel.cartSchema
            })
        }
}
