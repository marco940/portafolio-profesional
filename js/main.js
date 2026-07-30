const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a')];

window.addEventListener('scroll', () => {
  let current = 'inicio';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

// Fondo de partículas conectado, sin librerías externas
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

function createParticles() {
  const amount = Math.min(95, Math.floor(innerWidth / 14));
  particles = Array.from({ length: amount }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - .5) * .28,
    vy: (Math.random() - .5) * .28,
    r: Math.random() * 1.8 + .5
  }));
}

function animateParticles() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > innerHeight) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(70, 150, 255, .72)';
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 125) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(47, 123, 255, ${0.16 * (1 - dist / 125)})`;
        ctx.lineWidth = .8;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(animateParticles);
}

resizeCanvas();
createParticles();
animateParticles();
addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});
