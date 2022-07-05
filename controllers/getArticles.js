const {fetchArticles} = require('../models/fetchUsers.js');

exports.getArticles = (req, res, next) => {
        fetchArticles().then((users) => res.status(200).send({ articles: articles })).catch((err) => {
        next(err);
    });
}