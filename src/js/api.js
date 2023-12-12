import axios from 'axios';

const apiKey = '40086251-42ea08293b2c6d4625136ab28';

export async function fetchImages(query, page, perPage) {
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Error fetching images. Please try again later.');
  }
}
