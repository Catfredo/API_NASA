window.addEventListener('load', () => {
    getImages();
    document.getElementById('updateButton').addEventListener('click', getImages);
});

let isLoading = false; 

function getImages() {
    if (isLoading) return; 
    isLoading = true; 

    const Api_key = 'g3wZeRsyEsW1bVEOvoGzcedSbK4GzR0AqSuYTI9T';
    const ruta = `https://api.nasa.gov/planetary/apod?api_key=${Api_key}&count=10`;

    fetch(ruta)
        .then(answer => {
            if (!answer.ok) {
                throw new Error(`API call failed with status: ${answer.status}`);
            }
            return answer.json();
        })
        .then(results => {
            if (!Array.isArray(results)) {
                throw new Error('Expected an array of results');
            }
            showImages(results);
            isLoading = false;
        })
        .catch(error => {
            console.error('Error fetching or processing data:', error);
            isLoading = false; 
        });
}

function showImages(imagesData) {
    const gallery = document.querySelector('#gallery');
    imagesData.forEach(({ date, explanation, title, url }) => {
        const cardHtml = `
        <div class="col gallery-item">
            <div class="card">
                <img src="${url}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${explanation}</p>
                    <p class="card-text"><small class="text-muted">${date}</small></p>
                </div>
            </div>
        </div>`;
        gallery.innerHTML += cardHtml;
    });
}

window.addEventListener('scroll', () => {
   
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2 && !isLoading) {
        getImages();
    }
});
