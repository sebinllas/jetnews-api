import express from 'express';
import { json } from 'express';
import { readJSON } from './utils.js';

const app = express();
app.use(json());
const port = 3000;

const feed = readJSON('./data/feed.json');
const posts = feed.recommendedPosts
.concat(feed.highlightedPost)
.concat(feed.popularPosts)
.concat(feed.recentPosts);

app.get('/feed', (req, res) => {
	console.log("GET - /feed")	
	res.send(feed);
});

app.get('/posts', (req, res) => {
	console.log("GET - /posts")
	res.send(posts);
});

app.get('/posts/:id', (req, res) => {
	console.log("GET - /posts/:id")
  const post = posts.find((post) => post.id === req.params.id);
  res.send(post);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
