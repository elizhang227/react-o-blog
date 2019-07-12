const express = require('express');
const router = express.Router();
const postModel = require('../models/posts');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('Welcome to my api').status(200);
});

router.get('/post', async (req, res, next) => {
    const allPosts = await postModel.getAll();

    res.json(allPosts).status(200);
});

router.get('/post/:post_id?', async (req, res, next) => {
    const postId = req.params.post_id;
    const thePost = await postModel.getById(postId);
    res.json(thePost).status(200);
});

router.get('/delete/:post_id?', async (req, res, next) => {
    const postId = req.params.post_id;
    const response = await postModel.removeEntry(postId);
    console.log('response is', response.rowCount);
    if (response.command === 'DELETE' && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not delete Post ID ${postId}`).status(409);
    }
})

router.put('/update/:post_id?', async (req, res) => {
    const postId = req.params.post_id;
    const { content } = req.body;
    const response = await postModel.updateEntry(postId, 'content', content);
    if (response.command === 'UPDATE' && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`could not update post id ${postId}`).status(409)
    }
})

router.post('/post/add', async (req, res) => {
    //const { title, author_id, content } = req.body;
    const { title, content } = req.body;
    const author_id = 1;
    const response = await postModel.addPost(title, content, author_id);
    console.log('this is response', response)
    if (response.command === 'INSERT' && response.rowCount >= 1) {
        res.redirect('http://localhost:3001')
    } else {
        res.send(`Could not add new blog post ${title}`).status(409)
    }
    
})

module.exports = router;