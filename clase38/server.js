const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
dotenv.config()
// Conectar a MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_URI}/${process.env.DATABASE_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  
});

app.use(express.urlencoded({extended:true}))
app.use(express.json())


const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Conectado a la base de MongoDB");
});

// Importar las rutas
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Iniciar el servidor
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});