// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', async () => {
    let albums = [];

    try {
        // Fetch album data from the server
        const response = await fetch('/api/albums');
        console.log('Response', response);
        albums = await response.json(); // Parse the JSON response
        console.log('Response.json', albums);

        // Function to display albums
        const displayAlbums = (albumsToDisplay) => {
            const albumList = document.getElementById('albumList');
            albumList.innerHTML = ''; // Clear any existing content in the album list

            // Iterate over each album and create a card for it
            albumsToDisplay.forEach(album => {
                const albumCard = `
                    <div class="col-md-4 mb-4 d-flex">
                        <div class="card flex-fill" data-album-id="${album.id}">
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

            // Add click event listener to each album card
            document.querySelectorAll('.card').forEach(card => {
                // For each card, add an event listener for the 'click' event
                card.addEventListener('click', (event) => {
                    // Get the album ID from the 'data-album-id' attribute of the clicked card
                    const albumId = event.currentTarget.getAttribute('data-album-id');
                    // Redirect to the album details page with the album ID as a query parameter
                    window.location.href = `album-details.html?id=${albumId}`;
                });
            });
        };

        // Display all albums initially
        displayAlbums(albums);

        // Add event listener to the search input field
        const searchBox = document.getElementById('searchBox'); // Select the search input field by its ID

        searchBox.addEventListener('input', (event) => { // Add an event listener for the 'input' event
            const query = event.target.value.toLowerCase(); // Get the current value of the input field and convert it to lowercase

            // Filter the albums array based on the search query
            const filteredAlbums = albums.filter(album => 
                album.name.toLowerCase().includes(query) || // Check if the album name includes the search query
                album.artist.toLowerCase().includes(query)  // Check if the artist name includes the search query
            );

            // Display the filtered albums
            displayAlbums(filteredAlbums); // Call the displayAlbums function with the filtered albums
        });
    } catch (error) {
        console.error('Error fetching album data:', error); // Log any errors to the console
        alert('An error occurred while fetching album data. Please try again later.'); // Alert the user about the error
    }
});