const express = require('express');
const Blog = require('../modal/blog');

const router = express.Router();

//get method
router.get("/get", async (req, res) => {
    try {
        const data = await Blog.find();
        if (data) {
            res.status(200).json(data)
        }
    }
    catch (err) {
        res.status(400).json({ 'error': 'Cannot Get' });
    }
});

//post method
router.post("/add", async (req, res) => {
    try {
        const newBlog = await new Blog({
            title: req.body.title,
            description: req.body.description,
            creator: req.body.creator,
            tags: req.body.tags,
        })
        await newBlog.save()
        res.status(200).json({ 'message': 'Blog added successfully' })
    }
    catch (err) {
        res.status(400).json({ 'error': 'Blog add failed!!' });
    }
});


router.get("/get/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Blog.findById(id)
        if (data)
            res.status(200).json(data)
    }
    catch (err) {
        res.status(400).json({ 'error': 'Cannot Get' });
    }
});


router.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Blog.findById(id)
        if (data) {
            await Blog.findByIdAndUpdate(id, {
                title: req.body.title,
                description: req.body.description,
                tags: req.body.tags,
                upvote: req.body.upvote,
                creator: req.body.creator,
            })
            res.status(200).json({ 'message': 'Updated Successfully!!!' })
        }
    }
    catch (err) {
        res.status(400).json({ 'error': 'Update Failed!!!' });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Blog.findById(id)
        if (data) {
            await Blog.findByIdAndDelete(id)
            res.status(200).json({ 'message': 'Blog Deleted Successfully!!!' });
        }
    }
    catch (err) {
        res.status(400).json({ 'error': 'Blog Deleted Failed!!!' });
    }
});

router.patch("/update/:id/likedBlogPost", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Blog.findById(id)
        if (data) {
            await Blog.findByIdAndUpdate(id, {
                upvote: ++data.upvote,
            })
            res.status(200).json({ 'message': 'Voted Successfully!!!' })
        }
    }
    catch (err) {
        res.status(400).json({ 'error': 'Vote Failed!!!' });
    }
});

module.exports = router