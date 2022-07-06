const {fetchCommentsByArticleId} = require('../models/fetchCommentsByArticleId.js');

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    
    fetchCommentsByArticleId(article_id).then((comments) => {
        console.log(comments);
        res.status(200).send({ comments: comments })}).catch((err) => {
        next(err);
    });
  
};