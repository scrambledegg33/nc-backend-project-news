const db = require('../db/connection.js');

const patchArticle = (votes, articleId) => {
   
 
  if(!Number.isInteger(votes)){
    return Promise.reject({status: 400, msg: 'Invalid input'});
  }
  
  
  return db.query(`UPDATE articles SET votes = (votes + $1) WHERE article_id = $2 RETURNING *;`, [votes, articleId])
    .then(({ rows }) => {

        if(rows.length == 0){
          return Promise.reject({status: 404, msg: 'not found'});
        }
      
   


       
        return rows[0];


      })
  
};

module.exports = patchArticle;