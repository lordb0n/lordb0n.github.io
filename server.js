const express = require('express');
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');
const bodyParser = require('body-parser'); // Додаємо body-parser для обробки POST-запитів

const app = express();
const port = 3104; // Порт, на якому працює сервер

// Налаштування сесії
app.use(session({
    secret: 'your-secret-key', // Змініть на ваш секретний ключ
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Змініть на true, якщо використовуєте HTTPS
}));

// Налаштування body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Налаштування статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

// Налаштовуємо кореневий маршрут для надсилання index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Маршрут для обробки аутентифікації через Telegram
app.get('/auth/telegram', (req, res) => {
    const authData = req.query;
    const checkHash = authData.hash;
    delete authData.hash;

    const secretKey = crypto.createHash('sha256').update('YOUR_BOT_TOKEN').digest();
    const dataCheckString = Object.keys(authData).sort().map(key => `${key}=${authData[key]}`).join('\n');
    const hash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    if (hash === checkHash) {
        req.session.userId = authData.id;
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

// Маршрут для обробки логіну через форму
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;

    // Простий приклад перевірки логіну і паролю (замість цього використовуйте базу даних)
    if (username === 'admin' && password === 'password') {
        req.session.userId = username;
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

// Маршрут для перевірки аутентифікації
app.get('/auth/check', (req, res) => {
    res.json({ authenticated: !!req.session.userId });
});

// Запускаємо сервер на всіх інтерфейсах
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
