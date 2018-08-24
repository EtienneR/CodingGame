const mongoose = require('mongoose')
const username = process.env.MONGO_INITDB_ROOT_USERNAME || 'root'
const password = process.env.MONGO_INITDB_ROOT_PASSWORD || 'password'
const host = process.env.MONGO_HOST || 'localhost'
const port = process.env.MONGO_PORT || 27017
const db = process.env.MONGO_INITDB_DATABASE || 'test'

const connect = () => {
	mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${db}?authSource=admin`, { useNewUrlParser: true }, function(err) {
		if (err) throw err
	})
}

const disconnect = () => {
	mongoose.connection.close()
}

module.exports = {
	connect,
	disconnect
}
