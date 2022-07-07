const {fetchArticles} = require('../models/fetchArticles.js');

exports.getArticles = (req, res, next) => {
    const {sort_by = sortBy, order, topic} = req.params;
console.log(req.params);

        fetchArticles().then((articles) => res.status(200).send({ articles: articles })).catch((err) => {
        next(err);
    });
}