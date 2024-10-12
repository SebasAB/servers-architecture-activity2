const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

// Proteger las rutas de posts con el middleware de autenticación
router.post('/', authMiddleware, postController.createPost);
router.get('/', authMiddleware, postController.getAllPosts);
router.get('/:id', authMiddleware, postController.getPostById);
router.patch('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
