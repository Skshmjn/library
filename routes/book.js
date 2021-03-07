var express = require('express');
var Book = require('../models/book');
var router = express.Router();

const Errors = require("../common/errors")
const Success = require("../common/success")
const MyLogger = require("../common/logger")

const utils = require('../common/utils');
const config = require('../config');


router.post('/', async function(req, res) {
    try {
        // Create Logger
        var logger = new MyLogger(config.logs.api.category, config.logs.api.path)
        logger.CreateLogger()

        var newBook = new Book();
        newBook.name = req.body.name;
        newBook.authorName = req.body.authorName;


        var book = await newBook.save();

        if (book) {
            var result_data = {}
            result_data.uuid = book.uuid
            result_data.name = book.name
            result_data.authorName = book.authorName
            result_data.releaseDate = book.releaseDate
            return res.status(201).json(utils.successResponse(Success.NewBookCreated,result_data))
        }
        return res.status(404).json(utils.errorResponse(Erros.NoNewRecordCreated))


    } catch (err) {
        logger.LogError("post-book : " + err.stack)
        return res.status(500).json(utils.errorResponse(Errors.SomeErrorOccurred))
    }
})

router.get('/', async function(req, res) {
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
})


router.get('/:uuid', async function(req, res) {
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
})

router.delete('/:uuid', async function(req, res) {
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
})


router.put('/:uuid', async function(req, res) {
    try {
        // Create Logger
        var logger = new MyLogger(config.logs.api.category, config.logs.api.path)
        logger.CreateLogger()

        updateData = {}
        updateData.name = req.body.name;
        updateData.authorName = req.body.authorName;

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



    } catch (err) {
        logger.LogError("put-book : " + err.stack)
        return res.status(500).json(utils.errorResponse(Errors.SomeErrorOccurred))
    }
})

module.exports = router;