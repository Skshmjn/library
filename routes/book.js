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
 *     summary: Create a book record 
 *     description: Add new book to the library. parameter to provide is name(String), authorName(String),releaseDate(integer).
 *     requestBody:
 *       content:
 *          application/json:
 *            schema:
 *              properties:
 *               name:
 *                  type: string
 *                  description: Book name
 *               authorName:
 *                  type: string
 *                  description: Author Name
 *               releaseDate:
 *                  type: number
 *                  description: Release-Date
 *     responses:
 *          201:
 *            description: Created New Book Record
 *          404:
 *            description: Couldn't Create New Record
 *          200:
 *            description: Handled Exception
 *          500:
 *            description: Unhandled Exception
 *       
 *      
 * 
*/
router.post('/',createBookRecord )

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get Book list
 *     description: Retrieve a list of Books.
 *     responses:
 *          200:
 *            description: get Books list 
 *          404:
 *            description: 404 NOT FOUND
 *          500:
 *            description: Unhandled Exception
*/
router.get('/',getBookList )


/**
 * @swagger
 * paths:
 *  /books/{uuid}:
 *    get:
 *     summary: Retrieve a single book
 *     description: Retrieve detail of single book
 *     responses:
 *       200:
 *          description: get single book records
 *       404:
 *            description: 404 NOT FOUND
 *       500:
 *            description: Unhandled Exception
 *     parameters:
 *     - in: path
 *       name: uuid
 *       schema:
 *          type: string
 *          required: true
 *       


*/
router.get('/:uuid',getBookDetail )

/**
 * @swagger
 * paths:
 *  /books/{uuid}:
 *    delete:
 *     summary: delete a single book
 *     description: delete a single book
 *     responses:
 *       200:
 *          description: delete single book records
 *       404:
 *            description: 404 NOT FOUND
 *       500:
 *            description: Unhandled Exception
 *     parameters:
 *     - in: path
 *       name: uuid
 *       schema:
 *          type: string
 *          required: true
 *       


*/
router.delete('/:uuid',deleteBook )

/**
 * @swagger
 * /books/{uuid}:
 *   put:
 *     summary: Create a book record 
 *     description: Add new book to the library. release date will be current unix time and parameter to provide is name, authorName.
 *     parameters:
 *     - in: path
 *       name: uuid
 *       schema:
 *          type: string
 *          required: true
 *     requestBody:
 *       content:
 *          application/json:
 *            schema:
 *              properties:
 *               name:
 *                  type: string
 *                  description: Book name
 *               authorName:
 *                  type: string
 *                  description: Author Name
 *               releaseDate:
 *                  type: number
 *                  description: Release-Date
 *     responses:
 *          201:
 *            description: update Book record
 *          404:
 *            description: 404 NOT FOUND
 *          500:
 *            description: Unhandled Exception
 *      
 * 
*/
router.put('/:uuid', updateBook)

module.exports = router;