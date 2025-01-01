const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));
// Middleware to parse JSON request bodies
app.use(express.json());

// Helper function to read the albums.json file
const readAlbumsFile = (callback) => {
    fs.readFile(path.join(__dirname, 'albums.json'), 'utf8', (err, data) => {
        if (err) {
            // If there is an error reading the file, call the callback with the error
            callback(err, null);
            return;
        }
        // Parse the JSON data from the file
        const albums = JSON.parse(data);
        // Call the callback with the parsed albums data
        callback(null, albums);
    });
};

// Route to get all album data
app.get('/api/albums', (req, res) => {
    // Use the helper function to read the albums.json file
    readAlbumsFile((err, albums) => {
        if (err) {
            // If there is an error reading the file, send a 500 status code with an error message
            res.status(500).send('Error reading album data');
            return;
        }
        // Send the parsed albums data as a JSON response
        res.status(200).json(albums);
    });
});

// Route to get a specific album by ID
app.get('/api/albums/:id', (req, res) => {
    const albumId = req.params.id; // Get the album ID from the request parameters
    // Use the helper function to read the albums.json file
    readAlbumsFile((err, albums) => {
        if (err) {
            // If there is an error reading the file, send a 500 status code with an error message
            res.status(500).send('Error reading album data');
            return;
        }
        // Find the album with the specified ID
        const album = albums.find(a => a.id == albumId);
        if (!album) {
            // If the album is not found, send a 404 status code with an error message
            res.status(404).send('Album not found');
            return;
        }
        // Send the found album data as a JSON response
        res.status(200).json(album);
    });
});

// Route to add a comment to a specific album by ID
app.post('/api/albums/:id/comments', (req, res) => {
    const albumId = req.params.id; // Get the album ID from the request parameters
    const newComment = req.body; // Get the new comment from the request body

    // Use the helper function to read the albums.json file
    readAlbumsFile((err, albums) => {
        if (err) {
            res.status(500).send('Error reading album data');
            return;
        }

        // Find the album with the specified ID
        const album = albums.find(a => a.id == albumId);
        if (!album) {
            res.status(404).send('Album not found');
            return;
        }

        // Add the new comment to the album's comments array
        album.comments.push(newComment);

        // Write the updated albums data back to the albums.json file
        fs.writeFile(path.join(__dirname, 'albums.json'), JSON.stringify(albums, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error saving comment');
                return;
            }
			res.status(200).send('Comment added successfully');
        });
    });
});

// Route to submit a new album
app.post('/api/submit-album', (req, res) => {
	const newAlbum = req.body; // Get the new album data from the request body

	// Use the helper function to read the albums.json file
	readAlbumsFile((err, albums) => {
		if (err) {
			res.status(500).send('Error reading album data');
			return;
		}

		// Generate a new unique ID for the album
		newAlbum.id = albums.length + 1;
		// Add the new album to the albums array
		albums.push(newAlbum);

		// Write the updated albums data back to the albums.json file
		fs.writeFile(path.join(__dirname, 'albums.json'), JSON.stringify(albums, null, 2), (err) => {
			if (err) {
				res.status(500).send('Error saving album');
				return;
			}
			res.status(200).send('Album added successfully');
		});
	});
});

// Export the app module
module.exports = app;