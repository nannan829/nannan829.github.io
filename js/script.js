// ===== 明信片数据区 =====
// 图片都放在 images 文件夹内。要替换某张明信片，直接覆盖对应编号图片即可，例如 images/1.jpg。
// 要新增明信片：把图片放入 images 文件夹，再在 postcardNumbers 数组中加入编号。
const postcardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

const postcards = postcardNumbers.map((number) => ({
  image: `images/${number}.jpg`,
  from: "育英学校的小朋友",
  to: "儿童医院的小朋友",
  message: "愿你的每一天，都有阳光和笑容。",
  date: "2025.10.6",
  stamp: "LOVE",
  number
}));

// ===== 动画设置 =====
const ANIMATION_CONFIG = {
  spawnInterval: 3300
};

const stage = document.getElementById('stage');
const galleryGrid = document.getElementById('galleryGrid');
const modal = document.getElementById('modal');
const btnViewAll = document.getElementById('btnViewAll');
const btnClose = document.getElementById('btnClose');
let currentIndex = 0;
let timer = null;

function createPostcardElement(data, gallery = false) {
  const card = document.createElement('article');
  card.className = 'postcard-card';
  const rotate = (Math.random() - 0.5) * 5;
  card.style.setProperty('--rotate', `${rotate}deg`);
  card.innerHTML = `
    <div class="postcard-img-container">
      <div class="postcard-placeholder">明信片图片</div>
      <img src="${data.image}" alt="儿童祝福明信片 ${data.number}" loading="${gallery ? 'lazy' : 'eager'}" onerror="this.style.display='none'" />
    </div>
    <div class="postcard-meta">
      <span>POSTCARD · ${String(data.number).padStart(2, '0')}</span>
      <span class="stamp">${data.stamp}</span>
    </div>
  `;
  return card;
}

function spawnPostcard() {
  if (!stage || postcards.length === 0 || modal.classList.contains('active')) return;
  const data = postcards[currentIndex];
  const card = createPostcardElement(data);
  card.classList.add('flying');
  stage.appendChild(card);
  card.addEventListener('animationend', () => card.remove(), { once: true });
  currentIndex = (currentIndex + 1) % postcards.length;
}

function startLoop() {
  if (timer) clearInterval(timer);
  spawnPostcard();
  timer = setInterval(spawnPostcard, ANIMATION_CONFIG.spawnInterval);
}

function stopLoop() {
  if (timer) clearInterval(timer);
  timer = null;
}

function populateGallery() {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = '';
  postcards.forEach((data) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-item';
    wrapper.appendChild(createPostcardElement(data, true));
    galleryGrid.appendChild(wrapper);
  });
}

if (btnViewAll && btnClose && modal) {
  btnViewAll.addEventListener('click', () => {
    populateGallery();
    modal.classList.add('active');
    stopLoop();
  });
  btnClose.addEventListener('click', () => {
    modal.classList.remove('active');
    startLoop();
  });
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('active');
      startLoop();
    }
  });
}

window.addEventListener('DOMContentLoaded', startLoop);
