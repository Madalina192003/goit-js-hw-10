// index.js
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.getElementById('breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const errorElement = document.querySelector('.error');

const loadBreeds = async () => {
  try {
    loader.style.display = 'block';
    breedSelect.style.display = 'none';
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    new SlimSelect({ select: '#breed-select' });
    breedSelect.style.display = 'block';
  } catch (error) {
    Notiflix.Notify.failure('Failed to load breeds');
    errorElement.style.display = 'block';
  } finally {
    loader.style.display = 'none';
  }
};

const loadCatInfo = async breedId => {
  try {
    loader.style.display = 'block';
    catInfo.style.display = 'none';
    const cat = await fetchCatByBreed(breedId);
    document.getElementById('cat-image').src = cat.url;
    // corectare denumirii ID-ului
    document.getElementById('cat-name').textContent = cat.breeds[0].name;

    document.getElementById('cat-description').textContent =
      cat.breeds[0].description;
    document.getElementById('cat-temperament').textContent =
      cat.breeds[0].temperament;
    catInfo.style.display = 'block';
  } catch (error) {
    Notiflix.Notify.failure('Failed to load cat information');
    errorElement.style.display = 'block';
  } finally {
    loader.style.display = 'none';
  }
};

breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;
  loadCatInfo(breedId);
});

loadBreeds();
