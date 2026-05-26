const cases = [
  {
    title: "林宅 - 自然序曲",
    subtitle: "The Lin Residence - Prelude of Nature",
    name: "林宅 - 自然序曲",
    summary:
      "以温润木质、自然石材与开放动线构成家的主要表情，让会客、用餐与休憩在同一片柔和光线中自然发生。",
    location: "上海 · 静安",
    area: "180 m²",
    type: "私宅设计",
    hero:
      "assets/photos/32/03778B94-D40C-4256-991A-AA0CE21DF340.webp",
    images: [
      "assets/photos/32/03778B94-D40C-4256-991A-AA0CE21DF340.webp",
      "assets/photos/32/262D37B7-933E-42D3-B328-356168A7E261.webp",
      "assets/photos/32/2E665617-915C-4A78-A13E-294DA169577A.webp",
      "assets/photos/32/3967872F-2CA1-4324-AE47-6A4E70EA21A6.webp",
    ],
    copyOne:
      "设计从客户真实的生活习惯出发，保留大尺度的公共区域，让光线从窗边延展至餐厅与书房。材质选择克制而细腻，强调触感、光影与日常使用之间的平衡。",
    copyTwo:
      "客餐厅之间不再以硬隔断划分，而是通过家具尺度、灯光层次和地面材质完成温和过渡。客户接待时，空间显得开阔；家人独处时，又能保有安静的包裹感。",
  },
  {
    title: "云境公馆",
    subtitle: "Cloud Residence",
    name: "云境公馆",
    summary:
      "以酒店式归家体验为主轴，整合玄关、客厅、餐厨与主卧套间，呈现更利落的城市生活秩序。",
    location: "杭州 · 钱江新城",
    area: "220 m²",
    type: "大平层设计",
    hero:
      "assets/photos/35/177EC569-0B86-4588-900C-2FE576FCAB7C.webp",
    images: [
      "assets/photos/35/177EC569-0B86-4588-900C-2FE576FCAB7C.webp",
      "assets/photos/35/08E680A7-DD8F-4597-9624-AEF79A6DE2CC.webp",
      "assets/photos/35/30734AEA-E961-4262-89AC-1335F688B662.webp",
      "assets/photos/35/378514D3-D184-499C-8DAC-0E78AF00BCAB.webp",
    ],
    copyOne:
      "空间以浅色石材和深色木饰面形成对比，公共区域强调仪式感，私密区域则收束为安静、轻松、便于长期居住的尺度。",
    copyTwo:
      "厨房与餐厅采用半开放关系，适合家庭聚会与客户接待。隐藏收纳系统让视觉保持干净，也让日常维护变得更轻松。",
  },
  {
    title: "松弛之家",
    subtitle: "A Relaxed Home",
    name: "松弛之家",
    summary:
      "围绕亲子陪伴和长期成长设计，减少装饰堆叠，强化收纳、洄游动线与自然采光。",
    location: "苏州 · 金鸡湖",
    area: "150 m²",
    type: "改善型住宅",
    hero:
      "assets/photos/34/5366D28E-DEA2-4DAB-99B8-E0A7FD1080F0.webp",
    images: [
      "assets/photos/34/5366D28E-DEA2-4DAB-99B8-E0A7FD1080F0.webp",
      "assets/photos/34/3107EE63-C33E-40AF-AE5F-622F618990A4.webp",
      "assets/photos/34/4F8D3322-AA04-42B3-9CFC-9CE01BB2300F.webp",
      "assets/photos/34/61A5A74F-3AA9-49BA-AF97-4E99A88AB0DD.webp",
    ],
    copyOne:
      "设计把孩子活动、阅读、餐厨互动放在同一条生活线上，让家人在不同状态下都能自然交流。",
    copyTwo:
      "墙面、柜体和家具尽量保持统一的色彩关系，减少视觉压力。可调整的房间功能也为未来几年的生活变化留下余地。",
  },
];

