const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let w, h;

function initStars() {
  stars = [];
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1
    });
  }
}

function animateStars() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#fff';
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > h) {
      star.y = 0;
      star.x = Math.random() * w;
    }
  }
  requestAnimationFrame(animateStars);
}

window.addEventListener('resize', initStars);
initStars();
animateStars();
