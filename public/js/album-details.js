// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', async () => {
    // Get the album ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('id');

    // Check if the album ID is present in the URL
    if (!albumId) {
        alert('Album ID is missing'); // Alert the user if the album ID is missing
        return; // Exit the function if the album ID is missing
    }

    try {
        // Fetch album data for the specific album by ID
        const response = await fetch(`/api/albums/${albumId}`);
        const album = await response.json(); // Parse the JSON response

        // Display album details
        const albumDetails = document.getElementById('albumDetails');
        albumDetails.innerHTML = `
            <img src="${album.cover}" class="img-fluid mb-4" alt="Album Cover">
            <h2>${album.name}</h2>
            <h4>${album.artist}</h4>
            <p>${album.year}</p>
            <p>${album.description}</p>
        `;

        // Display comments
        const commentsList = document.getElementById('commentsList');
        commentsList.innerHTML = '';

        //Don't display comments if there are none otherwise an error will be thrown
        if (album.comments && album.comments.length > 0) {
            album.comments.forEach(comment => {
                const commentElement = `
                    <div class="comment">
                        <p><strong>${comment.user}</strong>: ${comment.comment}</p>
                    </div>
                `;
                commentsList.insertAdjacentHTML('beforeend', commentElement);
            });
        }

    } catch (error) {
        console.error('Error fetching album data:', error); // Log any errors to the console
        alert('An error occurred while fetching album data. Please try again later.'); // Alert the user about the error
    }
});