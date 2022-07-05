const db = require('../db/connection.js');

const patchArticle = (votes, articleId) => {
    return db.query(`UPDATE articles SET votes = (votes + $1) WHERE article_id = $2 RETURNING *;`, [votes, articleId])
    .then(({ rows }) => {
        if(rows.length == 0){
          return Promise.reject({status: 404, msg: 'not found'});
        }
      
      const articleInfo = rows[0];
        return articleInfo;
      })
  
};

module.exports = patchArticle;