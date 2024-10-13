const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Registrar usuario
router.post('/register', userController.registerUser);

// Activar cuenta
router.get('/activate/:token', userController.activateAccount);

// Iniciar sesión
router.post('/login', userController.loginUser);

module.exports = router;
