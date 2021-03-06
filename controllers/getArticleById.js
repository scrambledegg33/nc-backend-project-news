const {fetchArticleById} = require('../models/fetchArticleById.js');

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    
    fetchArticleById(article_id).then((article) => res.status(200).send({ article })).catch((err) => {
        next(err);
    });
  
};