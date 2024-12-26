const supabase = require('../config/supabase');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const articleController = {
  async getAllArticles(req, res) {
    try {
      const { data, error } = await supabase.from('articles').select('*');

      if (error) throw error;

      res.json({ status: 'success', data });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  async getArticleById(req, res) {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) {
        return res.status(404).json({ status: 'error', message: 'Article not found' });
      }

      res.json({ status: 'success', data });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  async createArticle(req, res) {
    try {
      const { title, content, tags = [], status = 'draft', imageUrl } = req.body;

      if (!title || !content) {
        return res.status(400).json({
          status: 'error',
          message: 'Title and content are required'
        });
      }

      const { data, error } = await supabase
        .from('articles')
        .insert([
          {
            title,
            content,
            tags,
            status,
            image_url: imageUrl, 
            created_at: new Date(),
            updated_at: new Date()
          }
        ])
        .select();

      if (error) throw error;

      res.status(201).json({ status: 'success', data: data[0] });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  async uploadImage(req, res) {
    try {
      const { image } = req.files; 
      const fileName = `${uuidv4()}${path.extname(image.name)}`;
      
      const { data, error } = await supabase.storage
        .from('article-images') 
        .upload(fileName, image.data, {
          contentType: image.mimetype,
        });

      if (error) throw error;

    
      const { publicURL } = supabase.storage
        .from('article-images')
        .getPublicUrl(fileName);

      res.json({ status: 'success', imageUrl: publicURL });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  async updateArticle(req, res) {
    
    try {
      const { id } = req.params;
      const { title, content, tags, status, image } = req.body;

    
      if (!title || !content) {
        return res.status(400).json({
          status: 'error',
          message: 'Title and content are required'
        });
      }

      let imageUrl = null;
      if (image) {
        const fileName = `${uuidv4()}${path.extname(image.name)}`;
        const { data, error } = await supabase.storage
          .from('article-images')
          .upload(fileName, image.data, {
            contentType: image.mimetype,
          });

        if (error) throw error;

       
        const { publicURL } = supabase.storage
          .from('article-images')
          .getPublicUrl(fileName);

        imageUrl = publicURL;
      }

      const { data: articleData, error: articleError } = await supabase
        .from('articles')
        .update({
          title,
          content,
          tags,
          status,
          image_url: imageUrl,
          updated_at: new Date(),
        })
        .eq('id', id)
        .select();

      if (articleError) throw articleError;

      res.status(200).json({ status: 'success', data: articleData[0] });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  async deleteArticle(req, res) {
    
    try {
      const { id } = req.params;
      
     
      const { data, error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)
        .select();

      if (error) throw error;

      
      const { error: storageError } = await supabase.storage
        .from('article-images')
        .remove([data[0].image_url]);

      if (storageError) throw storageError;

      res.status(200).json({ status: 'success', message: 'Article deleted successfully' });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }
};

module.exports = articleController;