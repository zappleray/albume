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

    const fetchAlbumData = async () => {
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
                    console.log(comment);
                });
            }

        } catch (error) {
            console.error('Error fetching album data:', error); // Log any errors to the console
            alert('An error occurred while fetching album data. Please try again later.'); // Alert the user about the error
        }
    };

    await fetchAlbumData();

    const addCommentBtn = document.getElementById('addCommentBtn');
    addCommentBtn.addEventListener('click', async () => {
        const newCommentText = document.getElementById('newComment').value;
        const newCommenterName = document.getElementById('commenterName').value;

        const newComment = {
            user: newCommenterName,
            comment: newCommentText
        };

        try {
            const response = await fetch(`/api/albums/${albumId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment)
            });

            if (response.ok) {
                await fetchAlbumData(); // Re-fetch the album data and re-render the comments
                document.getElementById('newComment').value = ''; // Clear the textarea
            } else {
                alert('Error adding comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('An error occurred while adding the comment. Please try again later.');
        }
    });
});