import './sass/main.scss';
import refs from './partials/services/get_refs';
import markupGallery from './templates/imageCard.hbs';
import ApiService from './partials/services/api_service';
import './sass/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';

const api = new ApiService();

const onPictureSearch = e => {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.query.value;
  api.query = searchQuery;
  cleanerGallery();
  api.resetPage();
  getPicturesFromApi();
};

const onLoadMorePictures = () => {
  api.incrementPage();
  refs.loadMoreBtn.disabled = true;
  getPicturesFromApi();
};

const getPicturesFromApi = () => {
  api
    .fetchGallery()
    .then(data => {
      renderGallery(data);
      refs.loadMoreBtn.classList.remove('is-hidden');
      refs.loadMoreBtn.disabled = false;
    })
    .catch(err => {
      cleanerGallery();
      refs.error.innerHTML = error.message;
      refs.loadMoreBtn.classList.add('is-hidden');
    });
};
const renderGallery = ({ hits }) => {
  const markup = markupGallery(hits);
  refs.pictureExposition.insertAdjacentHTML('beforeend', markup);
  scroll();
};

function scroll() {
  const element = document.body;
  setTimeout(() => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, 1000);
}

const cleanerGallery = () => {
  refs.error.innerHTML = '';
  refs.pictureExposition.innerHTML = '';
};

console.log(basicLightbox);

function zoomPicture(e) {
  if (!e.target.classList.contains('card-image')) {
    return;
  }
  const instance = basicLightbox.create(`
      <img src='${e.target.dataset.src}' width="800" height="600">
  `);

  instance.show();
}

refs.searchForm.addEventListener('submit', onPictureSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMorePictures);
refs.pictureExposition.addEventListener('click', zoomPicture);
// console.log(refs.searchForm);
