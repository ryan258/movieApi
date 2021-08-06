var express = require('express');
var router = express.Router();

const movieDetails = require('../data/movieDetails')

function requireJSON(req, res, next) {
  if (!req.is('application/json')) { // if there is no body, it returns null
    res.json({ msg: "Content type must be application/json" })
  } else {
    next()
  }
}

router.param(('movieId'), (req, res, next) => {
  // if only certain apiKeys are allowed to hit movieId
  // update db w/ analytics data
  console.log("someone hit a route that used the movieId wildcard");
  next()
})

/* GET movie data. */
// /movie/... 
//! everything we make here will already have /movie/ in front of it or it wouldn't have happened in the first place
// GET /movie/{top_rated}
router.get('/top_rated', (req, res, next) => {
  let page = req.query.page
  if (!page) page = 1
  let results = movieDetails.sort((a,b)=>{
    return b.vote_average - a.vote_average
  })
  const indexToStart = (page - 1) * 20
  // const indexToEnd = indexToStart + 19
  results = results.slice(indexToStart, indexToStart+20)
  res.json(results)
})


// POST /movie/{movieId}/rating
router.post('/:movieId/rating', requireJSON, (req, res, next) => {
  const movieId = req.params.movieId
  // console.log(req.get('content-type'))
  const userRating = req.body.value
  if (userRating < .5 || userRating > 10) {
    res.json({ msg: "Rating must be between .5 and 10" })
  } else {
    res.json({ 
      msg: "Thank you for rating!",
      status_code: 200 
    })
  }
})

// DELETE /movie/{movieId}/rating
router.delete('/:movieId/rating', requireJSON, (req, res, next) => {
  res.json({ msg: "Rating deleted! 👻"})
})

//! this must come last because it will always be true for /movie/...
// GET /movie/{movieId}
router.get('/:movieId', function(req, res, next) {
  const movieId = req.params.movieId
  const results = movieDetails.find(movie => {
    console.log(movie.id, '========', movieId)
    return movie.id == (movieId)
  })
  // console.log(results)
  if (!results) {
    res.json({
      msg: 'Movie ID not found',
      production_companies: []
    })
  } else {
    res.json(results)
  }
});

module.exports = router;
