const chokidar = require('chokidar')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

const API_ENDPOINT = 'http://localhost:3000/notes';
const WATCH_DIRECTORY = '/home/alexey/notes/';

// Watch for file changes
chokidar.watch(WATCH_DIRECTORY).on('change', (filePath) => {
    // Read the changed file
    const content = fs.readFileSync(filePath, 'utf-8');
    const title = path.basename(filePath, '.md');  // Assumes filename is the note title

    // Check if the note already exists on the server (based on title)
    axios.get(`${API_ENDPOINT}/${title}`).then(response => {
        if (response.data && response.data.note) {
            // If the note exists, update it
            axios.put(`${API_ENDPOINT}/${response.data.note.id}`, {
                title: title,
                content: content
            });
        } else {
            // If the note doesn't exist, create a new one
            axios.post(API_ENDPOINT, {
                title: title,
                content: content
            });
        }
    }).catch(error => {
        console.error("Error synchronizing the file:", error);
    });
});
