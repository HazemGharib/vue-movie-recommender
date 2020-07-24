/*eslint-disable*/
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');
const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');

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

app.get('/api/movies/top', async (req, res) => {
    axios.get(process.env.IMDB_TOP_MOVIES_URL)
	.then((response) => {
		if(response.status === 200) {
			var html = response.data;
			let $ = cheerio.load(html);
            jsonframe($);

			var moviesFrame = {
				"movies": {
					"selector": "tbody.lister-list tr",
					"data": [{
						"title": "td.titleColumn a",
						"rating": "td.ratingColumn.imdbRating strong"
					}]
				}
			};

            var movies = $('body').scrape(moviesFrame);
            res.status(200).send(movies);
		}
	}, (error) => {
        res.status(500).send(error);
	});
});

app.use('/', serveStatic(path.join(__dirname, '/dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`app is listening on port: ${port}`);
