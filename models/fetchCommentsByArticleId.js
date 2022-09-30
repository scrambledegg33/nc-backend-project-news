const db = require('../db/connection.js');


exports.fetchCommentsByArticleId = (article_id) => {
    return db
      .query(`SELECT author, body, comment_id, created_at, votes
      FROM comments
      WHERE article_id = $1
      ORDER BY created_at DESC;`, [article_id])
      .then((result) => {
        if(result.rows.length){
          return result.rows;
          
        } else return Promise.reject({status: 404, msg: 'not found'});
     });
  };