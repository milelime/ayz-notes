const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./notes.db', (err) => {
    if (err) {
        console.error('Failed to connect to the SQLite database!', err);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;
