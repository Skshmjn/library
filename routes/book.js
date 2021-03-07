const {
    createBookRecord,
    getBookList,
    getBookDetail,
	deleteBook,
    updateBook
} = require('../controllers/books')
var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Retrieve a list of JSONPlaceholder useasasrs
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
router.post('/',createBookRecord )

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
router.get('/',getBookList )


/**
 * @swagger
 * /books{uuid}:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder useasasrs
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
router.get('/:uuid',getBookDetail )

/**
 * @swagger
 * /books/{uuid}:
 *   delete:
 *     summary: Retrieve a list of JSONPlaceholder useasasrs
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
router.delete('/:uuid',deleteBook )

/**
 * @swagger
 * /books/{uuid}:
 *   put:
 *     summary: Retrieve a list of JSONPlaceholder useasasrs
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
router.put('/:uuid', updateBook)

module.exports = router;