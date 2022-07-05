const {fetchUsers} = require('../models/fetchUsers.js');

exports.getUsers = (req, res, next) => {
        fetchUsers().then((users) => res.status(200).send({ users: users })).catch((err) => {
        next(err);
    });
}