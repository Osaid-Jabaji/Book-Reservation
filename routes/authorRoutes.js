const express = require('express');
const { getAllAuthors, createAuthor, getAuthorByBookId} = require('../controllers/authorController');
const { validateAuthor } = require('../middlewares/validation');
const {getPublisherByBookId} = require("../controllers/publisherController");

const router = express.Router();

router.get('/getAuthors', getAllAuthors);
router.post('/createAuthors', validateAuthor, createAuthor);
router.get('/author/:bookId', getAuthorByBookId);

module.exports = router;
