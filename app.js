const express = require("express");
const { getTopics } = require('./controllers/getTopics');
const { getArticleById } = require('./controllers/getArticleById');

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);


app.use((err, req, res, next) => {
    if (err.code === '22P02') {
      res.status(400).send({ msg: 'Invalid input' });
    }});
  


app.use('*', (req, res) => {
    res.status(404).send({msg: 'not found'});
    });

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({msg: '500 server error'});
})

module.exports = app;