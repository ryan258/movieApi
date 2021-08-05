var express = require('express');
var router = express.Router();

/* GET movie data. */
// /movie/...
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
