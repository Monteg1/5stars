const mongoose = require('mongoose');

// Функция подключения к MongoDB
const connectDB = async () => {
    try {
        // Подключаемся к базе данных MongoDB, используя строку подключения из переменных окружения
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected'); // Логируем успешное подключение
    } catch (error) {
        console.error('MongoDB connection failed:', error.message); // Логируем ошибку при подключении
        process.exit(1); // Завершаем процесс с ошибкой
    }
};

module.exports = connectDB; // Экспортируем функцию подключения для использования в других частях приложения
