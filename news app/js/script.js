const API_KEY = "ca73ae6db7d3437c9ba2a444101a7ffa";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}
function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const data = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/jakarta" });

    newsSource.innerHTML = `${article.source.name} . ${data}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}
let curSelectedNav = null;
function onNavIteamClick(id) {
    fetchNews(id);
    const NavIteam = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = NavIteam;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
})