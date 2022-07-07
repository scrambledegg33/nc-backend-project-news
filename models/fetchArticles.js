const db = require('../db/connection.js');

exports.fetchArticles = (sortBy, order, topic) => {
    
    const queryValues = [];
    //['title', 'topic', 'author', 'body', 'created_at', 'votes', 'comment_count'];
    let queryStr = 'SELECT * FROM articles';
    
    if (sortBy) {
        queryValues.push('title');
        queryStr += `WHERE title = $1`;
      }



/*const sortByDefault = sortBy ?  sortBy : sortBy = 'created_at'
const orderDefault = order ? order :order = 'DESC;
const orderTopic = topic ? */


    return db.query(`SELECT articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, CAST(COUNT(comments.article_id) AS int) AS comment_count FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    ${topic}
    GROUP BY articles.article_id
    ORDER BY ${sortBy} ${order};`)
    .then((result) => {
        
        return result.rows;
}).catch((err) => {
    console.log(err);
})
};