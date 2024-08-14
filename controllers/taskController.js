const Task = require('../models/Task');

// Получение всех задач текущего пользователя
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }); // Ищем все задачи, связанные с текущим пользователем
        res.json(tasks); // Возвращаем список задач
    } catch (error) {
        res.status(500).json({ error: 'Server error' }); // Обрабатываем ошибки сервера
    }
};

// Создание новой задачи для текущего пользователя
exports.createTask = async (req, res) => {
    const { title, description } = req.body; // Извлекаем данные из запроса

    try {
        const newTask = new Task({
            user: req.user.id, // Связываем задачу с текущим пользователем
            title,
            description,
        });

        const task = await newTask.save(); // Сохраняем задачу в базе данных
        res.json(task); // Возвращаем созданную задачу
    } catch (error) {
        res.status(500).json({ error: 'Server error' }); // Обрабатываем ошибки сервера
    }
};

// Обновление существующей задачи
exports.updateTask = async (req, res) => {
    const { title, description } = req.body; // Извлекаем данные из запроса

    try {
        let task = await Task.findById(req.params.id); // Ищем задачу по ID

        if (!task) {
            return res.status(404).json({ error: 'Task not found' }); // Если задача не найдена, возвращаем ошибку
        }

        // Проверяем, является ли текущий пользователь владельцем задачи
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' }); // Если нет, возвращаем ошибку авторизации
        }

        task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description }, // Обновляем поля задачи
            { new: true }
        );

        res.json(task); // Возвращаем обновленную задачу
    } catch (error) {
        res.status(500).json({ error: 'Server error' }); // Обрабатываем ошибки сервера
    }
};

// Удаление существующей задачи
exports.deleteTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id); // Ищем задачу по ID

        if (!task) {
            return res.status(404).json({ error: 'Task not found' }); // Если задача не найдена, возвращаем ошибку
        }

        // Проверяем, является ли текущий пользователь владельцем задачи
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' }); // Если нет, возвращаем ошибку авторизации
        }

        await Task.findByIdAndDelete(req.params.id); // Удаляем задачу из базы данных
        res.json({ message: 'Task removed' }); // Возвращаем подтверждение удаления
    } catch (error) {
        res.status(500).json({ error: 'Server error' }); // Обрабатываем ошибки сервера
    }
};


