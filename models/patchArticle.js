const db = require('../db/connection.js');

const patchArticle = (votes, articleId) => {
   
 
  if(!Number.isInteger(votes)){
    return Promise.reject({status: 400, msg: 'Invalid input'});
  }
  
  
  return db.query(`UPDATE articles SET votes = (votes + $1) WHERE article_id = $2 RETURNING *;`, [votes, articleId])
    .then(({ rows }) => {

       
        return rows[0];

      })
    .catch((err) => {
        console.log(err);
    })
};

module.exports = patchArticle;