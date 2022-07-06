const db = require('../db/connection.js');

exports.fetchArticles = ({sort_by = 'created_at', order = 'DESC'}) => {
    
    const allowed = ['title', 'topic', 'author', 'body', 'created_at', 'votes'];
    if(!allowed.includes(sort_by)){
        return Promise.reject('invalid query');
    }
    const allowedOrdering = ['ASC'];
    if(!allowedOrdering.includes(order)){
        return Promise.reject('invalid query');
    }
    
    return db.query(`SELECT articles.*, CAST(COUNT(comments.article_id) AS int) AS comment_count FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY created_at DESC;`)
    .then((result) => {
        
        return result.rows;
}).catch((err) => {
    console.log(err);
})
};