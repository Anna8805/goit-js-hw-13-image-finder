import './css/styles.css';
import ApiService from './js/api/apiService';
import tmpGalleryImg from './templates/tmpGalleryImg.hbs';
import notification from './js/notification';
import getRefs from './js/get-refs';

const refs = getRefs();

const apiService = new ApiService('.gallery');

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', onBtnLoadMore);
refs.loadMore.classList.add('is-hidden');

function onSubmit(event) {
    event.preventDefault();
    apiService.query = event.currentTarget.elements.query.value;

    if (apiService.query === '') {
        notification.onKeyword();
        return 
    }
    
    refs.gallery.innerHTML = '';
    apiService.resetPage();
    clear();
    
    apiService.fetchSearchImages().then(hits => {
        updateMarkup(hits);
        apiService.nextPage();
        
        refs.loadMore.classList.remove('is-hidden');
        refs.loadMore.classList.add('btn');
    });
}
 
function onBtnLoadMore() {
    apiService.fetchSearchImages().then(hits => {
        updateMarkup(hits);
        apiService.nextPage();
        
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    });
}

function updateMarkup(hits) {
    const markup = tmpGalleryImg(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clear(){
    refs.gallery.innerHTML = '';
}