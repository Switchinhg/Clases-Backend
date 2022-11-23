const {mongoose, Schema} =  require('mongoose')

const cartCollection = 'cart'

const cartSchema = mongoose.Schema({
    userId:{type:Number,required:true},
    productsIds:[{type:Schema.Types.ObjectId,ref:'games',required:true}],
},
{virtuals:true}
)

cartSchema.set('toJSON', {
    transform:(_ ,response )=>{
        response.id = response._id
        delete response._id
        delete response.__v
        return response
    }
})


module.exports = CartModel =  { cartCollection, cartSchema}