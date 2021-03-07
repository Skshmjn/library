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

config.swaggerDefination = {
    openapi: '3.0.0',
    info: {
      title: 'Libray Api Documentation',
      description: 'assignment for techalchemy',
            contact: {name:'Saksham Jain',email: 'sakshamniaj@gmail.com'},
      version: '1.0.0',
    },
    servers: [
        {
          url: 'http://localhost:8080',
          description: 'Development server',
        },
      ],
  }

module.exports = config;