const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Регистрация нового пользователя
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Проверяем, существует ли уже пользователь с таким именем
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Создаем нового пользователя, хеширование пароля будет выполнено автоматически в pre-save middleware
        user = new User({ username, password });


        // Сохраняем пользователя, где password будет автоматически хеширован в pre-save middleware
        await user.save();


        // Создаем JWT токен для авторизации
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};



// Авторизация пользователя
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Проверяем, существует ли пользователь
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Сравниваем введенный пароль с сохраненным хешем
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Создаем JWT токен для авторизации
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
