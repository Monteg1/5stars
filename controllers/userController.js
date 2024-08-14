const User = require('../models/User');

// Получение всех пользователей (доступно только авторизованным пользователям)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Извлекаем всех пользователей, исключая пароли
        res.json(users); // Возвращаем список пользователей
    } catch (error) {
        res.status(500).json({ error: 'Server error' }); // Обрабатываем ошибки сервера
    }
};

// Получение данных конкретного пользователя по ID (доступно только авторизованным пользователям)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Ищем пользователя по ID, исключая пароль

        if (!user) {
            return res.status(404).json({ error: 'User not found' }); // Если пользователь не найден, возвращаем ошибку
        }

        res.json(user); // Возвращаем данные пользователя
    } catch (error) {
        res.status(500).json({ error: 'Server error' }); // Обрабатываем ошибки сервера
    }
};
