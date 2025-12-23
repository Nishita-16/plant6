const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../models/Post');

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// CREATE POST
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const post = new Post({
      plantName: req.body.plantName,
      description: req.body.description,
      location: req.body.location,
      imageUrl: req.file ? req.file.filename : null,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ALL POSTS
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
