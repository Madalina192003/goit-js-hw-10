import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
const breedSelect = document.getElementById('breed-select');
const loader = document.getElementById('loader');
const catInfo = document.getElementById('cat-info');
const errorElement = document.getElementById('error');

const loadBreeds = async () => {
  try {
    showLoader();
    const breeds = await fetchBreeds();

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    breedSelect.classList.remove('hidden');
    new SlimSelect({ select: '#breed-select' });
  } catch (error) {
    console.error('Failed to load breeds:', error);
    Notiflix.Notify.failure(
      'Failed to load breeds. Please check the API or your internet connection.'
    );
    errorElement.style.display = 'block';
  } finally {
    hideLoader();
  }
};

const loadCatInfo = async breedId => {
  try {
    showLoader();
    catInfo.classList.add('hidden');
    const cat = await fetchCatByBreed(breedId);

    document.getElementById('cat-image').src = cat.url;
    document.getElementById('breed-name').textContent = cat.breeds[0].name;
    document.getElementById('cat-description').textContent =
      cat.breeds[0].description;
    document.getElementById('cat-temperament').textContent =
      cat.breeds[0].temperament;
    document.getElementById('cat-image').onload = function () {
      hideLoader(); // Ascunde loader-ul
      catInfo.classList.remove('hidden');
    };
    document.getElementById('cat-image').onerror = function () {
      Notiflix.Notify.failure('Failed to load cat image');
      showError();
    };
  } catch (error) {
    Notiflix.Notify.failure(
      'Failed to load cat information. Please try again later.'
    );
    showError();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadBreeds();
  breedSelect.addEventListener('change', event => {
    const breedId = event.target.value;
    loadCatInfo(breedId);
  });
});

function showLoader() {
  if (loader) {
    loader.classList.remove('hidden');
  }
  breedSelect.classList.add('hidden');
  catInfo.classList.add('hidden');
}
function hideLoader() {
  if (loader) {
    loader.classList.add('hidden');
  }
  breedSelect.classList.remove('hidden');
}
function showError() {
  if (loader) {
    loader.classList.add('hidden');
  }
  errorElement.style.display = 'block';
}
