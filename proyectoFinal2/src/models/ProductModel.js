const {mongoose, Schema} =  require('mongoose')

const gamesCollection = 'Games'

const  gamesSchema = mongoose.Schema({
    name:{type:String,required:true,max:100},
    price:{type:Number,required:true},
    description:{type:String,required:true,max:300},
    thumbnail:{type:String,required:true,max:200}
},
{virtuals:true}
)

gamesSchema.set('toJSON', {
    transform:(_ ,response )=>{
        response.id = response._id
        delete response._id
        delete response.__v
        return response
    }
})


module.exports = ProductModel =  { gamesCollection, gamesSchema}