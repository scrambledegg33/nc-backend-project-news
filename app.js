const express = require("express");
const { getTopics } = require('./controllers/getTopics');
const { getArticleById } = require('./controllers/getArticleById');
const { patchArticle } = require('./controllers/patchArticleById');
const { getUsers } = require('./controllers/getUsers');
const { getArticles } = require('./controllers/getArticles');
const { getCommentsByArticleId } = require('./controllers/getCommentsByArticleId');
const { postComment } = require('./controllers/postComment');
const { deleteComment } = require('./controllers/deleteComment');
const { getDescription } = require('./controllers/getDescription');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

const {
    handleCustomErrors,
    handleInvalidPaths,
    handle500s,
    handlePsqlErrors,
  } = require('./controllers/controllers.errors.js');
  
  

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", patchArticle);

app.get("/api/users", getUsers);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postComment);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api", getDescription);

app.all('*', handleInvalidPaths)
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500s);

module.exports = app;