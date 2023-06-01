const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const loginRoutes = require('../public/login');
const msgRoutes = require('../public/msg');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/login', loginRoutes);
app.use('/',msgRoutes);

app.use((req, res, next) => {
    res.status(404).send('<p>Error 404</p><h3>Page not found</h3>');
  });
  

app.listen(3000);