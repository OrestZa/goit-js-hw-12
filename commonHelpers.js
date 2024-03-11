import{a as b,i as a,S as v}from"./assets/vendor-5401a4b0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const L="https://pixabay.com/api/",g=15;async function w(i,o){const t={key:"42653068-ca30bcafd67c2a07aae2cb182",q:i,image_type:"photo",oriental:"horizontal",safesearch:"true",per_page:g,page:o},r=new URLSearchParams(t),e=await b.get(`${L}?${r}`);return{hits:e.data.hits,totalHits:e.data.totalHits}}function S(i){return i.hits.reduce((o,t)=>o+`<div class="container-image-gallery">
            <a class="gallery-link" href="${t.largeImageURL}">
            <img
                class="gallery-image"
                src="${t.webformatURL}"
                alt="${t.tags}"
            />
           <ul class="info-list">
              <li class="info-item">
                  <p class="info-title">Likes</p>
                  <p class="info-value">${t.likes}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Views</p>
                  <p class="info-value">${t.views}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Comments</p>
                  <p class="info-value">${t.comments}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Downloads</p>
                  <p class="info-value">${t.downloads}</p>
              </li>
            </ul>
        </a>
        </div>`,"")}const f=document.querySelector(".search"),l=document.querySelector(".loader"),d=document.querySelector(".gallery"),c=document.querySelector(".load-more");let p,n=1,y=1,m="";f.addEventListener("submit",E);c.addEventListener("click",$);function P(){return new v(".gallery-link",{nav:!0,captions:!0,captionsData:"alt",captionDelay:250})}function E(i){i.preventDefault();const o=f.elements.asking.value.trim();y=n,o!==m&&(n=1,m=o),d.innerHTML="",l.style.display="block",c.style.display="none",h(o,n),f.reset()}function $(){l.style.display="block",n+=1,n===y+1?h(m,n):console.log("The page will be channged.")}async function h(i,o){try{const t=await w(i,o);if(i.trim())if(t.hits.length===0){a.error({timeout:1500,position:"bottomCenter",message:"Sorry, there are no images matching your search query. Please, try again!"}),l.style.display="none";return}else{const r=S(t);d.insertAdjacentHTML("beforeend",r),l.style.display="none",p?p.refresh():p=P(),q(),y=o;const e=t.totalHits,s=Math.ceil(e/g);if(o>=s)return c.style.display="none",a({timeout:1500,position:"bottomCenter",message:"Sorry, there are no more images to load!"});c.style.display="block"}else{a.error({timeout:1500,position:"bottomCenter",message:"Fill out this form"}),l.style.display="none";return}}catch{l.style.display="none",a.error({timeout:1500,position:"bottomCenter",message:"Sorry, processing error. Please, try again!"})}}function q(){const i=d.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:2*i,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
