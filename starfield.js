const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let shootingStars = [];
let w, h;

function initStars() {
  stars = [];
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  for (let i = 0; i < 250; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.3 + 0.05,
      color: getStarColor(),
      twinkle: Math.random() * Math.PI * 2
    });
  }
}

function getStarColor() {
  const colors = ['#ffffff', '#ffe9c4', '#d4fbff', '#c0c0ff'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function drawStars() {
  ctx.clearRect(0, 0, w, h);

  for (let star of stars) {
    star.twinkle += 0.05;
    let brightness = 0.5 + 0.5 * Math.sin(star.twinkle); // 0 to 1
    ctx.fillStyle = hexWithAlpha(star.color, brightness);
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    star.y += star.speed;
    if (star.y > h) {
      star.y = 0;
      star.x = Math.random() * w;
    }
  }
}

function hexWithAlpha(hex, alpha) {
  let r = parseInt(hex.substr(1, 2), 16);
  let g = parseInt(hex.substr(3, 2), 16);
  let b = parseInt(hex.substr(5, 2), 16);
  return `rgba(${r},${g},${b},${alpha.toFixed(2)})`;
}

function createShootingStar() {
  shootingStars.push({
    x: Math.random() * w,
    y: Math.random() * h * 0.5,
    length: Math.random() * 80 + 50,
    speed: Math.random() * 10 + 6,
    size: Math.random() * 1 + 0.5
  });
}

function drawShootingStars() {
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    ctx.strokeStyle = 'white';
    ctx.lineWidth = s.size;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.length, s.y + s.length * 0.5);
    ctx.stroke();

    s.x += s.speed * -1;
    s.y += s.speed * 0.5;

    if (s.x < -s.length || s.y > h + s.length) {
      shootingStars.splice(i, 1);
    }
  }
}

function animate() {
  drawStars();
  drawShootingStars();

  if (Math.random() < 0.01) {
    createShootingStar();
  }

  requestAnimationFrame(animate);
}

window.addEventListener('resize', initStars);
initStars();
animate();
