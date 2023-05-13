// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';

const userInput = document.querySelector('#search-box');
const submitButton = document.querySelector('button');
const gallery = document.querySelector('.gallery');

async function fetchGallery(event) {
  event.preventDefault();
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '36366632-d7829422fb4de051ba6d1d5b4',
      q: userInput.value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  });
  renderPhotos(response);
}

submitButton.addEventListener('click', fetchGallery);

function renderPhotos(response) {
  console.log(response.data.hits);
  const markup = response.data.hits
    .map(photo => {
      return `
      <div class="photo-card">
  <a href="${photo.largeImageURL}">
     <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${photo.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${photo.views}</b>
    </p>
    <p class="info-item">
      <b> Comments ${photo.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${photo.downloads}</b>
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
