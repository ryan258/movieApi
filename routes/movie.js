var express = require('express');
var router = express.Router();

const movieDetails = require('../data/movieDetails')

/* GET movie data. */
// /movie/... 
//! everything we make here will already have /movie/ in front of it or it wouldn't have happened in the first place

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
// GET /movie/{topRated}


// POST /movie/{movieId}/rating

// DELETE /movie/{movieId}/rating

module.exports = router;
