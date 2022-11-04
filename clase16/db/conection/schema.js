const { BDSQLite , BDMaria } = require('./conection');

// BDSQLite.schema.createTable('mensajes', table =>{
//     table.increments('id')
//     table.string('mensaje')
//     table.string('nombre')
//     table.string('date')
// })
// .then(console.log("Tabla Mensajes creada."))

// BDSQLite.schema.dropTable('mensajes')
// .then(console.log('xd'))


// BDSQLite('mensajes').del()
//     .then(console.log('test'))

/* BDMaria.schema.createTable('productos', table => {
	table.increments('id')
	table.string('name')
	table.integer('price')
	table.string('description')
	table.string('thumbnail')
})
.then(() => console.log('Table created'))
.catch(err => { console.log(err); })
.finally(() => BDMaria.destroy()) */