const works = [
  {
    title: "自然序曲",
    category: "私宅设计",
    image: "assets/photos/32/03778B94-D40C-4256-991A-AA0CE21DF340.webp",
    caseIndex: 0,
  },
  {
    title: "云境公馆",
    category: "大平层设计",
    image: "assets/photos/35/177EC569-0B86-4588-900C-2FE576FCAB7C.webp",
    caseIndex: 1,
  },
  {
    title: "松弛之家",
    category: "改善型住宅",
    image: "assets/photos/34/5366D28E-DEA2-4DAB-99B8-E0A7FD1080F0.webp",
    caseIndex: 2,
  },
  {
    title: "湖畔平层",
    category: "客餐厅",
    image: "assets/photos/33/10311F14-2D87-444C-B840-18C93419D9B6.webp",
    caseIndex: 0,
  },
  {
    title: "木色秩序",
    category: "餐厨空间",
    image: "assets/photos/34/3107EE63-C33E-40AF-AE5F-622F618990A4.webp",
    caseIndex: 2,
  },
  {
    title: "静谧卧室",
    category: "卧室设计",
    image: "assets/photos/32/2E665617-915C-4A78-A13E-294DA169577A.webp",
    caseIndex: 0,
  },
  {
    title: "暗调会客",
    category: "质感空间",
    image: "assets/photos/35/08E680A7-DD8F-4597-9624-AEF79A6DE2CC.webp",
    caseIndex: 1,
  },
  {
    title: "开放餐厅",
    category: "餐厅设计",
    image: "assets/photos/32/63A3BCF0-AB57-4D25-937E-B686D0BE9356.webp",
    caseIndex: 0,
  },
  {
    title: "书房一角",
    category: "功能空间",
    image: "assets/photos/34/253D7919-0407-40DB-8A4F-2DCAD277BE89.webp",
    caseIndex: 2,
  },
  {
    title: "城市客厅",
    category: "客厅设计",
    image: "assets/photos/33/72F42E78-0600-4453-9E1F-0581B9A62344.webp",
    caseIndex: 0,
  },
  {
    title: "灰调餐厨",
    category: "餐厨一体",
    image: "assets/photos/35/378514D3-D184-499C-8DAC-0E78AF00BCAB.webp",
    caseIndex: 1,
  },
  {
    title: "温润套房",
    category: "主卧套间",
    image: "assets/photos/05/143FC9F8-4281-4752-BFF3-CFC84BC0BA8B.webp",
    caseIndex: 2,
  },
];

let activeCase = 0;

const hero = document.querySelector("[data-case-hero]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImg = document.querySelector("[data-lightbox-img]");
const workGrid = document.querySelector("[data-work-grid]");

function setText(selector, text) {
  document.querySelector(selector).textContent = text;
}

function renderCase(index) {
  const item = cases[index];
  activeCase = index;

  hero.style.backgroundImage = `url("${item.hero}")`;
  setText("[data-case-title]", "董揅空间设计");
  setText("[data-case-subtitle]", "个人设计顾问 · 私宅空间 · 作品案例");
  setText("[data-copy-one]", item.copyOne);
  setText("[data-copy-two]", item.copyTwo);

  document.querySelectorAll("[data-gallery-img]").forEach((image) => {
    const galleryIndex = Number(image.dataset.galleryImg);
    image.src = item.images[galleryIndex];
  });

  document.querySelectorAll(".case-tab").forEach((tab) => {
    tab.classList.toggle("is-active", Number(tab.dataset.case) === index);
  });
}

function renderWorks() {
  workGrid.innerHTML = works
    .map(
      (work, index) => `
        <button class="work-card" type="button" data-work-index="${index}" data-case="${work.caseIndex}">
          <img src="${work.image}" alt="${work.title}" />
          <span class="work-number">${String(index + 1).padStart(2, "0")}</span>
          <span class="work-info">
            <strong>${work.title}</strong>
            <small>${work.category}</small>
          </span>
        </button>
      `,
    )
    .join("");
}

renderWorks();

document.querySelectorAll("[data-case]").forEach((button) => {
  button.addEventListener("click", () => {
    renderCase(Number(button.dataset.case));
    document.querySelector("#story").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("[data-gallery-index]").forEach((button) => {
  button.addEventListener("click", () => {
    const imageIndex = Number(button.dataset.galleryIndex);
    const image = cases[activeCase].images[imageIndex];
    lightboxImg.src = image;
    lightboxImg.alt = button.querySelector("img").alt;
    lightbox.hidden = false;
  });
});

document.querySelector(".lightbox-close").addEventListener("click", () => {
  lightbox.hidden = true;
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.hidden = true;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    lightbox.hidden = true;
  }
});
