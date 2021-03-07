config = {}

// Express
config.express = {}
config.express.port = 8080

// Mongo
config.mongo = {}
config.mongo.db = "mongodb://localhost:27017/book"
config.mongo.dbTest = "mongodb://localhost:27017/book-test"

// Log
config.logs = {}
config.logs.api = {}
config.logs.api.category = "API"
config.logs.api.path = "log"

module.exports = config;