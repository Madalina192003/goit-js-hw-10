import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_tPvmpZ1k61bT5uVk1eIrAWNxVJ6p5oAeoqUMIqgTLf7zspoah1Z7S0oUEl3GjjyJ';
// Funcția pentru a obține lista de rase
export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    // console.log('Breeds response:', response.data); // Comentat sau eliminat
    return response.data;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw new Error('Error fetching breeds');
  }
}
// Funcția pentru a obține informații despre o pisică în funcție de rasă
export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=1`
    );
    // console.log('Cat info response:', response.data); // Comentat sau eliminat
    return response.data[0]; // Returnează primul element
  } catch (error) {
    console.error('Error fetching cat info:', error);
    throw new Error('Error fetching cat info');
  }
}
