const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Загружаем переменные окружения из .env файла
dotenv.config();

// Подключаемся к базе данных MongoDB
connectDB();

const app = express();

// Позволяем приложению обрабатывать JSON в теле запросов
app.use(express.json());

// Используем маршруты для аутентификации, управления пользователями и задачами
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Экспортируем приложение, без запуска сервера
module.exports = app;
