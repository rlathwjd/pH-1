const content = document.getElementById("content");
const yearMenu = document.getElementById("year-menu");
const homeLink = document.getElementById("home-link");
const pageLinks = document.querySelectorAll("[data-page]");
const yearLinks = document.querySelectorAll("[data-year]");

const photoItems = [
  { title: "Photo 1", image: "images/축구복.JPG" },
  { title: "Photo 2", image: "images/하트.jpg" },
  { title: "Photo 3", image: "images/차.JPG" },
  { title: "Photo 4", image: "images/스토리.jpg" },
  { title: "Photo 5", image: "images/인스타.jpg" },
  { title: "Photo 6", image: "images/눈1.jpg" },
  { title: "Photo 7", image: "images/눈2.jpg" },
  { title: "Photo 8", image: "images/강아지.jpg" }
];

const careerData = {
  "2016": [
    {
      title: "Wavy",
      date: "10/21",
      image: "images/Wavy.JPG",
      tracks: ["Wavy"]
    },
    {
      title: "Perfect",
      date: "11/29",
      image: "images/Perfect.jpg",
      tracks: ["Perfect"]
    }
  ],
  "2017": [
    {
      title: "DINGO X H1GHR MUSIC",
      date: "09/16",
      image: "images/iffy.jpg",
      tracks: ["iffy"]
    },
    {
      title: "The Island Kid",
      date: "10/18",
      image: "images/The Island Kid.jpg",
      tracks: [
        "Cuckoo",
        "'15",
        "Christ",
        "Escobar",
        "Game Night",
        "Donut"
      ]
    }
  ],
  "2018": [
    { title: "GATSBY", 
      date: "02/04", 
      image: "images/GATSBY.JPG",
      tracks: [
        "Communicate",
        "Penthouse"
      ] 
    },
    { title: "harry", 
      date: "06/22", 
      image: "images/harry.JPG",
      tracks: [
        "harry's question",
        "비싸",
        "DVD"
      ] 
    },
    { title: "loves", 
      date: "08/20", 
      image: "images/loves.JPG",
      tracks: [
        "Groupie",
        "Cupid"
      ] 
    },
    { title: "loves", 
      date: "08/20", 
      image: "images/loves.JPG",
      tracks: [
        "Groupie",
        "Cupid"
      ] 
    },
    { title: "쇼미더머니 777 Episode 1", 
      date: "10/06", 
      image: "images/쇼미더머니 777 Episode 1.JPG",
      tracks: [
        "Good Day",
        "Hate You",
        "119",
        "주황색"
      ] 
    }
  ],
  "2019": [
    { title: "HALO", date: "03/28", image: "images/HALO.jpg" },
    { title: "Summer Episodes", date: "07/23", image: "images/Summer Episodes.JPG" }
  ],
  "2020": [
    { title: "Nerdy Love", date: "01/09", image: "images/Nerdy Love.JPG" },
    { title: "X", date: "05/08", image: "images/X.JPG" },
    { title: "RED TAPE", date: "09/02", image: "images/RED TAPE.JPG" },
    { title: "BLUE TAPE", date: "09/16", image: "images/BLUE TAPE.JPG" }
  ],
  "2021": [
    { title: "365&7", date: "04/29", image: "images/365&7.JPG" }
  ],
  "2022": [
    { title: "BUT FOR NOW LEAVE ME ALONE", date: "09/15", image: "images/BUT FOR NOW LEAVE ME ALONE.JPG" }
  ],
  "2023": [
    { title: "POP OFF", date: "11/02", image: "images/POP OFF.JPG" }
  ],
  "2024": [
    { title: "HANDS", date: "12/23", image: "images/HANDS.JPG" }
  ],
  "2025": [
    { title: "WHAT HAVE WE DONE", date: "08/13", image: "images/WHAT HAVE WE DONE.JPG" }
  ],
  "2026": [
    { title: "PURPLE TAPE", date: "04/09", image: "images/PURPLE TAPE.JPG" }
  ]
};

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

function renderCareer(year = "2016", selectedIndex = null) {
  yearMenu.classList.remove("hidden");

  const items = careerData[year] || [];

  let cards = "";

  // 👉 선택 안 했을 때 (전체 앨범)
  if (selectedIndex === null) {
    cards = items.map((item, index) => `
      <div class="card" onclick="renderCareer('${year}', ${index})">
        <img src="${item.image}" alt="${item.title}">
        <div class="card-label">${item.title}</div>
        <div class="card-label">${item.date}</div>
      </div>
    `).join("");
  }

  // 👉 선택했을 때 (하나만 표시 + 곡 목록)
  else {
    const item = items[selectedIndex];
    // <button class="back-btn" onclick="renderCareer('${year}')">←</button>

    cards = `
      <button class="back-button" onclick="renderCareer('${year}')">←</button>
      <div class="card">
        <img src="${item.image}" alt="${item.title}">
        <div class="card-label">${item.title}</div>
        <div class="card-label">${item.date}</div>

        ${
          item.tracks
            ? `
              <ul class="tracklist">
                ${item.tracks.map(track => `<li>${track}</li>`).join("")}
              </ul>
            `
            : `<p></p>`
        }

      </div>
    `;
  }

  content.innerHTML = `
    <h2 class="page-title">${year}</h2>
    <div class="card-grid">
      ${cards}
    </div>
  `;
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

renderHome();