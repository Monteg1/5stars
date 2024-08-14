const express = require('express');
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Маршрут для получения списка всех задач и создания новой задачи, доступен только авторизованным пользователям
router.route('/').get(protect, getTasks).post(protect, createTask);

// Маршрут для обновления и удаления задачи по ID, доступен только авторизованным пользователям
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);

module.exports = router; // Экспортируем маршруты для использования в основном приложении
