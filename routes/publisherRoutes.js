const express = require('express');
const { getAllPublishers, createPublisher, getPublisherByBookId} = require('../controllers/publisherController');
const { validatePublisher } = require('../middlewares/validation');

const router = express.Router();

router.get('/getPublishers', getAllPublishers);
router.post('/createPublishers', validatePublisher, createPublisher);
router.get('/publisher/:bookId', getPublisherByBookId);

module.exports = router;
