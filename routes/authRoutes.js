const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Маршрут для регистрации пользователя
router.post('/register', register);

// Маршрут для входа пользователя (авторизации)
router.post('/login', login);

module.exports = router; // Экспортируем маршруты для использования в основном приложении
