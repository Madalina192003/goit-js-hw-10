import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_nihMtkT1kzzlGxEh3BODVGZ3aLgBtmBlTbhSlMncWM5K1Opl8UEdzmzE8z20NxHS';

export async function fetchBreeds() {
  try {
    console.log('Fetching breeds...');
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    console.log('Breeds response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw new Error('Error fetching breeds');
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    console.log(`Fetching cat by breed ID: ${breedId}`);
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    console.log('Cat info response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching cat info:', error);
    throw new Error('Error fetching cat info');
  }
}
