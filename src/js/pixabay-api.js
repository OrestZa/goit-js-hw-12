import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';


export async function getImages(query, page) {
    const options = {
        key: '42653068-ca30bcafd67c2a07aae2cb182',
        q: query,
        image_type: 'photo',
        oriental: 'horizontal',
        safesearch: 'true',
        per_page: limit,
        page: page
    };
    const params = new URLSearchParams(options);
    const link = await axios.get(`${BASE_URL}?${params}`);

    return {
        hits: link.data.hits,
        totalHits: link.data.totalHits
    }

}