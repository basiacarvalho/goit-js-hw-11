import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';

const userInput = document.querySelector('#search-box');
const submitButton = document.querySelector('.submit-button');
const gallery = document.querySelector('.gallery');
const loadButton = document.querySelector('.load-more');

// let pageNumber = 1;

submitButton.addEventListener('click', processGallerySearch);
// loadButton.addEventListener('click');

async function processGallerySearch(event) {
  event.preventDefault();
  const response = await fetchGallery();
  renderPhotos(response.data.hits);
}

async function fetchGallery() {
  return axios.get('https://pixabay.com/api/', {
    params: {
      key: '36366632-d7829422fb4de051ba6d1d5b4',
      q: userInput.value,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 40,
      safesearch: 'true',
    },
  });
}

function renderPhotos(searchResult) {
  if (searchResult.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your query. Please try again.'
    );
  }
  const markup = searchResult
    .map(photo => {
      return `
      <div class="photo-card">
  <a href="${photo.largeImageURL}">
     <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" width="150" height="100" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
${photo.likes}
    </p>
    <p class="info-item">
      <b>Views </b>
      ${photo.views}
    </p>
    <p class="info-item">
      <b> Comments </b>
      ${photo.comments}
    </p>
    <p class="info-item">
      <b>Downloads </b>
      ${photo.downloads}
    </p>
  </div>
</div>
      `;
    })
    .join(' ');
  gallery.innerHTML = markup;
  new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
}
