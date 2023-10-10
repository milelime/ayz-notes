const Note = require('../models/Note');

exports.getAllNotes = (req, res) => {
    Note.findAll((err, notes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ notes });
    });
};

exports.getNote = (req, res) => {
    const noteId = req.params.id;
    Note.findById(noteId, (err, note) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json({ note });
    });
};

exports.createNote = (req, res) => {
    const { title, content } = req.body;
    const lastModified = new Date().toISOString();
    Note.create({ title, content, lastModified }, (err, newNote) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ note: newNote });
    });
};

exports.updateNote = (req, res) => {
    const noteId = req.params.id;
    const { title, content } = req.body;
    const lastModified = new Date().toISOString();
    Note.update(noteId, { title, content, lastModified }, (err, updatedNote) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json({ note: updatedNote });
    });
};

exports.deleteNote = (req, res) => {
    const noteId = req.params.id;
    Note.delete(noteId, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Note deleted successfully' });
    });
};

