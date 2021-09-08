import './sass/main.scss';
import refs from './partials/services/get_refs';
import markupGallery from './templates/imageCard.hbs';
import ApiService from './partials/services/api_service';

// 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ'

const api = new ApiService ({????:????}) {

}

const onPictureSearch = () => {
    cleanerGallery();
    api.resetPage();
    getPicturesFromApi();
}

const onLoadMorePictures = () => {
   api.incrementPage();
   refs.loadMoreBtn.disabled = true;
     getPicturesFromApi();

}

const getPicturesFromApi = () => {
    api.fetchGallery().then(data => {
        renderGallery(data);
        refs.loadMoreBtn.classList.remove('is-hidden');
        refs.loadMoreBtn.disabled = false;
})
.catch(err => {
    cleanerGallery();
    refs.error.innerHTML = error.message;
    refs.loadMoreBtn.classList.add('is-hidden');
});

const renderGallery = ({hits}) = {
    const markup = markupGallery(hits);
    refs.pictureExposition.insertAdjacentHTML('beforeend' markup);
}

const cleanerGallery = () => {
    refs.error.innerHTML = '';
    refs.pictureExposition.innerHTML = '';
}


refs.submitBtn.addEventListener('submit', onPictureSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMorePictures);