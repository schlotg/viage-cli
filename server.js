const express = require('express');
const app = express();
const folder = 'dist';
const port = '3000';
app.all('*', (req, res, next) => {
  console.log(`${req.method} : ${req.originalUrl} called`);
  next();
});
app.use(express.static(folder));
app.listen(port, () => console.log(`Serving ${folder} folder at http://localhost:${port}`));