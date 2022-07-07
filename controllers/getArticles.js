const {fetchArticles} = require('../models/fetchArticles.js');

exports.getArticles = (req, res, next) => {
    const {sort_by : sortBy, order, topic} = req.query;

        fetchArticles(sortBy, order, topic).then((articles) => {
            res.status(200).send({ articles: articles })
        }).catch((err) => {
        next(err);
    });
}