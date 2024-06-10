const express = require('express');
const bodyParser = require('body-parser');

const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');
const publisherRoutes = require('./routes/publisherRoutes');
const tagsRoutes = require('./routes/tagsRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', authorRoutes);
app.use('/', bookRoutes);
app.use('/', publisherRoutes);
app.use('/', tagsRoutes);
app.use('/', searchRoutes);

module.exports = app;
