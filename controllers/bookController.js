const knex = require('../connection/connection');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await knex.select('*').from('books');
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createBook = async (req, res) => {
    const { bookName, publishDate, bookPDF, bookUnits, bookPrice, authorId, publisherId } = req.body;
    try {
        const [id] = await knex('books').insert({
            bookName,
            publishDate,
            bookPDF,
            bookUnits,
            bookPrice,
            authorId,
            publisherId
        });
        res.json({ message: 'Book added', id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchBookByIdOrName = async (req, res) => {
    const { searchString } = req.params;

    try {
        const books = await knex('books')
            .where('bookId', 'like', `%${searchString}%`)
            .orWhere('bookName', 'like', `%${searchString}%`)
            .select('*');

        if (books.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.reserveBook = async (req, res) => {
    const { bookId } = req.params;

    try {
        const books = await knex('books')
            .where('bookId', 'like', `%${searchString}%`)
            .select('*');

        if (books.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
