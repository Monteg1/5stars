const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Миддлвар для защиты маршрутов, требующих аутентификации
exports.protect = async (req, res, next) => {
    let token;

    // Проверяем, есть ли токен в заголовке авторизации
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // Извлекаем токен из заголовка
    }

    // Если токен отсутствует
    if (!token) {
        return res.status(401).json({ error: 'Not authorized' }); // Возвращаем ошибку 401 (не авторизован)
    }

    try {
        // Верифицируем токен и извлекаем данные пользователя
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Находим пользователя по ID, исключая пароль из результата
        req.user = await User.findById(decoded.id).select('-password');

        next(); // Передаем управление следующему миддлвару
    } catch (error) {
        res.status(401).json({ error: 'Token is not valid' }); // Возвращаем ошибку 401 при неверном токене
    }
};
