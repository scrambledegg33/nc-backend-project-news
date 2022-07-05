const express = require("express");
const { getTopics } = require('./controllers/getTopics');
const { getArticleById } = require('./controllers/getArticleById');
const { patchArticle } = require('./controllers/patchArticleById')

const app = express();
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

app.all('*', handleInvalidPaths)
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500s);

module.exports = app;