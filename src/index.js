import Notiflix from 'notiflix';
import axios from 'axios';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');
let currentPage = 1;
let currentQuery = '';

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const searchQuery = document.getElementById('searchQuery').value;
  if (searchQuery.trim() !== '') {
    if (currentQuery !== searchQuery) {
      currentQuery = searchQuery;
      currentPage = 1;
      loadMoreBtn.style.display = 'none';
    }

    await searchImages(currentQuery);
  }
});

loadMoreBtn.addEventListener('click', async function () {
  currentPage++;
  await searchImages(currentQuery);
});

async function searchImages(query) {
  const apiKey = '40086251-42ea08293b2c6d4625136ab28';
  const perPage = 40;
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    handleSearchResults(data);
  } catch (error) {
    console.error('Error fetching images:', error);
    Notiflix.Notify.failure('Error fetching images. Please try again later.');
  }
}

function handleSearchResults(data) {
  const gallery = document.getElementById('imageGallery');

  if (data.totalHits === 0) {
    Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreBtn.style.display = 'none';
    return;
  }

  const images = data.hits;

  images.forEach(image => {
    const card = createImageCard(image);
    gallery.appendChild(card);
  });

  if (images.length < data.totalHits) {
    loadMoreBtn.style.display = 'block';
  } else {
    loadMoreBtn.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function createImageCard(image) {
  const card = document.createElement('div');
  card.className = 'photo-card';

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';

  const info = document.createElement('div');
  info.className = 'info';

  ['Likes', 'Views', 'Comments', 'Downloads'].forEach(infoItem => {
    const p = document.createElement('p');
    p.className = 'info-item';
    p.innerHTML = `<b>${infoItem}:</b> <span>${
      image[infoItem.toLowerCase()]
    }</span>`;
    info.appendChild(p);
  });

  card.appendChild(img);
  card.appendChild(info);

  return card;
}
