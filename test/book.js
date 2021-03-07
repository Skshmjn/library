const {
    chai,
    server,
    should,
	Success
} = require("./test_config");
var Book = require('../models/book');




describe('Book Crud API', () => {

    describe("Book", () => {
        //Before each test we empty the database
        before((done) => {
            Book.deleteMany({}, (err) => {
                done();
            });
        });


        // Prepare data for testing
        const testData = {
            "name": "book name",
            "authorName": "test author name",

            "updateAuthorName": "test update author name",
            "uuid": ""

        };

        describe('POST /book', () => {
            it('It create a book record', (done) => {
                chai.request(server)
                    .post("/books")
                    .send({
                        "name": testData.name,
                        "authorName": testData.authorName
                    })
                    .end((err, response) => {
                        response.should.have.status(201);
                        response.body.should.have.property("message").eql(Success.NewBookCreated.message);
                        response.body.should.have.property("success_code").eql(Success.NewBookCreated.successCode)

                    })
                done();

            })
        })

        describe('GET /book', () => {
            it('It should return all the books', (done) => {
                chai.request(server)
                    .get("/books")
                    .end((err, response) => {
                        response.should.have.status(200);
						response.body.should.have.property('message').eql(Success.Success.message);
                        response.body.should.have.property('success_code').eql(Success.Success.successCode);
                        testData.uuid = response.body.data[0].uuid
                        done();
                        // response.body.should.have.
                    })
            })
        });

        describe('GET /book/:uuid', () => {
            it('It should return one book', (done) => {
                chai.request(server)
                    .get("/books/" + testData.uuid)
                    .end((err, response) => {
                        response.should.have.status(200);
						response.body.should.have.property('message').eql(Success.Success.message);
                        response.body.should.have.property('success_code').eql(Success.Success.successCode);
                        response.body.should.have.property('data').property(0).property('uuid').eql(testData.uuid);
                        done();
                    })
            })
        });

        describe('Put /book/:uuid', () => {
            it('It should update one book', (done) => {
                chai.request(server)
                    .put("/books/" + testData.uuid)
                    .send({
                        "name": testData.name,
                        "authorName": testData.updateAuthorName
                    })
                    .end((err, response) => {
                        response.should.have.status(201);
						response.body.should.have.property('message').eql(Success.UpdateSuccesful.message);
                        response.body.should.have.property('success_code').eql(Success.UpdateSuccesful.successCode);
                        response.body.should.have.property('data').property('uuid').eql(testData.uuid)
                        response.body.should.have.property('data').property('authorName').eql(testData.updateAuthorName);
                        done();
                        // response.body.should.have.
                    })
            })
        });

        describe('Delete /book/:uuid', () => {
            it('It should delete one book', (done) => {
                chai.request(server)
                    .delete("/books/" + testData.uuid)
                    .end((err, response) => {
                        response.should.have.status(200);
						
						response.body.should.have.property('message').eql(Success.DeleteRecord.message);
                        response.body.should.have.property('success_code').eql(Success.DeleteRecord.successCode);
                        


                        done();

                    })
            })
        });
    });
});