import Notiflix from 'notiflix';
import { fetchImages } from './api.js';
import { handleSearchResults, createImageCard } from './gallery.js';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const imageGallery = document.getElementById('imageGallery');
const resultCounter = document.getElementById('resultCounter');
let currentPage = 1;
let currentQuery = '';
const perPage = 40;

loadMoreBtn.style.display = 'none';

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const searchQuery = document.getElementById('searchQuery').value.trim();

  if (searchQuery === '') {
    alert(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  if (currentQuery !== searchQuery) {
    currentQuery = searchQuery;
    currentPage = 1;
    loadMoreBtn.style.display = 'none';
    imageGallery.innerHTML = '';
  }

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    handleSearchResults(data, imageGallery, loadMoreBtn);
    if (data.totalHits > 40) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
});
// ...

loadMoreBtn.addEventListener('click', async function () {
  currentPage++;
  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    handleSearchResults(data, imageGallery, loadMoreBtn);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
});
