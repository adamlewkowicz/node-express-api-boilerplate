const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PrettyError = require('pretty-error');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => res.status(404).json({ msg: 'Inappropriate request' }));

app.use((err, req, res, next) => {

  if (process.env.NODE_ENV === 'development') {
    const prettyError = new PrettyError();
    console.log(prettyError.render(err));
  }

  res.status(err.status || 500);
  res.json({ msg: process.env.NODE_ENV === 'developement'
    ? err.msg || err.message || 'Internal server error (No msg specified)'
    : 'Internal server error'
  });
});

app.listen(process.env.PORT | 3000);