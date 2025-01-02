document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const successBanner = document.getElementById('success-banner');


    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const albumTitle = document.getElementById('album-title').value;
        const artistName = document.getElementById('artist-name').value;
        const releaseDate = document.getElementById('release-date').value;
        const albumDescription = document.getElementById('album-description').value;

        const albumData = {
            id: null,
            name: albumTitle,
            artist: artistName,
            year: releaseDate,
            cover:'images/placeholder-album-cover.jpg',
            description: albumDescription,
            comments: []
        };

        console.log('Album data:', albumData);

        try {
            const response = await fetch('/api/submit-album', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(albumData)
            });

            if (response.ok) {
                // Show the success banner
                successBanner.style.display = 'block';
                // Clear the form then redirect
                form.reset();
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000); // Redirect after 2 seconds

            } else {
                alert('Failed to add album. Please try again.');
            }
        } catch (error) {
            console.error('Error adding album:', error);
            alert('An error occurred. Please try again.');
        }
    });
});