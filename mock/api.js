const router = require('express').Router();
const Mock = require('mockjs');

router.get('/', function(req, res, next) {
  res.json(
    Mock.mock({
      'count|21-29': 21,
      'postList|10': [{
        'id': Mock.mock('@id'),
        'title': Mock.mock('@ctitle'),
        'summary': Mock.mock('@cparagraph(5, 7)'),
        'date': Mock.mock('@date("yyyy-MM-dd")'),
        'tag|3-6': [Mock.mock('@cword(3)')],
        'category': Mock.mock('@cword(3)'),
      }]
    })
  );
});

router.get('/post/:id', function(req, res, next) {
  res.json(
    Mock.mock({
      'id': Mock.mock('@id'),
      'title': Mock.mock('@ctitle'),
      'content': Mock.mock('@cparagraph(50, 70)'),
      'date': Mock.mock('@date("yyyy-MM-dd")'),
      'tag|3-6': [Mock.mock('@cword(3)')],
      'category': Mock.mock('@cword(3)'),
      'next': Mock.mock('@id'),
      'pre': Mock.mock('@id'),
    })
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
