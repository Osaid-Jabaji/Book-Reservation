const express = require('express');
const { getAllTags, createTag, getBooksByTag, getTagsByBook} = require('../controllers/tagsController');
const { validateTag } = require('../middlewares/validation');

const router = express.Router();

router.get('/getTags', getAllTags);
router.get('/getBooksByTag/:tagId', getBooksByTag);
router.get('/getTagsByBook/:bookId', getTagsByBook);
router.post('/createTags', validateTag, createTag);

module.exports = router;
