const db = require('../db/connection.js');

exports.createComment = (article_id, username, body) => {
    return db
      .query(
        'INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;',
        [article_id, username, body]
      )
      .then(({ rows }) => {
        console.log(rows);
        return rows[0]
    });
  };