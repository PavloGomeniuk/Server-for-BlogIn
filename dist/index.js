'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _Post = require('./models/Post');

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var app = (0, _express2.default)();
_mongoose2.default.connect('mongodb://mongo/test');
app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.post('/posts', function (req, res) {
	var data = req.body;

	var post = new _Post2.default({
		title: data.title,
		text: data.text,
		backgroundURL: data.backgroundURL
	});

	post.save().then(function () {
		res.send({ status: 'ok' });
	});
});

app.get('/posts', function (req, res) {
	_Post2.default.find().then(function (err, posts) {
		if (err) {
			res.send(err);
			return;
		}
		res.json(posts);
	});
});

app.get('/posts/:id', function (req, res) {
	_Post2.default.findOne({ _id: req.params.id }).then(function (err, posts) {
		if (err) {
			res.send(err);
			return;
		}
		res.json(posts);
	});
});

app.delete('/posts/:id', function (req, res) {
	_Post2.default.remove({
		_id: req.params.id
	}).then(function (post) {
		if (post) {
			res.json({ status: 'deleted' });
		} else {
			res.json({ status: 'error' });
		}
	});
});

app.put('/posts/:id', function (req, res) {
	_Post2.default.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
		if (err) {
			res.send(err);
			return;
		}
		res.json({ status: 'updated' });
	});
});

app.listen(3000, function () {
	console.log("server start");
});