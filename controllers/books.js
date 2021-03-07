var Book = require('../models/book');
var customException = require('../common/custom_exception')

const Errors = require("../common/errors")
const Success = require("../common/success")
const MyLogger = require("../common/logger")

const utils = require('../common/utils');
const config = require('../config');


async function createBookRecord(req, res) {
    try {
        // Create Logger
        var logger = new MyLogger(config.logs.api.category, config.logs.api.path)
        logger.CreateLogger()

        var name = req.body.name
        var authorName = req.body.authorName
        var releaseDate = req.body.releaseDate

        utils.checkIfPresent(name, authorName)

        var newBook = new Book();
        newBook.name = name;
        newBook.authorName = authorName
        newBook.releaseDate = releaseDate
    

        var book = await newBook.save();

        if (book) {
            var result_data = {}
            result_data.uuid = book.uuid
            result_data.name = book.name
            result_data.authorName = book.authorName
            result_data.releaseDate = book.releaseDate
            return res.status(201).json(utils.successResponse(Success.NewBookCreated,result_data))
        }
        return res.status(404).json(utils.errorResponse(Errors.NoNewRecordCreated))


    } catch (err) {
        if(err instanceof customException){
            return res.status(200).json(utils.errorResponse(err))
        }else{
       
            logger.LogError("post-book : " + err.stack)
        return res.status(500).json(utils.errorResponse(Errors.SomeErrorOccurred))
        }
        
    }
}

async function getBookList(req, res) {
    try {
        // Create Logger
        var logger = new MyLogger(config.logs.api.category, config.logs.api.path)
        logger.CreateLogger()

        var book = await Book.find({}).select({
            "_id": 0,
            "__v": 0
        });

        if (book.length == 0) return res.status(404).json(utils.errorResponse(Errors.NoDataFound))

        return res.status(200).json(utils.successResponse(Success.Success,book))

    } catch (err) {
        logger.LogError("get-books : " + err.stack)
        return res.status(500).json(utils.errorResponse(Errors.SomeErrorOccurred))
    }
}

async function getBookDetail(req, res) {
    try {
        // Create Logger
        var logger = new MyLogger(config.logs.api.category, config.logs.api.path)
        logger.CreateLogger()

        var book = await Book.find({uuid:req.params.uuid}).select({
            "_id": 0,
            "__v": 0
        });

        if (book.length == 0) return res.status(404).json(utils.errorResponse(Errors.NoDataFound))

        return res.status(200).json(utils.successResponse(Success.Success,book))

    } catch (err) {
        logger.LogError("get-books : " + err.stack)
        return res.status(500).json(utils.errorResponse(Errors.SomeErrorOccurred))
    }
}

async function deleteBook(req, res) {
    try {
        
        // Create Logger
        var logger = new MyLogger(config.logs.api.category, config.logs.api.path)
        logger.CreateLogger()

        var book = await Book.findOneAndDelete({
            uuid: req.params.uuid
        });
        
        if (book) return res.status(200).json(utils.successResponse(Success.DeleteRecord))

        return res.status(404).json(utils.errorResponse(Errors.DeleteFailed))

    } catch (err) {
        logger.LogError("delete-books : " + err.stack)
        return res.status(500).json(utils.errorResponse(Errors.SomeErrorOccurred))
    }
}
async function updateBook(req, res) {
    try {
        // Create Logger
        var logger = new MyLogger(config.logs.api.category, config.logs.api.path)
        logger.CreateLogger()

        var name = req.body.name
        var authorName = req.body.authorName
        var releaseDate = req.body.releaseDate

        utils.checkIfPresent(name, authorName, releaseDate)

        updateData = {}
        updateData.name = name;
        updateData.authorName = authorName;
        updateData.releaseDate = releaseDate

        // update Book record
        var book = await Book.findOneAndUpdate({
            uuid: req.params.uuid
        },updateData,{'new':true});

        if (book) {
            resultData = {}
            resultData.uuid = book.uuid
            resultData.name = book.name
            resultData.authorName = book.authorName
            resultData.releaseDate = book.releaseDate
            return res.status(201).json(utils.successResponse(Success.UpdateSuccesful,resultData))
        }

        return res.status(404).json(utils.errorResponse(Errors.UpdateFailed))



    } catch (err){
        if(err instanceof customException){
            return res.status(200).json(utils.errorResponse(err))
        }else{
       
            logger.LogError("post-book : " + err.stack)
        return res.status(500).json(utils.errorResponse(Errors.SomeErrorOccurred))
        }
}}

module.exports = {
	createBookRecord: createBookRecord,
	getBookList: getBookList,
	getBookDetail: getBookDetail,
	deleteBook: deleteBook,
    updateBook: updateBook
};