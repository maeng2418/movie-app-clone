var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser'); // Body 데이터를 분석(parse)해서 req.body로 출력해주는 것

var usersRouter = require('./routes/users');
var faovriteRouter = require('./routes/favorite');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// aplication/json
app.use(bodyParser.json());

app.use('/api/users', usersRouter);
app.use('/api/favorite', faovriteRouter);

module.exports = app;
