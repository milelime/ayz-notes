const db = require('../database');

class Note {
    static findAll(callback) {
        db.all('SELECT * FROM notes', callback);
    }

    static findById(id, callback) {
        db.get('SELECT * FROM notes WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        const { title, content, lastModified } = data;
        db.run('INSERT INTO notes (title, content, lastModified) VALUES (?, ?, ?)', [title, content, lastModified], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, { id: this.lastID, title, content, lastModified });
        });
    }

    static update(id, data, callback) {
        const { title, content, lastModified } = data;
        db.run('UPDATE notes SET title = ?, content = ?, lastModified = ? WHERE id = ?', [title, content, lastModified, id], function(err) {
            if (err) {
                return callback(err);
            }
            if (this.changes === 0) {
                return callback(null, null);
            }
            callback(null, { id, title, content, lastModified });
        });
    }

    static delete(id, callback) {
        db.run('DELETE FROM notes WHERE id = ?', [id], callback);
    }
}

module.exports = Note;

