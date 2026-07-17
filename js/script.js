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

// ===== 公益闭环四板块悬停/点击切换 =====
const loopChapters = [...document.querySelectorAll('.loop-chapter')];
function activateLoopChapter(chapter) {
  loopChapters.forEach((item) => item.classList.toggle('active', item === chapter));
}
loopChapters.forEach((chapter) => {
  chapter.addEventListener('mouseenter', () => activateLoopChapter(chapter));
  chapter.addEventListener('focus', () => activateLoopChapter(chapter));
  chapter.addEventListener('click', () => activateLoopChapter(chapter));
});

// ===== 公益纪实漂浮影像区 =====
// 替换方法：图片放进 images 文件夹；视频放进 videos 文件夹，再修改下方路径。
const documentaryMedia = [
  { type: "video", src: "videos/documentary-01.mp4", poster: "images/hero-children.jpg", title: "孩子们的笑脸", text: "用影像保存孩子之间最真实、最轻盈的一次相遇。" },
  { type: "image", src: "images/3.jpg", title: "画里的祝福", text: "一张画、一句话，也可以成为温柔抵达的方式。" },
  { type: "image", src: "images/7.jpg", title: "童心来信", text: "把孩子们亲手完成的作品，留在公益项目的纪实档案中。" },
  { type: "image", src: "images/11.jpg", title: "正在送达", text: "每一份祝福都在路上，也在等待一声回应。" },
  { type: "image", src: "images/15.jpg", title: "祝福展厅", text: "记录画作被看见、被阅读、被珍惜的过程。" },
  { type: "image", src: "images/19.jpg", title: "爱的回声", text: "给予并不是终点，回应让这份爱形成完整的闭环。" },
  { type: "video", src: "videos/documentary-02.mp4", poster: "images/1.jpg", title: "一封祝福的旅程", text: "这里已预留本地视频位置，后续可直接替换为你的儿童祝福或项目纪实视频。" },
  { type: "image", src: "images/23.jpg", title: "被保存的瞬间", text: "那些细小的笑容、画面和回应，构成项目最珍贵的部分。" },
  { type: "image", src: "images/27.jpg", title: "一起完成", text: "学校、医院、志愿者和孩子，共同完成一次爱的传递。" },
  { type: "image", src: "images/31.jpg", title: "温柔陪伴", text: "通过持续的记录，让每一份陪伴都不被轻易遗忘。" },
  { type: "image", src: "images/35.jpg", title: "孩子写给孩子", text: "最简单的祝福，往往拥有最真诚的力量。" },
  { type: "image", src: "images/39.jpg", title: "继续发生", text: "让下一张画、下一段视频和下一次回应继续汇入这里。" }
];

const mediaTrackTop = document.getElementById('mediaTrackTop');
const mediaTrackBottom = document.getElementById('mediaTrackBottom');
const mediaModal = document.getElementById('mediaModal');
const mediaModalClose = document.getElementById('mediaModalClose');
const mediaModalBody = document.getElementById('mediaModalBody');
const mediaModalTitle = document.getElementById('mediaModalTitle');
const mediaModalText = document.getElementById('mediaModalText');
const mediaModalType = document.getElementById('mediaModalType');
const openFirstMedia = document.getElementById('openFirstMedia');

function createMediaCard(item, index) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'media-card';
  card.setAttribute('aria-label', `查看${item.type === 'video' ? '视频' : '图片'}：${item.title}`);
  const image = document.createElement('img');
  image.src = item.poster || item.src;
  image.alt = item.title;
  image.loading = 'lazy';
  card.appendChild(image);
  if (item.type === 'video') {
    const play = document.createElement('span');
    play.className = 'media-card-play';
    play.setAttribute('aria-hidden', 'true');
    card.appendChild(play);
  }
  card.addEventListener('click', () => openDocumentaryMedia(index));
  return card;
}

function fillMediaTrack(track, indexedItems) {
  if (!track) return;
  track.innerHTML = '';
  [...indexedItems, ...indexedItems].forEach(({ item, index }) => track.appendChild(createMediaCard(item, index)));
}

function buildDocumentarySection() {
  const indexed = documentaryMedia.map((item, index) => ({ item, index }));
  const midpoint = Math.ceil(indexed.length / 2);
  fillMediaTrack(mediaTrackTop, indexed.slice(0, midpoint));
  fillMediaTrack(mediaTrackBottom, indexed.slice(midpoint));
}

function openDocumentaryMedia(index) {
  if (!mediaModal || !mediaModalBody) return;
  const item = documentaryMedia[index];
  if (!item) return;
  mediaModalBody.innerHTML = '';
  if (item.type === 'video') {
    const video = document.createElement('video');
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.poster = item.poster || '';
    const source = document.createElement('source');
    source.src = item.src;
    source.type = 'video/mp4';
    video.appendChild(source);
    mediaModalBody.appendChild(video);
  } else {
    const image = document.createElement('img');
    image.src = item.src;
    image.alt = item.title;
    mediaModalBody.appendChild(image);
  }
  mediaModalTitle.textContent = item.title;
  mediaModalText.textContent = item.text;
  mediaModalType.textContent = item.type === 'video' ? 'DOCUMENTARY VIDEO' : 'DOCUMENTARY IMAGE';
  mediaModal.classList.add('active');
  mediaModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeDocumentaryMedia() {
  if (!mediaModal || !mediaModalBody) return;
  const playingVideo = mediaModalBody.querySelector('video');
  if (playingVideo) playingVideo.pause();
  mediaModal.classList.remove('active');
  mediaModal.setAttribute('aria-hidden', 'true');
  mediaModalBody.innerHTML = '';
  document.body.style.overflow = '';
}

if (mediaModalClose) mediaModalClose.addEventListener('click', closeDocumentaryMedia);
if (mediaModal) mediaModal.addEventListener('click', (event) => { if (event.target === mediaModal) closeDocumentaryMedia(); });
if (openFirstMedia) openFirstMedia.addEventListener('click', () => openDocumentaryMedia(0));
window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && mediaModal?.classList.contains('active')) closeDocumentaryMedia(); });
window.addEventListener('DOMContentLoaded', buildDocumentarySection);

// ===== 最后一屏交互 =====
const finalBackToTop = document.getElementById('finalBackToTop');
if (finalBackToTop) {
  finalBackToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const finalSend = document.getElementById('finalSend');
if (finalSend) {
  finalSend.addEventListener('click', () => {
    const agreement = document.getElementById('blessingAgreement');
    if (agreement && !agreement.checked) {
      alert('请先勾选内容展示授权与隐私说明。');
      return;
    }
    alert('祝福提交功能已预留，后续可接入表单、问卷星或数据库。');
  });
}
