const removeComment = require('../models/removeComment.js');

exports.deleteComment = (req, res, next) => {
    console.log(req.params);
    const { comment_id } = req.params;
    removeComment(comment_id).then((comment) => res.status(204).send({})).catch((err) => {
        next(err)
    });
}

