const express = require('express');
const { getUsers, getUserById } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Маршрут для получения списка всех пользователей, доступен только авторизованным пользователям
router.get('/', protect, getUsers);

// Маршрут для получения информации о конкретном пользователе по его ID, доступен только авторизованным пользователям
router.get('/:id', protect, getUserById);

module.exports = router; // Экспортируем маршруты для использования в основном приложении
