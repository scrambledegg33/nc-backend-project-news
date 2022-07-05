const db = require('../db/connection.js');


exports.fetchArticleById = (article_id) => {
    return db
      .query(`SELECT articles.*, CAST(COUNT(comments.article_id) AS int) AS comment_count FROM articles
      LEFT JOIN comments
      ON articles.article_id = comments.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id;`, [article_id])
      .then((result) => {
        if(result.rows.length){
          return result.rows[0];
          
        } else return Promise.reject({status: 404, msg: 'not found'});
     });
  };