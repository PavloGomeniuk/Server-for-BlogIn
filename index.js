
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import PostModel from './models/Post';

const app = express();
mongoose.connect('mongodb://localhost/test');
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.post('/posts', (req,res)=> {
	const data = req.body;
	const post = new PostModel({
	title: data.title,
	text: data.text,
	backgroundURL: data.backgroundURL
	});

	post.save().then(()=>{
	res.send({status:'ok'});
	});
});

app.get('/posts',(req,res)=>{
	PostModel.find().then((err,posts)=>{
		if (err) {
			res.send(err);
		}
		res.json(posts);
	});
});

app.delete('/posts/:id', (req,res)=>{
	PostModel.remove({
		_id: req.params.id
	}).then(post=>{
		if(post) {
			res.json({status:'deleted'});
		}
		else{
			res.json({status:'error'});
		}
	});
});

app.put('/posts/:id', (req,res)=>{
	PostModel.findByIdAndUpdate(req.params.id, {$set: req.body}, err=>{
		if(err) {
			res.send(err);
		}
		res.json({status:'udated'});
	});
});



app.listen(3000,()=>{
	console.log("server start");
})



