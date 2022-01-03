"use strict";
// Constantes y variables
const searchButton = document.querySelector(".js-button");
const apiUrl = `https://api.jikan.moe/v3/search/anime?q=`;
let favoriteAnimes = [];
let resultAnimes = [];
const searchBtn = document.querySelector(".js-searchButton");
const resetBtn = document.querySelector(".js-resetButton");
// listados:
let favoritesList = document.querySelector(".favoritesList-js");
let searchList = document.querySelector(".searchList-js");
// Valor búsqueda de anime:
const searchInput = document.querySelector(".js-input");
let animeSearch = "";
const showedAnimes = 50;
const defaultImg = `assets/images/default.png`;
const apiDefaultImg = `https://cdn.myanimelist.net/images/qm_50.gif?s=e1ff92a46db617cb83bfc1e205aff620`;

// Fetch al Api y función que trae los 3 primeros resultados de la búsqueda:
function getElementsApi(event) {
  searchList.innerHTML = "";
  animeSearch = searchInput.value;
  fetch(apiUrl + animeSearch)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < showedAnimes; i++) {
        resultAnimes.push(data.results[i]);
      }
      searchListContent = "";
      renderAnimeResults(event);
    });
}
let searchListContent = "";
function renderAnimeResults(event) {
  event.preventDefault();

  for (const anime of resultAnimes) {
    let animeContent = "";

    if (anime.image_url === apiDefaultImg) {
      animeContent = `
        <li class="list-js" data-id=${anime.mal_id} data-title=${anime.title} data-image_url=${defaultImg}>        
        <h2 class="searchResult-title">${anime.title}</h2> 
        <img class="searchResult-img" alt="${anime.title}" src="${defaultImg}">       
        </li>`;
    } else {
      animeContent = `
        <li class="list-js" data-id=${anime.mal_id} data-title=${anime.title} data-image_url=${anime.image_url}>        
        <h2 class="searchResult-title">${anime.title}</h2> 
        <img class="searchResult-img" alt="${anime.title}" src="${anime.image_url}">       
        </li>`;
    }
    searchListContent += animeContent;
    searchList.innerHTML = searchListContent;
  }
  for (const child of searchList.children) {
    child.addEventListener("click", selectAnime);
  }
}
let localStorageElements = JSON.parse(localStorage.getItem("favorite anime"));
if (localStorageElements === null) {
  localStorageElements = [];
}
function selectAnime(event) {
  const selection = event.currentTarget;
  selection.classList.toggle("selectedAnime");
  //  Guardar en local storage
  const favIndex = localStorageElements.findIndex(fav => fav.id === selection.dataset.id );
  if (favIndex === -1){ 
  localStorageElements.push(selection.dataset);
  localStorage.setItem("favorite anime", JSON.stringify(localStorageElements));}

 renderFavs();
 
}

function renderFavs() {
  let favListContent = "";
  let favAnimes = JSON.parse(localStorage.getItem("favorite anime"));
  if (favAnimes === null) {
    favAnimes = [];
  }
  for (const favs of favAnimes) {
    let animeContent = "";
    animeContent = `<li class="list-js"}>        
<h2 class="searchResult-title">${favs.title}</h2> 
<img class="searchResult-img" alt="${favs.title}" src="${favs.image_url}">       
</li>`;

    favListContent += animeContent;
    favoritesList.innerHTML = favListContent;
  }
}
renderFavs();

// EVENTOS:

searchBtn.addEventListener("click", getElementsApi);
