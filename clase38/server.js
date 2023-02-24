const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
dotenv.config()

/* GraphQL  */
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');


// GraphQL schema
const schema = buildSchema(`
  type productSchema {
    name:String!
    price:Float!
  }
  type Query {
    products: [productSchema]
  }
  input productInput {
    name:String!
    price:Float!
  }
  type Mutation {
    createProduct(input:productInput!):productSchema
  }
  
`);



// Mongoose model
const Product = require('./models/productModel.js')
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
// const productRoutes = require('./routes/productRoutes');
// app.use('/api/products', productRoutes);

const root = {
  products: async () => {
    return await Product.find();
  },

  createProduct: async ({ input }) => {
    console.log(input);
    const book = new Product(input);
    await book.save();
    return book;
  },
};

// Iniciar el servidor
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

