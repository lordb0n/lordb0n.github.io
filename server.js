const express = require('express');
const path = require('path');
const app = express();
const port = 3104; // Порт, на якому працює сервер

// Налаштування статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

// Налаштовуємо кореневий маршрут для надсилання index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Запускаємо сервер на всіх інтерфейсах
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
