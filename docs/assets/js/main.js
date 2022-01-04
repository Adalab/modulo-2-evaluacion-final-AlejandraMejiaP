"use strict";const searchButton=document.querySelector(".js-button"),apiUrl="https://api.jikan.moe/v3/search/anime?q=";let favoriteAnimes=[],resultAnimes=[];const searchBtn=document.querySelector(".js-searchButton"),resetBtn=document.querySelector(".js-resetButton");let localStorageElements=JSON.parse(localStorage.getItem("favorite anime")),deleteIcon="",favoritesList=document.querySelector(".favoritesList-js"),searchList=document.querySelector(".searchList-js"),searchListContent="";const searchInput=document.querySelector(".browser__input");let animeSearch="";const showedAnimes=50,defaultImg="assets/images/default.png",apiDefaultImg="https://cdn.myanimelist.net/images/qm_50.gif?s=e1ff92a46db617cb83bfc1e205aff620";function getElementsApi(e){e.preventDefault(),resultAnimes=[],searchList.innerHTML="",animeSearch=searchInput.value,fetch(apiUrl+animeSearch).then(e=>e.json()).then(t=>{for(let e=0;e<50;e++)resultAnimes.push(t.results[e]);renderAnimeResults(e)})}function renderAnimeResults(e){e.preventDefault(),searchListContent="",searchList.innerHTML="";let t="",a="";for(const e of resultAnimes)a=e.image_url===apiDefaultImg?defaultImg:e.image_url,t=`\n        <li class="list-js" data-id=${e.mal_id} data-title="${e.title}" data-image_url=${a}>        \n        <h3 class="searchResult-title">${e.title}</h2> \n        <img class="searchResult-img" alt="${e.title}" src="${a}">       \n        </li>`,searchListContent+=t,searchList.innerHTML=searchListContent;for(const e of searchList.children)e.addEventListener("click",selectAnime)}function selectAnime(e){const t=e.currentTarget;if(t.classList.toggle("selectedAnime"),findInStorage(t.dataset.id)>=0)deleteFavorite(e);else{-1===localStorageElements.findIndex(e=>e.id===t.dataset.id)&&(localStorageElements.push(t.dataset),localStorage.setItem("favorite anime",JSON.stringify(localStorageElements)))}renderFavs()}function findInStorage(e){return localStorageElements.findIndex(t=>t.id===e)}function renderFavs(){let e="",t=JSON.parse(localStorage.getItem("favorite anime"));null===t&&(t=[]);let a="";for(const s of t){let t="";t="",a=s.image_url===apiDefaultImg?defaultImg:s.image_url,t=`<li class="favlist-js" data-id="${s.id}"  data-title="${s.title}" data-image_url=${a}}>  <h3 class="favResult-title">${s.title}</h2> \n  <img class="favResult-img" alt="${s.title}" src="${a}">  <i class="far fa-times-circle deletefav-js"></i>     \n  </li>`,e+=t,favoritesList.innerHTML=e}addListenerIcon()}function resetSearchResults(e){e.preventDefault();e.currentTarget&&(searchInput.value="",searchList.innerHTML="")}function addListenerIcon(){for(const e of favoritesList.children)deleteIcon=e.lastElementChild,deleteIcon.addEventListener("click",deleteFavs)}function deleteFavs(e){let t=e.currentTarget,a=t.parentNode;const s=localStorageElements.findIndex(e=>e.id===a.dataset.id);(t=deleteIcon)&&a.remove(),s>=0&&(localStorageElements.splice(s,1),localStorage.setItem("favorite anime",JSON.stringify(localStorageElements)))}function deleteFavorite(e){let t=e.currentTarget;const a=localStorageElements.findIndex(e=>e.id===t.dataset.id);localStorageElements.splice(a,1),localStorage.setItem("favorite anime",JSON.stringify(localStorageElements))}renderFavs(),favoriteAnimes.push(localStorageElements),null===localStorageElements&&(localStorageElements=[]),addListenerIcon();const resetAllfavsBtn=document.querySelector(".favsReset-js");function deleteAllFavs(e){e.currentTarget&&(localStorage.removeItem("favorite anime"),favoritesList.innerHTML="",localStorageElements=[])}resetBtn.addEventListener("click",resetSearchResults),searchBtn.addEventListener("click",getElementsApi),resetAllfavsBtn.addEventListener("click",deleteAllFavs);