const knex = require('../connection/connection');

const getAllTags = async (req, res) => {
    try {
        const tags = await knex('tags').select('*');
        res.json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTag = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'tagName is required' });
    }
    try {
        const [tagId] = await knex('tags').insert({ name });
        res.status(201).json({ tagId, name });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBooksByTag = async (req, res) => {
    const { tagId } = req.params;
    try {
        const bookIds = await knex('book_tags')
            .where('tagId', tagId)
            .select('bookId');
        res.json(bookIds);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTagsByBook = async (req, res) => {
    const { bookId } = req.params;
    try {
        const tagIds = await knex('book_tags')
            .where('bookId', bookId)
            .select('tagId');
        res.json(tagIds);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTags,
    createTag,
    getTagsByBook,
    getBooksByTag,
};
