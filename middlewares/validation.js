const { check, validationResult } = require('express-validator');

exports.validateAuthor = [
    check('firstName').notEmpty().withMessage('First name is required'),
    check('middleName').notEmpty().withMessage('Middle name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('birthDate').isDate().withMessage('Valid birth date is required'),
    check('Country').notEmpty().withMessage('Country is required'),
    check('Website').isURL().withMessage('Valid URL is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

exports.validateBook = [
    check('bookName').notEmpty().withMessage('Book name is required'),
    check('publishDate').isDate().withMessage('Valid publish date is required'),
    check('bookUnits').isInt({ gt: 0 }).withMessage('Units must be a positive integer'),
    check('bookPrice').isInt({ gt: 0 }).withMessage('Price must be a positive integer'),
    check('authorId').isInt().withMessage('Valid author ID is required'),
    check('publisherId').isInt().withMessage('Valid Publisher ID is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

exports.validatePublisher = [
    check('publisherName').notEmpty().withMessage('Publisher name is required'),
    check('startDate').isDate().withMessage('Valid start date is required'),
    check('isWorking').isBoolean().withMessage('isWorking must be a boolean'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

exports.validateTag = [
    check('name').isString().withMessage('Tag name is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
