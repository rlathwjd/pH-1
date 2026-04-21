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
      image: "images/Wavy.jpg",
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
      image: "images/GATSBY.jpg",
      tracks: [
        "Communicate",
        "Penthouse"
      ] 
    },
    { title: "harry", 
      date: "06/22", 
      image: "images/harry.jpg",
      tracks: [
        "harry's question",
        "비싸",
        "DVD"
      ] 
    },
    { title: "loves", 
      date: "08/20", 
      image: "images/loves.jpg",
      tracks: [
        "Groupie",
        "Cupid"
      ] 
    },
    { title: "쇼미더머니 777 Episode 1", 
      date: "10/06", 
      image: "images/쇼미더머니 777 Episode 1.jpg",
      tracks: [
        "Good Day",
        "Hate You",
        "119",
        "주황색"
      ] 
    },
    { title: "staying", 
      date: "11/24", 
      image: "images/staying.jpg",
      tracks: [
        "무리야",
        "Homebody"
      ] 
    },
  ],
  "2019": [
    { title: "HALO", 
      date: "03/28", 
      image: "images/HALO.jpg",
      tracks: [
        "Alright",
        "너무 싫어",
        "Malibu",
        "Lights Out",
        "Push Me",
        "Like Me",
        "못봐",
        "Rain Man",
        "Olaf",
        "Dirty Nikes",
        "Til I Die",
        "Making Film"
      ] 
    },
    { title: "Summer Episodes", 
      date: "07/23", 
      image: "images/Summer Episodes.jpg",
      tracks: [
        "You Don't Know My Name",
        "BOOL",
        "Different Summer"
      ] 
    }
  ],
  "2020": [
    { title: "Nerdy Love", 
      date: "01/09", 
      image: "images/Nerdy Love.jpg",
      tracks: [
        "Nerdy Love"
      ] },
    { title: "X",
      date: "05/08", 
      image: "images/X.jpg",
      tracks: [
        "사인회",
        "OKAY",
        "PACKITUP!",
        "BLAME MY CIRCLE",
        "TELÉFONO",
        "센 척",
        "ANYMORE",
        "I CAN TELL",
        "MORAGO",
        "DRESSING ROOM"
      ] 
    },
    { title: "RED TAPE", 
      date: "09/02", 
      image: "images/RED TAPE.jpg",
      tracks: [
        "H1GHR",
        "Melanin HAndsome",
        "How We Rock",
        "뚝딱 Freestyle",
        "4eva",
        "Teléfono Remix",
        "Closed Case",
        "World Domination",
        "The Purge",
        "No Rush",
        "Check My Bio",
        "Dance Like Jay Park Remix",
        "Team",
        "도착"
      ] 
    },
    { title: "BLUE TAPE", 
      date: "09/16", 
      image: "images/BLUE TAPE.jpg",
      tracks: [
        "Champagne Diet",
        "Me&Bae",
        "Selfish",
        "Last Song",
        "ㄱ에서부터 0에서부터",
        "LIVE",
        "Lean On Me",
        "Oscar",
        "Afternoon",
        "End Of The Night",
        "Gotta Go",
        "RSVP Remix",
        "Swing My Way",
        "Toast"
      ] }
  ],
  "2021": [
    { title: "365&7", 
      date: "04/29", 
      image: "images/365&7.jpg",
      tracks: [
        "365&7"
      ] }
  ],
  "2022": [
    { title: "BUT FOR NOW LEAVE ME ALONE", 
      date: "09/15", 
      image: "images/BUT FOR NOW LEAVE ME ALONE.jpg",
      tracks: [
        "ZOMBIES",
        "TGIF",
        "YUPPIE TING",
        "TIPSY",
        "MR. BAD",
        "JULIETTE!",
        "RUN AWAY",
        "DEAD GIRL",
        "SHRINK TOLD ME",
        "ISSUES",
        "BREAK THE GLASS",
        "마지막 싸움",
        "배"
      ] 
    }
  ],
  "2023": [
    { title: "POP OFF", 
      date: "11/02", 
      image: "images/POP OFF.jpg",
      tracks: [
        "ROSETTA",
        "COSIGN",
        "INCUBATOR",
        "U TELL ME",
        "LUST",
        "360o",
      ] 
    }
  ],
  "2024": [
    { title: "HANDS", 
      date: "12/23", 
      image: "images/HANDS.jpg",
      tracks: [
        "인생영화",
        "Trustfall"
      ] 
    }
  ],
  "2025": [
    { title: "WHAT HAVE WE DONE", 
      date: "08/13", 
      image: "images/WHAT HAVE WE DONE.jpg",
      tracks: [
        "WHAT HAVE WE DONE",
        "PARTY PPL",
        "KEEP IT ON THE LOW",
        "MY B",
        "BAKA",
        "CRASHINNN OUTTT!!!",
        "ERYKAH BADU",
        "GOSHA",
        "DRUGGED2THRILLS",
        "54321",
        "EASY",
        "SUMMER FEVER",
        "COVERED IN RAIN",
        "도망쳐",
        "SOAK IN BLUE"
      ] 
    }
  ],
  "2026": [
    { title: "PURPLE TAPE", 
      date: "04/09", 
      image: "images/PURPLE TAPE.jpg",
      tracks: [
        "WORKMAN",
        "월드컵",
        "GAGA",
        "FOCKIT",
        "WARM UP FREESTYLE",
        "MO LESSON",
        "BORA", 
        "<3U",
        "SUPERSTAR",
        "BDB",
        "OVERNIGHT",
        "POOF!",
        "GPT FREESYLE",
        "PHONE",
        "SAY NO MORE"
      ] }
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