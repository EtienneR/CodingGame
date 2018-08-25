const username = process.env.MONGO_INITDB_ROOT_USERNAME || 'root'
const password = process.env.MONGO_INITDB_ROOT_PASSWORD || 'password'
const host = process.env.MONGO_HOST || 'localhost'
const port = process.env.MONGO_PORT || 27017
const db = process.env.MONGO_INITDB_DATABASE || 'test'

module.exports = {
    url: `mongodb://${username}:${password}@${host}:${port}/${db}?authSource=admin`
}
