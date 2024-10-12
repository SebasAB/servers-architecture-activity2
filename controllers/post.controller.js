const Post = require("../models/post.model");

exports.createPost = async (req, res) => {
  try {
    const { title, text, author } = req.body;
    if (!title || !text || !author || title.length < 5 || text.length < 5) {
      return res.status(400).json({ message: "Validation error" });
    }
    const post = new Post({ title, text, author });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, text, author } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (title) post.title = title;
    if (text) post.text = text;
    if (author) post.author = author;
    post.updatedAt = Date.now();

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.remove();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
