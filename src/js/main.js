"use strict";
// Constantes y variables
const searchButton = document.querySelector(".js-button");
const apiUrl = `https://api.jikan.moe/v3/search/anime?q=`;
let favoriteAnimes = [];
let resultAnimes = [];
const searchBtn = document.querySelector(".js-searchButton");
const resetBtn = document.querySelector(".js-resetButton");
let localStorageElements = JSON.parse(localStorage.getItem("favorite anime"));
let deleteIcon = "";

// listados:
let favoritesList = document.querySelector(".favoritesList-js");
let searchList = document.querySelector(".searchList-js");
let searchListContent = "";
// Valor búsqueda de anime:
const searchInput = document.querySelector(".browser__input");
let animeSearch = "";
const showedAnimes = 50;
const defaultImg = `assets/images/default.png`;
const apiDefaultImg = `https://cdn.myanimelist.net/images/qm_50.gif?s=e1ff92a46db617cb83bfc1e205aff620`;

// Fetch al Api y función que trae los 3 primeros resultados de la búsqueda:
renderFavs();
function getElementsApi(event) {
  event.preventDefault();
  favoriteAnimes = [];
  searchList.innerHTML = "";
  animeSearch = searchInput.value;
  fetch(apiUrl + animeSearch)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < showedAnimes; i++) {
        resultAnimes.push(data.results[i]);
      }

      renderAnimeResults(event);
    });
}

// Pinta los resultados
function renderAnimeResults(event) {
  event.preventDefault();
  searchList.innerHTML = "";
  let animeContent = "";

  for (const anime of resultAnimes) {
    if (anime.image_url === apiDefaultImg || anime.image_url === undefined) {
      animeContent = `
        <li class="list-js" data-id=${anime.mal_id} data-title="${anime.title}" data-image_url=${defaultImg}>        
        <h3 class="searchResult-title">${anime.title}</h2> 
        <img class="searchResult-img" alt="${anime.title}" src="${defaultImg}">       
        </li>`;
    } else {
      animeContent = `
        <li class="list-js" data-id=${anime.mal_id} data-title="${anime.title}" data-image_url=${anime.image_url}>        
        <h3 class="searchResult-title">${anime.title}</h2> 
        <img class="searchResult-img" alt="${anime.title}" src="${anime.image_url}">       
        </li>`;
    }
    if (anime.status === "404" || apiUrl + animeSearch === undefined) {
      animeContent = `<li class="errorMessage-js">No se han encontrado resultados de su búsqueda.</li>`;
    }
    searchListContent += animeContent;
    searchList.innerHTML = searchListContent;
  }

  // Bucle para coger elementos del li
  for (const child of searchList.children) {
    child.addEventListener("click", selectAnime);
  }
}

// Seleccionar ánime y guardar en LocalStorage

favoriteAnimes.push(localStorageElements);
if (localStorageElements === null) {
  localStorageElements = [];
}
function selectAnime(event) {
  const selection = event.currentTarget;
  selection.classList.toggle("selectedAnime");

  const favIndex = localStorageElements.findIndex(
    (fav) => fav.id === selection.dataset.id
  );
  if (favIndex === -1) {
    localStorageElements.push(selection.dataset);
    localStorage.setItem("favorite anime", JSON.stringify(localStorageElements));
  }

  renderFavs();
}
// Pinta los favoritos
function renderFavs() {
  let favListContent = "";
  let favAnimes = JSON.parse(localStorage.getItem("favorite anime"));
  if (favAnimes === null) {
    favAnimes = [];
  }
  for (const favs of favAnimes) {
    let animeContent = "";
    
    animeContent = `<li class="favlist-js" data-id="${favs.id}"  data-title="${favs.title}" data-image_url=${favs.image_url}}>        
<h3 class="favResult-title">${favs.title}</h2> 
<img class="favResult-img" alt="${favs.title}" src="${favs.image_url}">  <i class="far fa-times-circle deletefav-js"></i>     
</li>`;

    favListContent += animeContent;
    favoritesList.innerHTML = favListContent;
  }
  addListenerIcon();
}

// Reset resultados e input value :

function resetSearchResults(event) {
  event.preventDefault();
  const selection = event.currentTarget;
  if (selection) {
    searchInput.value = "";
    searchList.innerHTML = "";
  }
}

// Borrar favoritos (uno por uno) :

function addListenerIcon() {
  for (const child of favoritesList.children) {
    deleteIcon = child.lastElementChild;
    deleteIcon.addEventListener("click", deleteFavs);
  }
}
addListenerIcon();
function deleteFavs(event) {
  let selection = event.currentTarget;
  let deleteElement = selection.parentNode;
  const localElements = localStorageElements.findIndex(
    (element) => element.id === deleteElement.dataset.id
  );
  
  if ((selection = deleteIcon)) {
    deleteElement.remove();
  }

  if (localElements >= 0) {
    localStorageElements.splice(localElements, 1);
    localStorage.setItem("favorite anime", JSON.stringify(localStorageElements));
  }
  
}

// reseteo de todos los favoritos:
const resetAllfavsBtn = document.querySelector(".favsReset-js");
function deleteAllFavs(event) {
  if (event.currentTarget) {
    localStorage.removeItem("favorite anime");
    favoritesList.innerHTML = "";
    localStorageElements = [];
  }
}

// EVENTOS:
resetBtn.addEventListener("click", resetSearchResults);
searchBtn.addEventListener("click", getElementsApi);
resetAllfavsBtn.addEventListener("click", deleteAllFavs);
