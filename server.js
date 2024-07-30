const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3104;

const db = new sqlite3.Database('./register.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Database connected');
    }
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle login requests
app.post('/login', (req, res) => {
    const { login, password } = req.body;

    db.get('SELECT * FROM users WHERE login = ? AND password = ?', [login, password], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else if (row) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Invalid login or password' });
        }
    });
});
// Handle auto login requests
app.post('/auto-login', (req, res) => {
    const { telegramId, firstName, lastName, username } = req.body;

    db.get('SELECT * FROM users WHERE telegram_id = ?', [telegramId], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else if (row) {
            res.json({ success: true });
        } else {
            // Optional: Automatically create a user if not found
            db.run('INSERT INTO users (telegram_id, username, first_name, last_name) VALUES (?, ?, ?, ?)', 
                   [telegramId, username, firstName, lastName], (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                } else {
                    res.json({ success: true });
                }
            });
        }
    });
});
// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
