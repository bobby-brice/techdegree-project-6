const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const { projects } = require('./data/data.json');

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
app.use('/project', project);

//Middleware to catch errors
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.err = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error', err);
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));