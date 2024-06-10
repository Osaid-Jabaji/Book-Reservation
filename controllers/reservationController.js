const knex = require('../connection/connection');

const createReservation = async (req, res) => {
    const {
        bookId,
        buyerName,
        buyerAddress,
        buyerPhoneNumber,
        purchaseDate,
        nationalId,
        paymentMethod,
        numberOfUnits,
        unitPrice,
        totalPrice
    } = req.body;

    try {
        // Check if the number of units to be reserved is valid
        const book = await knex('books').select('bookUnits').where('bookId', bookId).first();
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        const availableUnits = book.bookUnits;
        if (numberOfUnits <= 0 || numberOfUnits > availableUnits) {
            return res.status(400).json({ error: 'Invalid number of units to reserve' });
        }

        // Update the number of units in the Books table
        await knex('books').where('bookId', bookId).update({
            bookUnits: availableUnits - numberOfUnits
        });

        // Insert the reservation into the Reserves table
        await knex('Reserves').insert({
            bookId,
            buyerName,
            buyerAddress,
            buyerPhoneNumber,
            purchaseDate,
            nationalId,
            paymentMethod,
            numberOfUnits,
            unitPrice,
            totalPrice
        });

        res.status(201).json({ message: 'Reservation created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createReservation,
};
