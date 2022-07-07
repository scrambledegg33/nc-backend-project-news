const db = require('../db/connection.js');

exports.fetchArticles = (sortBy, order, topic) => {
    
    const sortByValues = ['title', 'topic', 'author', 'body', 'created_at', 'votes', 'comment_count'];
    
    if (sortBy &&!sortByValues.includes(sortBy)) {
        return Promise.reject({status: 404, msg: 'not found'});
      }

      //check if order is undefined
    if((order != 'asc' && order) || (order != 'desc' && order)){
        return Promise.reject({status: 404, msg: 'not found'});
    }

    const sortByDefault = sortBy ?  sortBy : sortBy = 'created_at';
    const orderDefault = order ? order : 'DESC';
    const topicDefault = topic ? `WHERE topic = ${topic}` : '';

    return db.query(`SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, CAST(COUNT(comments.article_id) AS int) AS comment_count FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    ${topicDefault}
    GROUP BY articles.article_id
    ORDER BY articles.${sortByDefault} ${orderDefault};`)
    .then((result) => {
        
        return result.rows;
}).catch((err) => {
    console.log(err);
})
};