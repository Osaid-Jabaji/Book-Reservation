const knex = require('../connection/connection');

exports.getAllPublishers = async (req, res) => {
    try {
        const publishers = await knex.select('*').from('publishers');
        res.json(publishers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPublisher = async (req, res) => {
    const { publisherName, startDate, isWorking } = req.body;
    try {
        const [id] = await knex('publishers').insert({
            publisherName,
            startDate,
            isWorking
        });
        res.json({ message: 'Publisher added', id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPublisherByBookId = async (req, res) => {
    const { bookId } = req.params;

    try {
        const publisher = await knex('publishers')
            .join('books', 'publishers.publisherId', '=', 'books.publisherId')
            .select('publishers.*')
            .where('books.bookId', bookId)
            .first();

        if (!publisher) {
            return res.status(404).json({ error: 'Publisher not found' });
        }

        res.json(publisher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
