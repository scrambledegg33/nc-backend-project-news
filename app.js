const express = require("express");
const {getTopics} = require('./controllers/getTopics');

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);


app.use('*', (req, res) => {
    res.status(404).send({msg: 'not found'});
    });

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({msg: '500 server error'});
})

module.exports = app;