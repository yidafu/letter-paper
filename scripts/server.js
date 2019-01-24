const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.use(express.static(path.resolve('./dist')));

app.listen(8888, () => {
  console.log('server runnig at port: 8888');
});
