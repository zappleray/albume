// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch album data from the server
        const response = await fetch('/api/albums');
        console.log("Response", response);
        const albums = await response.json(); // Parse the JSON response
        console.log("Response.json",albums);

        const albumList = document.getElementById('albumList');
        albumList.innerHTML = ''; // Clear any existing content in the album list

        // Iterate over each album and create a card for it
        albums.forEach(album => {
            const albumCard = `
                <div class="col-md-4 mb-4 d-flex">
                    <div class="card flex-fill">
                        <img src="${album.cover}" class="card-img-top" alt="Album Cover">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${album.name}</h5>
                            <p class="card-text">${album.artist}</p>
                            <p class="card-text mt-auto"><small class="text-muted">${album.year}</small></p>
                        </div>
                    </div>
                </div>
            `;
            // Insert the album card into the album list
            albumList.insertAdjacentHTML('beforeend', albumCard);
        });
    } catch (error) {
        console.error('Error fetching album data:', error); // Log any errors to the console
        alert('An error occurred while fetching album data. Please try again later.'); // Alert the user about the error
    }
});