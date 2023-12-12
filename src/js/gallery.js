import Notiflix from 'notiflix';

export function handleSearchResults(data, gallery, loadMoreBtn) {
  const resultCounter = document.getElementById('resultCounter');
  const images = data.hits;

  gallery.innerHTML = '';

  images.forEach(image => {
    const card = createImageCard(image);
    gallery.appendChild(card);
  });

  resultCounter.textContent = `Found: ${data.totalHits} images`;

  if (images.length < data.totalHits) {
    loadMoreBtn.style.display = 'block';
  } else {
    loadMoreBtn.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

export function createImageCard(image) {
  const cardHTML = `
    <div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes:</b> <span>${image.likes}</span></p>
        <p class="info-item"><b>Views:</b> <span>${image.views}</span></p>
        <p class="info-item"><b>Comments:</b> <span>${image.comments}</span></p>
        <p class="info-item"><b>Downloads:</b> <span>${image.downloads}</span></p>
      </div>
    </div>
  `;

  const card = document
    .createRange()
    .createContextualFragment(cardHTML).firstElementChild;

  return card;
}
