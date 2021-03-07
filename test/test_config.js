process.env.NODE_ENV = "test";
// process.env.MONGODB_URL = "mongodb://127.0.0.1:27017/book-test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);
let Success = require('../common/success')

//Export this to use in multiple files
module.exports = {
	chai: chai,
	server: server,
	should: should,
	Success: Success
};