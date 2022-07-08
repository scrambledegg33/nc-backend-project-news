const { description } = require('../endpoints.json');

const getDescription = (req, res, next) => {
    description().then((info) => res.status(200).send({ info })).catch((err) => {
        next(err);
    });
}
    


module.exports = getDescription;