
const MongoDBService = require('../services/MongodbService/index.js')
const config = require('../config/index.js')
const productsMongo = require('./productos/index.js');
const cartMongo = require('./carritos/index.js');

const selectedDaos = () =>{
    switch (config.SERVER.SELECTED_DATABASE) {
    case "mongo": {
        MongoDBService();
        console.log('noerror')
    return {
        ProductDao: new productsMongo(),
        CartDao: new cartMongo(),
    }}

    }   
}
module.exports = {productDao, cartDao } = selectedDaos()

