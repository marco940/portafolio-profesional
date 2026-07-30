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


// Texto rotativo del encabezado
const roles = [
  'INGENIERO EN SISTEMAS INTELIGENTES',
  'DESARROLLADOR FULLSTACK',
  'DOCENTE DE IA Y PROGRAMACIÓN',
  'CREADOR DE SOLUCIONES TECNOLÓGICAS'
];
const typedRole = document.getElementById('typedRole');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
  if (!typedRole) return;
  const current = roles[roleIndex];
  typedRole.textContent = deleting
    ? current.slice(0, charIndex--)
    : current.slice(0, charIndex++);

  let delay = deleting ? 38 : 72;
  if (!deleting && charIndex > current.length) {
    deleting = true;
    delay = 1400;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;
    delay = 350;
  }
  setTimeout(typeRole, delay);
}
typeRole();

// Tema claro/oscuro persistente
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.body.classList.add('light-theme');

function updateThemeIcon() {
  if (!themeBtn) return;
  themeBtn.innerHTML = document.body.classList.contains('light-theme')
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}
updateThemeIcon();

themeBtn?.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  localStorage.setItem(
    'portfolio-theme',
    document.body.classList.contains('light-theme') ? 'light' : 'dark'
  );
  updateThemeIcon();
});

// Botón volver arriba
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', scrollY > 600);
});
backToTop?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

