let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);
let Success = require('../common/success')

module.exports = {
	chai: chai,
	server: server,
	should: should,
	Success: Success
};