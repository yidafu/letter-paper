const router = require('express').Router();
const Mock = require('mockjs');
const postData = require('./posts.json');

router.get('/', function(req, res, next) {
  res.json(
    postData
  );
});

router.get('/post/:id', function(req, res, next) {
  res.json(
    postData.posts[req.params.id]
  );
});

router.get('/tags', function (req, res, next) {
  res.json(
    Array(Math.round(Math.random() * 10) + 1).fill(Mock.mock({
      'name': Mock.mock('@cword(2,4)'),
      'tags|3-9': [{
        'id': Mock.mock('@id'),
        'title': Mock.mock('@ctitle'),
      }],
    }))
  );
});

router.get('/tags/:tags', function (req, res, next) {
  res.json(
    Mock.mock({
      'name': Mock.mock('@cword(2,4)'),
      'tags|3-9': [{
        'id': Mock.mock('@id'),
        'title': Mock.mock('@ctitle'),
      }],
    })
  );
});

router.get('/archive', function (req, res, next) {
  res.json(
    Array(Math.round(Math.random() * 10) + 1).fill(Mock.mock({
      'name': Mock.mock('@cword(2,4)'),
      'tags|3-9': [{
        'id': Mock.mock('@id'),
        'title': Mock.mock('@ctitle'),
      }],
    }))
  );
});

router.get('/archive/:date', function (req, res, next) {
  res.json(
    Mock.mock({
      'name': Mock.mock('@cword(2,4)'),
      'tags|3-9': [{
        'id': Mock.mock('@id'),
        'title': Mock.mock('@ctitle'),
      }],
    })
  );
});

module.exports = router;
