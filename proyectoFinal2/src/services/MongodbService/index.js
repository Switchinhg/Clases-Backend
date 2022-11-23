const mongoose = require('mongoose')
const config = require("../../config/index.js")

module.exports = init = async () => {
  try {
    mongoose.connect("mongodb+srv://usuarioTest:VPC7heZ8T6mnSwZ@cluster0.yfjwemc.mongodb.net/?retryWrites=true&w=majority", {
      dbName: "Ecommerce",
    });
    console.log("Conectado con mongo");
  } catch (error) {
    console.log(error);
  }
};


