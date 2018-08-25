// Appel des modules
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dbConfig = require('./config/db.js')
const mongoose = require('mongoose')

// Variables d'environnement
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 1234

// Initialisation d'Express
const app = express()

app.use(express.json())

// Connexion à Mongo
mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
	console.log('Successfully connected to the database')    
}).catch(err => {
	console.log('Could not connect to the database.')
})

app.use(cors())
require('./routes/signalement.routes.js')(app)

// Activation du log des routes
app.use(morgan('tiny'))

// Route d'accueil
app.get('/', (req, res) => {
	res.json('Hello World!')
})

// Démarrage du serveur
app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)