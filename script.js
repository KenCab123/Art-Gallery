// Grab the ul element
const ul = document.querySelector("ul .artwork");

// Define the API URL for fetching artwork data
const API_URL = 'https://api.artic.edu/api/v1/artworks';

// // When the DOM is fully loaded, execute this function. DOMContentLoaded is an event that get triggered when the initial HTML document has been completely loaded.
document.addEventListener("DOMContentLoaded", () => {
    // Create function to fetch artwork
    const fetchArtworkData = () => {
        // Fetch artwork data with a limit of 40 items
        // The reason I had a limit of 40 is because when you search through the artworks without it, the artworks that show are different results a lot of times because of the conditions.
        fetch(`${API_URL}?limit=40`)
        // Handle the response as JSON
        .then(response => response.json())
        // Once the JSON data is recieved, perform actions
        .then(results => {
            // Create a variable that represents the amount of artworks displayed on the page
            let displayedArtworks = 0;

            // Iterate through each artwork in the fetched data
            results.data.forEach(artwork => {
                 // Check if the amount of artworks on display is below or at a certain number, and if the image id is not null, and the artwork description is not null, and the artwork title is not null, and the artist name is not null.
                 if ( displayedArtworks < 12 && artwork.image_id !== null && artwork.description !== null && artwork.title !== null && artwork.artist_title !== null) {
                    // Create li
                    const li = document.createElement("li")
                    // Create div that will hold the img and the overlayed text
                    const imageContainer = document.createElement("div")
                    // Create a div that will hold the text info of the artwork
                    const textOverlay = document.createElement('div');

                    // define the artwork image id in a variable
                    const imageID = artwork.image_id;
                    // implement the image id into the artwork api for images
                    const imageURL = `https://www.artic.edu/iiif/2/${imageID}/full/843,/0/default.jpg`;

                    // Create an image element
                    const image = document.createElement("img")
                    // add image url ad the source of the image
                    image.src = imageURL;
                    //  add artwork title as the alt of the image
                    image.alt = artwork.title;

                    // Add CSS class to image-container
                    imageContainer.classList.add("image-container");
                    // Add CSS class to text overlay
                    textOverlay.classList.add("overlay-text");

                     // Append the image holding the img into the image-container div
                     imageContainer.appendChild(image);
                     // Append the text-overlay div into the image-container div
                     imageContainer.appendChild(textOverlay);
                     // Append the whole image-container div that holds both the img and the text overlay, to the li
                     li.appendChild(imageContainer);
                     // Add a class to the li
                     li.classList.add(`single-artwork`);
                     // Append li to ul
                     ul.appendChild(li);

                    //  Event listener for mouseover on the image
                    image.addEventListener("mouseover", () => {
                        // When you hover over each image, the text overlay HTML would add a show class that when equipped will show the artwork title, artist name, and years.
                        textOverlay.innerHTML =  `${artwork.title} - ${artwork.artist_title} (${artwork.date_start} - ${artwork.date_end})`;
                        textOverlay.classList.add("show");

                         // Event listener for click on the image
                         image.addEventListener("click", () => {
                            // When you click on the image (remember that your already hovering over the img so the mouseover actions are triggered) it displayes the artwork description
                            textOverlay.innerHTML =  `${artwork.description}`;
                        });
                    })

                    // Event listener for mouseout of the image
                    image.addEventListener("mouseout", () => {
                        // When you take your mouse off the image, remove the css class that was added to display the text overlay
                        textOverlay.classList.remove("show");
                    });

                    // Increment the displayed artwork count so that when it loops again it gets tested against the condition and goes off that.
                    displayedArtworks++;
                 }
            })
        })
        // Catch any errors that occur during fetching
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    // Call the function
    fetchArtworkData();
})