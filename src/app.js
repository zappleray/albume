const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));
// Middleware to parse JSON request bodies
app.use(express.json());

// Route to get album data
app.get('/api/albums', (req, res) => {
    // Read the album data from the 'albums.json' file
    fs.readFile(path.join(__dirname, 'albums.json'), 'utf8', (err, data) => {
        if (err) {
            // Send a 500 error response if there is an error reading the file
            res.status(500).send('Error reading album data');
            return;
        }

        console.log("Data",data);
        console.log("JSON.parse(data)",JSON.parse(data));

        // Send the parsed JSON data as the response
        res.json(JSON.parse(data));
    });
});

// ... add other routes

// Export the app module
module.exports = app;