const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '鑫新企业管理咨询微信公众号' });
});

module.exports = router;
