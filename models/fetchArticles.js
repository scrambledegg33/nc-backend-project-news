const db = require('../db/connection.js');

exports.fetchArticles = (sortBy = 'created_at', order = 'desc', topic) => {
    
    const sortByValues = ['title', 'topic', 'author', 'body', 'created_at', 'votes', 'comment_count'];
    
    let queryStr = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, CAST(COUNT(comments.article_id) AS int) AS comment_count FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id`
    let topicArr = [];
    if(topic){
        queryStr += ' WHERE topic = $1'
        topicArr.push(topic);
    } 
    
    queryStr += ' GROUP BY articles.article_id';

    if (sortBy && !sortByValues.includes(sortBy)) {
        return Promise.reject({status: 404, msg: 'not found'});
      } else if (sortBy && sortByValues.includes(sortBy)) {
        queryStr += ` ORDER BY articles.${sortBy}`
      }

    if(order != 'asc' && order != 'desc'){
        return Promise.reject({status: 404, msg: 'not found'});
    } else {
        queryStr += ` ${order}`
    }

    return db.query(queryStr, topicArr)
    .then((result) => {
        return result.rows;
}).catch((err) => {
    console.log(err);
})
};