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

// Modal de detalles de proyectos
const projectData = {
  ocr: {
    kicker: 'INTELIGENCIA ARTIFICIAL',
    title: 'OCR para placas y documentos',
    description: 'Aplicación de visión por computadora que procesa imágenes, mejora su legibilidad y extrae texto para reconocer placas vehiculares, documentos e identificaciones.',
    features: ['Carga y procesamiento de imágenes', 'Preprocesamiento con OpenCV', 'Reconocimiento mediante Tesseract OCR', 'Limpieza y validación del texto obtenido'],
    tags: ['Python', 'OpenCV', 'Tesseract', 'Visión artificial']
  },
  pos: {
    kicker: 'DESARROLLO WEB',
    title: 'Punto de venta para cafetería',
    description: 'Sistema web creado para administrar clientes con cuenta, registrar compras y abonos, consultar adeudos y generar estados de cuenta y tickets.',
    features: ['Perfiles de clientes', 'Compras a crédito y abonos', 'Historial y estados de cuenta', 'Reportes y tickets térmicos'],
    tags: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript']
  },
  feedback: {
    kicker: 'PLATAFORMA WEB',
    title: 'Retroalimentación anónima',
    description: 'Herramienta para que estudiantes envíen comentarios anónimos y el administrador consulte las respuestas desde un panel privado.',
    features: ['Envío anónimo', 'Panel administrativo', 'Persistencia en base de datos', 'Interfaz responsive estilo IA'],
    tags: ['PHP', 'MySQL', 'HTML', 'CSS']
  },
  robot: {
    kicker: 'ROBÓTICA',
    title: 'Robot Arduino 2WD por Bluetooth',
    description: 'Vehículo móvil construido con Arduino UNO, puente H L298N y módulo HC-05 para controlarlo inalámbricamente desde un teléfono.',
    features: ['Movimiento adelante y atrás', 'Giros izquierda y derecha', 'Control mediante Bluetooth', 'Diseño para competencia de robot fútbol'],
    tags: ['Arduino', 'C++', 'L298N', 'HC-05']
  }
};

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalKicker = document.getElementById('modalKicker');
const modalDescription = document.getElementById('modalDescription');
const modalFeatures = document.getElementById('modalFeatures');
const modalTags = document.getElementById('modalTags');

function openProjectModal(key) {
  const data = projectData[key];
  if (!data || !modal) return;
  modalTitle.textContent = data.title;
  modalKicker.textContent = data.kicker;
  modalDescription.textContent = data.description;
  modalFeatures.innerHTML = data.features.map(item => `<li>${item}</li>`).join('');
  modalTags.innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join('');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-open').forEach(button => {
  button.addEventListener('click', () => openProjectModal(button.dataset.project));
});
document.querySelectorAll('[data-close-modal]').forEach(button => {
  button.addEventListener('click', closeProjectModal);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeProjectModal();
});
