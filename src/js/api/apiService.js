import settings from '../settings/index';

const { BASE_URL, API_KEY } = settings;

export default class ApiService {
    constructor(selector) {
        this.element = document.querySelector(selector);
        this.page = 1;
        this.searchQuery = '';
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    async fetchSearchImages() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
        const response = await fetch(url);
        const newResponse = await response.json();
        return newResponse.hits;
    }

    nextPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}