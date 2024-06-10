const knex = require('../connection/connection');

const searchBooks = async (req, res) => {
    const { searchString, searchType ,unitsStartNumber, unitsEndNumber, startingPrice, endingPrice } = req.body;

    try {
        let query = knex('books');

        if (searchType === 'Any') {
            query.where((builder) => {
                builder.where('bookName', 'like', `%${searchString}%`)
                    .orWhereExists(knex.raw(`SELECT * FROM authors WHERE books.authorId = authors.authorId AND CONCAT(firstName, ' ', lastName) LIKE '%${searchString}%'`))
                    .orWhereExists(knex.raw(`SELECT * FROM authors WHERE books.authorId = authors.authorId AND CONCAT(firstName, ' ', middleName, ' ', lastName) LIKE '%${searchString}%'`))
                    .orWhereExists(knex.raw(`SELECT * FROM publishers WHERE books.publisherId = publishers.publisherId AND publisherName LIKE '%${searchString}%'`))
                    .orWhereExists(knex.raw(`SELECT * FROM book_tags WHERE books.bookId = book_tags.bookId AND EXISTS (SELECT * FROM tags WHERE book_tags.tagId = tags.tagId AND name LIKE '%${searchString}%')`));
            });
        } else if (searchType === 'Book Title') {
            query.where('bookName', 'like', `%${searchString}%`);
        } else if (searchType === 'Book Author') {
            query.whereExists(knex.raw(`SELECT * FROM authors WHERE books.authorId = authors.authorId AND CONCAT(firstName, ' ', lastName) LIKE '%${searchString}%'`))
                .orWhereExists(knex.raw(`SELECT * FROM authors WHERE books.authorId = authors.authorId AND CONCAT(firstName, ' ', middleName, ' ', lastName) LIKE '%${searchString}%'`));
        } else if (searchType === 'Book Publisher') {
            query.whereExists(knex.raw(`SELECT * FROM publishers WHERE books.publisherId = publishers.publisherId AND publisherName LIKE '%${searchString}%'`));
        } else if (searchType === 'Tags') {
            query.whereExists(knex.raw(`SELECT * FROM book_tags WHERE books.bookId = book_tags.bookId AND EXISTS (SELECT * FROM tags WHERE book_tags.tagId = tags.tagId AND name LIKE '%${searchString}%')`));
        }

        if (unitsStartNumber !== undefined) {
            query.where('bookUnits', '>=', unitsStartNumber);
        }

        if (unitsEndNumber !== undefined) {
            query.where('bookUnits', '<=', unitsEndNumber);
        }

        if (startingPrice !== undefined) {
            query.where('bookPrice', '>=', startingPrice);
        }

        if (endingPrice !== undefined) {
            query.where('bookPrice', '<=', endingPrice);
        }

        const result = await query.select('*');
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    searchBooks,
};
