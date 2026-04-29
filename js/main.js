const content = document.getElementById("content");
const yearMenu = document.getElementById("year-menu");
const homeLink = document.getElementById("home-link");
const pageLinks = document.querySelectorAll("[data-page]");
const yearLinks = document.querySelectorAll("[data-year]");

const photoItems = [
  { title: "Photo 1", image: "images/축구복.jpg" },
  { title: "Photo 2", image: "images/하트.jpg" },
  { title: "Photo 3", image: "images/차.jpg" },
  { title: "Photo 4", image: "images/스토리.jpg" },
  { title: "Photo 5", image: "images/인스타.jpg" },
  { title: "Photo 6", image: "images/눈1.jpg" },
  { title: "Photo 7", image: "images/눈2.jpg" },
  { title: "Photo 8", image: "images/강아지.jpg" }
];

function renderHome() {
  yearMenu.classList.add("hidden");

  content.innerHTML = `
    <section class="home-page">
      <h2 class="home-desc">Welcome to pH-1 archive</h2>

      <div class="mood-section">
        <div class="mood-row">
          <div class="mood-buttons">
            <button data-mood="감성">감성</button>
            <button data-mood="설렘">설렘</button>
            <button data-mood="힙함">힙함</button>
            <button data-mood="청량">청량</button>
            <button data-mood="위로">위로</button>
            <button data-situation="드라이브">드라이브</button>
          </div>

          <button id="recommend-btn" class="recommend-btn">추천받기</button>
        </div>

        <div id="selected-tags" class="selected-tags"></div>
        <div id="toast-message" class="toast-message"></div>
        <div id="recommend-result"></div>
      </div>
    </section>
  `;
}

document.addEventListener("click", (e) => {
  const moodButton = e.target.closest(".mood-buttons button");

  if (moodButton) {
    const tag = moodButton.dataset.mood || moodButton.dataset.situation;

    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter(item => item !== tag);
      moodButton.classList.remove("selected");
    } else {
      if (selectedTags.length >= 3) {
        showToast("최대 3개까지만 선택할 수 있어!");
        return;
      }

      selectedTags.push(tag);
      moodButton.classList.add("selected");
    }

    return;
  }

  const recommendButton = e.target.closest("#recommend-btn");

  if (recommendButton) {
    if (selectedTags.length === 0) {
      showToast("무드를 하나 이상 선택해줘!");
      return;
    }

    getRecommendation(selectedTags);
  }
});

function showToast(message) {
  const toast = document.getElementById("toast-message");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function renderSelectedTags() {
  const selectedBox = document.getElementById("selected-tags");
  if (!selectedBox) return;

  selectedBox.innerHTML = selectedTags
    .map(tag => `<span class="selected-tag">#${tag}</span>`)
    .join("");
}

let selectedTags = [];


// 곡 추천
async function getRecommendation(tags) {
  const resultBox = document.getElementById("recommend-result");

  resultBox.innerHTML = `
  <p class="loading-text">🎧 추천 곡 찾는 중...</p>
`;

  const res = await fetch("http://127.0.0.1:8000/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ moods: tags })
  });

  const data = await res.json();
  renderRecommendations(data.recommendations);
}

// 추천 곡 렌더링
function renderRecommendations(recommendations) {
  const resultBox = document.getElementById("recommend-result");

  resultBox.innerHTML = `
    <div class="recommend-list">
      ${recommendations.map(item => `
        <div class="recommend-card">
          <img class="recommend-img" src="${item.image}" alt="${item.title}">

          <div class="recommend-info">
            <div class="title-row">
              <div class="title-text">
                <span class="track-title">${item.title}</span>
                <span class="album-name">${item.album}</span>
              </div>

              <a href="${item.spotify || item.youtube || '#'}" 
                target="_blank" 
                class="play-btn">
                ▶ 들으러 가기
              </a>
            </div>
              <p class="reason">${item.reason}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

let careerData = [];

// spotify api로 가져온 데이터 띄우기
fetch("./data/spotify_data.json")
  .then(res => res.json())
  .then(data => {
    const grouped = {};

    data.forEach(album => {
      const year = album.date.slice(0, 4);

      if (!grouped[year]) {
        grouped[year] = [];
      }

      grouped[year].push({
        title: album.title,
        date: album.date.slice(5),
        image: album.image,
        tracks: album.tracks
      });
    });

    careerData = grouped;
    renderHome();
  });

function renderCareer(year = "2016", selectedIndex = null) {
yearMenu.classList.remove("hidden");

const items = careerData[year] || [];

let html = "";

// 앨범 목록 화면
if (selectedIndex === null) {
  html = `
    <h2 class="page-title">${year}</h2>
    <div class="card-grid">
      ${items.map((item, index) => `
        <div class="card" onclick="renderCareer('${year}', ${index})">
          <img src="${item.image}" alt="${item.title}">
          <div class="card-label">${item.title}</div>
          <div class="card-label">${item.date}</div>
        </div>
      `).join("")}
    </div>
  `;
}

// 앨범 상세 화면
else {
  const item = items[selectedIndex];

  html = `
    <h2 class="page-title">${year}</h2>
    <button class="back-button" onclick="renderCareer('${year}')">←</button>

    <div class="card-grid">
      <div class="card">
        <img src="${item.image}">
        <div class="card-label">${item.title}</div>
        <div class="card-label">${item.date}</div>
        <div class="track-panel">
          <div class="track-title">
            <h3>Track List</h3>
            <div class="track-list">
              <ul class="tracklist">
                ${item.tracks.map(track => `<li>${track}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>
  `;
}

content.innerHTML = html;
}

function toggleAlbum(id) {
  const el = document.getElementById(id);
  if (!el) return;

  if (el.style.display === "none" || el.style.display === "") {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
}

homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  renderHome();
});

pageLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.dataset.page;

    if (page === "photo") renderPhoto();
    if (page === "career") renderCareer();
  });
});

yearLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    renderCareer(link.dataset.year);
  });
});