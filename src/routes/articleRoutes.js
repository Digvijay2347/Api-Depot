// src/routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const fileUpload = require('express-fileupload'); // for handling file uploads

router.use(fileUpload()); // Middleware to parse file uploads

router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
router.post('/', articleController.createArticle);
router.post('/upload-image', articleController.uploadImage); // New route for image upload
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;