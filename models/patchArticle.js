const db = require('../db/connection.js');

const patchArticle = (votes, articleId) => {
    return db.query(`UPDATE articles SET votes = (votes + $1) WHERE article_id = $2 RETURNING *;`, [votes, articleId])
    .then(({ rows }) => {
        const articleInfo = rows[0];
        return articleInfo;
      })
    .catch((err) => {
        console.log(err);
    })
};

module.exports = patchArticle;