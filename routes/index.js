var express = require('express');
var router = express.Router();

const movies = require('../data/movies') // a big array of movie teaser data

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get most popular movies
router.get('/most_popular', (req, res, next) => {
  // Get the "page" variable from the query string.
  let page = req.query.page
  if (page === undefined) page = 1
  // we want to return the movies that are true for most popular
  let results = movies.filter(movie => movie.most_popular);
  // handle pagination of 20 results per page
  const indexToStart = (page - 1) * 20
  const indexToEnd = indexToStart + 20
  results = results.slice(indexToStart, indexToEnd)
  res.json({
    page,
    results
  });
})

module.exports = router;
