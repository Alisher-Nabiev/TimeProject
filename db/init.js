const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'time_tracking.db');
const initSql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Initialize database
db.serialize(() => {
    // Create workdays table
    db.run(`
        CREATE TABLE IF NOT EXISTS workdays (
            id TEXT PRIMARY KEY,
            period_id TEXT,
            date TEXT,
            day_of_week TEXT,
            is_work_day INTEGER,
            expected_hours REAL,
            logged_hours REAL,
            client_hours REAL,
            general_hours REAL,
            exception_type TEXT
        )
    `);

    // Create exceptions table
    db.run(`
        CREATE TABLE IF NOT EXISTS exceptions (
            id TEXT PRIMARY KEY,
            date TEXT,
            type TEXT,
            hours_adjusted REAL
        )
    `);

    console.log('Database initialized successfully.');
});

module.exports = db; 