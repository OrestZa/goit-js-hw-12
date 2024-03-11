import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages, limit } from './js/pixabay-api';
import { searchImage } from './js/render-functions';


const formEl = document.querySelector('.search');
const loaderEl = document.querySelector('.loader');
const galleryEl = document.querySelector('.gallery');
const buttonEl = document.querySelector('.load-more');


let lightbox;
let page = 1;
let currentPage = 1;
let prevQuery = '';

formEl.addEventListener("submit", onSubmit);
buttonEl.addEventListener("click", loadMore);

function lightboxProcessing() {
  return new SimpleLightbox('.gallery-link', {
    nav: true,
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
}

function onSubmit(evt) {
  evt.preventDefault();
  const query = formEl.elements.asking.value.trim();
  currentPage = page;
  if (query !== prevQuery) {
    page = 1;
    prevQuery = query;
  }

  galleryEl.innerHTML = "";
  loaderEl.style.display = "block";
  buttonEl.style.display = "none";
  bringImg(query, page);
  formEl.reset();
}

function loadMore() {
  loaderEl.style.display = "block";
  page += 1;

  if (page === currentPage + 1) {
    bringImg(prevQuery, page);
  } else {
    console.log('The page will be channged.');
  }
}

async function bringImg(query, page) {
  try {
    const data = await getImages(query, page);

    if (!query.trim()) {
      iziToast.error({
        timeout: 1500,
        position: 'bottomCenter',
        message: 'Fill out this form',
      });
      loaderEl.style.display = "none";
      return;
    } else if (data.hits.length === 0) {
      iziToast.error({
        timeout: 1500,
        position: 'bottomCenter',
        message:
          'Sorry, there are no images matching your search query. Please, try again!',
      });
      loaderEl.style.display = "none";
      return;
    } else {
      const imagesHTML = searchImage(data);
      galleryEl.insertAdjacentHTML('beforeend', imagesHTML);
      loaderEl.style.display = 'none';
      if (!lightbox) {
        lightbox = lightboxProcessing();
      } else {
        lightbox.refresh();
      }
      scroll();
      currentPage = page;
      const totalImg = data.totalHits;
      const totalPages = Math.ceil(totalImg / limit);
      if (page >= totalPages) {
        buttonEl.style.display = 'none';
        return iziToast({
          timeout: 1500,
          position: 'bottomCenter',
          message: 'Sorry, there are no more images to load!',
        });
      } else {
        buttonEl.style.display = 'block';
      }
    }
  } catch (error) {
    loaderEl.style.display = 'none';
    iziToast.error({
      timeout: 1500,
      position: 'bottomCenter',
      message: 'Sorry, processing error. Please, try again!',
    });
  }
}

function scroll() {
  const cardHeight = galleryEl.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({ top: 2 * cardHeight, behavior: 'smooth' });
}

