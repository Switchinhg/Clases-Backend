const sql = {
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'swicho',
		password: 'XF.]l3QP@4*/9Afe',
		database: 'websocket'
	}
}
const sqlite = {
	client: 'sqlite3',
	connection: {
		filename:'./db/mensajes.sqlite'
	}
}

const BDSQLite = require('knex')(sqlite)
const BDMaria = require('knex')(sql)

module.exports = {
	BDSQLite,
    BDMaria
}

