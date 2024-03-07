
//Store your API key here for reference and easy access header.

const API_KEY =
    'live_4rSqxwbPZ5g7RX7G2JGvmNRGWaQeWB5vG0qGc13eyk6MchLCAmRFFTR35Gq3VGMd';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key':
            'live_4rSqxwbPZ5g7RX7G2JGvmNRGWaQeWB5vG0qGc13eyk6MchLCAmRFFTR35Gq3VGMd',
        'X-RapidAPI-Host': 'https://api.thedogapi.com/v1/breeds',
    },
};

//Create an async function "initialLoad"
const dogImageLoad = async () => {
    try {
        const url = await fetch(`https://api.thedogapi.com/v1/breeds`);
        const response = await url.json();

        //Create new <options> for each of these breeds, and append them to breedSelect.
        const breedSelect = document.getElementById('breedSelect');
        response.forEach((breed) => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.innerHTML = breed.name;
            breedSelect.appendChild(option);
        });

        breedSelect.addEventListener('change', eventBreedSelect);

    } catch (error) {
        console.error(error);
    }
};

// select breed by name
async function eventBreedSelect() {
    const selectedBreedId = document.getElementById('breedSelect').value;
    const infoDump = document.getElementById('infoDump');
    const imageContiner = document.getElementById('img-continer')

    // Clear previous content
    imageContiner.innerHTML = '';
    infoDump.innerHTML = '';
    // fetch the dog api
    try {
        const response = await fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${selectedBreedId}&limit=10`);
        const jsonData = await response.json();


        jsonData.forEach((image) => {
            const imgElement = document.createElement('img');
            imgElement.src = image.url;
            imageContiner.appendChild(imgElement).style.height = "150px";
            //imageContiner.style.paddingLeft = '150px';
        });
        const responseBreed = await fetch(
            `https://api.thedogapi.com/v1/breeds/${selectedBreedId}`
        );
        const breedInfo = await responseBreed.json();

        // Create informational section within info Dump

        // breed name
        const infoTitle = document.createElement('h2');
        infoTitle.textContent = `${breedInfo.name}`;

        //breed for
        const infoDescription = document.createElement('p');
        infoDescription.textContent = (`Breed for :${breedInfo.bred_for}`);

        // breed temperament
        const infoDescription1 = document.createElement('p');
        infoDescription1.textContent = (`Temperament : ${breedInfo.temperament}`);

        // breed life span
        const infoDescription2 = document.createElement('p');
        infoDescription2.textContent = (`Life Span : ${breedInfo.life_span}`);

        infoDump.appendChild(infoTitle);
        infoDump.appendChild(infoDescription);
        infoDump.appendChild(infoDescription1);
        infoDump.appendChild(infoDescription2);
    } catch (error) {
        console.error(error);
    }
}

dogImageLoad();