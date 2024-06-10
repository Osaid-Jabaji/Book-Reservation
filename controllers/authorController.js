const knex = require('../connection/connection');

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await knex.select('*').from('authors');
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createAuthor = async (req, res) => {
    const { firstName, middleName, lastName, birthDate, Country, Website } = req.body;
    try {
        const [id] = await knex('authors').insert({
            firstName,
            middleName,
            lastName,
            birthDate,
            Country,
            Website
        });
        res.json({ message: 'Author added', id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAuthorByBookId = async (req, res) => {
    const { bookId } = req.params;

    try {
        const author = await knex('authors')
            .join('books', 'authors.authorId', '=', 'books.authorId')
            .select('authors.*')
            .where('books.bookId', bookId)
            .first();

        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }

        res.json(author);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
