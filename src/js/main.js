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
// Función búsqueda de anime:

// Fetch al Api y función que trae los 3 primeros resultados de la búsqueda:
function getElementsApi(event) {
  animeSearch = searchInput.value;
  fetch(apiUrl + animeSearch)
    .then((response) => response.json())
    .then((data) => {
      // resultAnimes = data.results;
      for (let i = 0; i < showedAnimes; i++) {
        resultAnimes.push(data.results[i]);
      }
      renderAnimeResults(event);
      console.log(data);
    });
}
function renderAnimeResults(event) {
  event.preventDefault();
  let searchListContent = "";
  for (const anime of resultAnimes) {
    let animeContent = "";

    if ( anime.image_url ===
      `https://cdn.myanimelist.net/images/qm_50.gif?s=e1ff92a46db617cb83bfc1e205aff620`) {
      
      animeContent = `
        <li class="list-js">        
        <h2 class="searchResult-title">${anime.title}</h2> 
        <img class="searchResult-img" alt="${anime.title}" src="${defaultImg}">       
        </li>`;
    } else { animeContent = `
        <li class="list-js">        
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

function selectAnime(event) {
  const selection = event.currentTarget;
  selection.classList.toggle("selectedAnime");
}

// EVENTOS:

searchBtn.addEventListener("click", getElementsApi);
