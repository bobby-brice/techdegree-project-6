const express = require('express');
const app = express();
const path = require('path');

//adding in the pug routes
const index = require('./routes/index');
const about = require('./routes/about');
const project = require('./routes/project');

//setting the view engine and the static path
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
  console.error('Uh Oh, the page cannot be found');
  const err = new Error('The page cannot be found');
  err.status = 404;
  next(err);
});

app.use((req, res, next) => {
  const err = new Error('Sorry, an error occurred');
  console.error("An Error Occurred");
  err.status = 500;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

//establish our local host port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));