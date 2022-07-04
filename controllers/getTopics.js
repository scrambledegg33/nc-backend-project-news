const {fetchTopics} = require('../models/fetchTopics.js');

exports.getTopics = (req, res, next) => {
        fetchTopics().then((topics) => res.status(200).send({ topics: topics })).catch((err) => {
        next(err);
    });
}