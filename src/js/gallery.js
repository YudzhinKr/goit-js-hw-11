import Notiflix from 'notiflix';

export function handleSearchResults(data, gallery, loadMoreBtn) {
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

export function createImageCard(image) {
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
