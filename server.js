const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3104;

const db = new sqlite3.Database('./register.db');

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
            res.status(500).json({ success: false });
        } else if (row) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
