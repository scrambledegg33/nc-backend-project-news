const patchArticleById = require('../models/patchArticle.js');

exports.patchArticle = (req, res, next) => {
    const articleId = parseInt(req.params.article_id)
    const votes = req.body.votes
    patchArticleById(votes, articleId).then((article) => res.status(200).send({article})).catch((err) => {
        next(err)
    });
}

