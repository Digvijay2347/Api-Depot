const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const fileUpload = require('express-fileupload'); 

router.use(fileUpload());

router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
router.post('/', articleController.createArticle);
router.post('/upload-image', articleController.uploadImage); 
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
