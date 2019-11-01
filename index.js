


// const posts = [
// 	{
// 		title: "Helll",
// 		text: "welcome hell"
// 	},
// 	{
// 		title: "Helllooo",
// 		text: "welcome helloo"
// 	},
// ]



// app.get('/posts/:id', function(req,res){
// 	const id = req.params.id;
// 	return res.send(posts[id]);
// });





// const express = require('express');


// const bodyParser = require('body-parser');

import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import PostModel from './models/Post';

const app = express();
mongoose.connect('mongodb://localhost/test');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.post('/posts', (req,res)=> {
	const data = req.body;
	// console.log(data);
	// posts.push(data);
	// return res.send(posts);

	const post = new PostModel({
	title: data.title,
	text: data.text
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



