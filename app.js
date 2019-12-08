const express = require('express');
const app = express();
const path = require('path');

const index = require('./routes/index');
const about = require('./routes/about');
const project = require('./routes/project');

app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));

//Setting the homepage route
app.use('/', index);

//Setting the about page route
app.use('/about', about);

//Setting the project route
app.use('/projects', project);

//Middleware to catch errors
app.use((req, res, next) => {
  const err = new Error('Uh Oh, the page cannot be found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.err = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error', err);
});

//establish our local host port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));