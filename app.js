var express = require('express');
var app = express();
var mongoose = require('mongoose'); 
const config = require('./config');
var books = require('./routes/book');

const env = process.env.NODE_ENV || 'development';

if(env === 'test'){
    MONGODB_URI = config.mongo.dbTest
  } else {
    MONGODB_URI = config.mongo.db
}


// Mongo Connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router
app.use('/books', books);


app.get('/', function(req, res) {
    res.status(200).send('Hello Node');
});

// 404 Error
app.all("*", function(req, res) {
	return res.status(404).send("Page not found");
});

// Listener
var port = config.express.port;
const server = app.listen(port, function() {
    console.log('app listening on port: ' + port);
});

module.exports = server;
