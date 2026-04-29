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
    <h2 class="page-title">hello</h2>
  `;
}

function renderPhoto() {
  yearMenu.classList.add("hidden");

  const cards = photoItems.map(item => `
    <div class="card">
      <img src="${item.image}" alt="${item.title}">
    </div>
  `).join("");

  content.innerHTML = `
    <h2 class="page-title">Photo</h2>
    <div class="card-grid">
      ${cards}
    </div>
  `;
}

let careerData = [];

// spotify api로 가져온 데이터 띄우기
fetch("spotify_data.json")
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