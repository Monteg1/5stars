const app = require('./App');

// Устанавливаем порт для приложения и запускаем сервер
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
