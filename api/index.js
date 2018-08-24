// Appel des modules
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

// Variables d'environnement
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 1234

// Initialisation d'Express
const app = express()

app.use(express.json())
app.use(cors())
const signalementRoutes = require('./routes/signalements')
app.use('/api/v1/signalements', signalementRoutes)

// Activation du log des routes
app.use(morgan('tiny'))

// Route d'accueil
app.get('/', (req, res) => {
  res.json('Hello World!')
})

// Démarrage du serveur
app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)