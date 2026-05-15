console.log('Starting server...');
const express = require('express');
console.log('Express loaded');
const cors = require('cors');
const path = require('path');
const db = require('./database');
console.log('Database loaded');

const app = express();
const PORT = 3000;

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// API Routes
app.post('/api/contact', (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `INSERT INTO leads (name, email, phone, message) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, email, phone, message], function(err) {
        if (err) {
            console.error('Error saving lead:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Success', id: this.lastID });
    });
});

// Explicit Routes
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});

app.get('/services.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'services.html'));
});

if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

module.exports = app;
