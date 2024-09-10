import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
const breedSelect = document.getElementById('breed-select');
const loader = document.getElementById('loader');
const catInfo = document.getElementById('cat-info');
const errorElement = document.getElementById('error');
// Funcția pentru a încărca lista de rase
const loadBreeds = async () => {
  try {
    showLoader(); // Afișează loader-ul
    const breeds = await fetchBreeds(); // Obține rasele de la API
    // Populează select-ul cu rasele obținute
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    breedSelect.classList.remove('hidden'); // Afișează selectul când rasele sunt încărcate
    new SlimSelect({ select: '#breed-select' }); // Inițializează SlimSelect
  } catch (error) {
    console.error('Failed to load breeds:', error); // Afișează detalii despre eroare
    Notiflix.Notify.failure(
      'Failed to load breeds. Please check the API or your internet connection.'
    ); // Mesaj clar de eroare
    errorElement.style.display = 'block'; // Afișează mesajul de eroare în pagină
  } finally {
    hideLoader(); // Ascunde loader-ul
  }
};
// Funcția pentru a încărca informațiile despre pisică
const loadCatInfo = async breedId => {
  try {
    showLoader(); // Afișează loader-ul
    catInfo.classList.add('hidden'); // Ascunde secțiunea anterioară cu informații despre pisică
    const cat = await fetchCatByBreed(breedId); // Obține datele despre pisică de la API
    // Actualizează elementele DOM cu informațiile despre pisică
    document.getElementById('cat-image').src = cat.url;
    document.getElementById('breed-name').textContent = cat.breeds[0].name;
    document.getElementById('cat-description').textContent =
      cat.breeds[0].description;
    document.getElementById('cat-temperament').textContent =
      cat.breeds[0].temperament;
    document.getElementById('cat-image').onload = function () {
      hideLoader(); // Ascunde loader-ul
      catInfo.classList.remove('hidden'); // Afișează secțiunea cu informații despre pisică
    };
    document.getElementById('cat-image').onerror = function () {
      Notiflix.Notify.failure('Failed to load cat image'); // Mesaj clar pentru eroarea imaginii
      showError();
    };
  } catch (error) {
    Notiflix.Notify.failure(
      'Failed to load cat information. Please try again later.'
    ); // Mesaj clar de eroare
    showError();
  }
};
// Inițializarea aplicației și adăugarea evenimentelor
document.addEventListener('DOMContentLoaded', () => {
  loadBreeds(); // Încarcă rasele la încărcarea paginii
  breedSelect.addEventListener('change', event => {
    const breedId = event.target.value;
    loadCatInfo(breedId); // Încarcă informațiile când se selectează o rasă
  });
});
// Funcții pentru gestionarea stării aplicației
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
