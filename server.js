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

app.get(['/api/movies/genre', '/api/movies/genre/:genre'], async (req, res) => {
	if(!req.params.genre) {
		return res.status(400).send({error: 'No genre found in request params'});
	}

	if(req.params.genre.split('').some(ch => ['+', '&'].indexOf(ch) !== -1)) {
		return res.status(400).send({error: 'Wrong genre format'});
	}

    axios.get(`${process.env.IMDB_GENRE_MOVIES_URL}${req.params.genre}`)
	.then((response) => {
		if(response.status === 200) {
			var html = response.data;
			let $ = cheerio.load(html);
            jsonframe($);

			var moviesFrame = {
				"movies": {
					"selector": "div.lister-list .lister-item",
					"data": [{
						"title": ".lister-item-content h3.lister-item-header a",
						"year": ".lister-item-content h3.lister-item-header span.lister-item-year",
						"poster": {
							"selector": ".lister-item-image a img",
							"attr": "src"
						},
						"imdbID": {
							"selector": ".lister-top-right .ribbonize",
							"attr": "data-tconst"
						},
						"rating": {
							"selector": ".lister-item-content div.ratings-imdb-rating",
							"attr": "data-value"
						},
						"plot": ".lister-item-content p.text-muted:nth-child(4)",
						"cast": ".lister-item-content p:contains(Directors), p:contains(Director), p:contains(Stars)"
					}]
				}
			};

			const movies = $('body').scrape(moviesFrame, { string: true }).movies.map((movie) => {
				return {
					title: movie.title ? movie.title : "N/A",
					year: movie.year ? movie.year : "N/A",
					poster: movie.poster ? movie.poster : "N/A",
					imdbID: movie.imdbID ? movie.imdbID : "N/A",
					rating: movie.rating ? movie.rating : "N/A",
					plot: movie.plot ? movie.plot : "N/A",
					cast: movie.cast ? movie.cast : "N/A",
				}
			});

            res.status(200).send({movies});
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
