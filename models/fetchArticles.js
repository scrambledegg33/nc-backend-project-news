const db = require('../db/connection.js');

exports.fetchArticles = (sortBy, order, topic) => {
    
    const sortByValues = ['title', 'topic', 'author', 'body', 'created_at', 'votes', 'comment_count'];

    let queryStr = 'SELECT * FROM articles';
    
    if (!sortByValues.includes(sortBy)) {
        return Promise.reject({status: 404, msg: 'not found'});
      }
    if(order != 'ASC' || order != 'DESC'){
        return Promise.reject({status: 404, msg: 'not found'});
    }
    return db.query(`SELECT * FROM topics
            WHERE slug = $1`, [topic]).then((topicValue) => console.log(topicValue));


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