/*eslint-disable*/
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const app = express();

app.get('/api/movies/id/:id', async (req, res) => {
    const url = `${process.env.API_BASE_URL}?apiKey=${process.env.API_KEY}&i=${req.params.id}`;
    const apiResponse = await axios.get(url);
    res.send(apiResponse.data);
});

app.get('/api/movies/search/:name', async (req, res) => {
    const url = `${process.env.API_BASE_URL}?apiKey=${process.env.API_KEY}&s=${req.params.name}`;
    const apiResponse = await axios.get(url);
    res.send(apiResponse.data);
});

app.get('/api/movies/title/:title', async (req, res) => {
    const url = `${process.env.API_BASE_URL}?apiKey=${process.env.API_KEY}&t=${req.params.title}`;
    const apiResponse = await axios.get(url);
    res.send(apiResponse.data);
});

app.use('/', serveStatic(path.join(__dirname, '/dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`app is listening on port: ${port}`);
