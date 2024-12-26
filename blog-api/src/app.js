// src/app.js
const express = require('express');
const cors = require('cors');
const articleRoutes = require('./routes/articleRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/articles', articleRoutes);
app.use(errorHandler);

module.exports = app;