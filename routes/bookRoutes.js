const express = require('express');
const { getAllBooks, createBook, searchBookByIdOrName} = require('../controllers/bookController');
const { createReservation } = require('../controllers/reservationController');
const { validateBook } = require('../middlewares/validation');

const router = express.Router();

router.get('/getBooks', getAllBooks);
router.get('/getBooksByIDorName/:searchString', searchBookByIdOrName);
router.post('/reserve', createReservation);
router.post('/createBooks', validateBook, createBook);

module.exports = router;
