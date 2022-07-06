const {fetchArticles} = require('../models/fetchArticles.js');

exports.getArticles = (req, res, next) => {
        fetchArticles().then((articles) => res.status(200).send({ articles: articles })).catch((err) => {
        next(err);
    });
}