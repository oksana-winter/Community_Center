import { header, footer } from "./commonHTML.js";

// Add alt here
class Artcile {
    constructor(title, imgPath, description, text) {
        this.title = title;
        this.imgPath = imgPath;
        this.description = description;
        this.text = text;
    }
}

// Can be moved to miscellaneous
async function loadFromJson(path) {
    const response = await fetch(path);
    const data = await response.json();
    return data;
}

/**
 * @param {string} path - The path or URL to the JSON file containing the news data.
 * @returns {Promise<Article[]>} A promise that resolves to an array of Article instances.
*/
async function getNews(path) {
    const data = await loadFromJson(path);
    return data.news.map(article => new Artcile(article.title, article.imgPath, article.description, article.text));
}

function displayNews(news, newsList, container, contentToHide) {
    for (const article of news) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.setAttribute('src', article.imgPath );
        const h2 = document.createElement('h2');
        h2.textContent = article.title;
        const p = document.createElement('p');
        p.textContent = article.description + "...";
        const a = document.createElement('a');
        a.addEventListener('click', displayArticle.bind(article, container, contentToHide));
        a.setAttribute('href', "#" );
        a.textContent = "Read more";
        
        // li.textContent = 
        li.append(img, h2, p, a);
        newsList.appendChild(li);
    }
}

function displayElement(container, html) {
    container.innerHTML = html; 
}

function displayArticle(container, contentToHide){
    const article = this;

    contentToHide.classList.add('hidden');
    container.classList.remove('hidden');

    const img = document.createElement('img');
    img.setAttribute('src', article.imgPath );
    const h1 = document.createElement('h1');
    h1.textContent = article.title;
    const p = document.createElement('p');
    p.textContent = article.text;
    container.append(img, h1, p);
}

async function init(){
    const nav = document.querySelector('.nav-container');
    // const sideMenu = document.querySelector('.side-menu-container');
    const footerContainer = document.querySelector('.footer-container');

    displayElement(nav, header);
    displayElement(footerContainer, footer);

    // here import html and draw inside the containers

    const mainContainer = document.querySelector('.main-container');
    const articleContainer = document.querySelector('.article-container');
    const newsList = document.getElementById('news-list');

    const openBtn = document.getElementById('openPopup');
    const closeBtn = document.getElementById('closePopup');
    const popup = document.getElementById('popup');
    openBtn.addEventListener('click', () => {
       popup.classList.remove('hidden');
    });
    closeBtn.addEventListener('click', () => {
      popup.classList.add('hidden');
    });
    // Optional: close popup if you click outside the content
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.add('hidden');
      }
    });
    

    try {
        const news = await getNews('./news.json');
        displayNews(news, newsList, articleContainer, mainContainer); // bad practice!!! don't repeat it EVER
        
    } 
    catch (error) {
        console.error('Error loading json:', error);
    }
}

// Entry point
document.addEventListener('DOMContentLoaded', init); 