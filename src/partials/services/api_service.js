export default class ApiService {
  #API_KEY = '23293981-cf73d8302544a38cc507127b0';
  BASE_URL = 'https://pixabay.com/api/';

  constructor() {
    this.q = '';
    this.page = 1;
  }

  fetchGallery() {
    const queryParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      q: this.q,
      page: this.page,
      per_page: 12,
      key: this.#API_KEY,
    });
    return fetch(`${this.BASE_URL}?${queryParams}`).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Oops! Something went wrong!');
    });
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  set query(value) {
    this.q = value;
  }
}
