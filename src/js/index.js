import Notiflix from 'notiflix';
import { fetchImages } from './api.js';
import { handleSearchResults } from './gallery.js';

const searchQuery = document.getElementById('searchQuery').value.trim();

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');
let currentPage = 1;
let currentQuery = '';
const perPage = 40;

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const searchQuery = document.getElementById('searchQuery').value.trim();

  if (searchQuery === '') {
    alert('Введіть запит у строку пошуку');
    return;
  }

  if (currentQuery !== searchQuery) {
    currentQuery = searchQuery;
    currentPage = 1;
    loadMoreBtn.style.display = 'none';

    // Очистіть попередні картки перед додаванням нових
    const imageGallery = document.getElementById('imageGallery');
    imageGallery.innerHTML = ''; // Очищаємо вміст галереї
  }

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    handleSearchResults(
      data,
      document.getElementById('imageGallery'),
      loadMoreBtn
    );
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
});

loadMoreBtn.addEventListener('click', async function () {
  currentPage++;
  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    handleSearchResults(
      data,
      document.getElementById('imageGallery'),
      loadMoreBtn
    );
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
});
