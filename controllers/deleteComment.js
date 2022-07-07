const removeComment = require('../models/removeComment.js');

const deleteComment = (req, res, next) => {
    removeComment(req.params).then((comment) => res.status(204).send({})).catch((err) => {
        next(err)
    });
}

module.exports = deleteComment;