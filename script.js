// ===== TYPED EFFECT =====
const phrases = ['Software Developer', 'Automação & RPA ', 'Django + Python ', 'Indie SaaS Builder '];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typed-text');
function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    el.innerHTML = phrase.slice(0, ci + 1) + '<span class="typed-cursor">|</span>';
    ci++;
    if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    el.innerHTML = phrase.slice(0, ci - 1) + '<span class="typed-cursor">|</span>';
    ci--;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 60 : 90);
}
type();

// ===== NAV =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open'); navLinks.classList.remove('open');
}));

// Nav active + scroll shrink
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  sections.forEach(s => {
    const top = s.offsetTop - 80, h = s.offsetHeight, id = s.id;
    const link = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + h);
  });
});

// ===== FADE IN =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== SKILL BARS =====
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const sg = document.getElementById('skills-grid');
if (sg) skillObs.observe(sg);

// ===== TOAST =====
function showToast(msg) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span>${msg}</span><button class="toast-close">&times;</button>`;
  document.body.appendChild(t);
  t.querySelector('.toast-close').onclick = () => t.remove();
  setTimeout(() => t.remove(), 4500);
}

// ===== EASTER EGG =====
let owlSeq = [];
document.addEventListener('keydown', e => {
  owlSeq.push(e.code);
  if (owlSeq.length > 3) owlSeq.shift();
  if (JSON.stringify(owlSeq) === JSON.stringify(['KeyO','KeyW','KeyL'])) {
    showToast('🦉 Modo Coruja Ativado! A sabedoria noturna guia meus commits.');
    owlSeq = [];
    for (let i = 0; i < 6; i++) {
      const o = document.createElement('div');
      o.textContent = '🦉';
      const sx = Math.random() * window.innerWidth;
      Object.assign(o.style, {
        position:'fixed', left:sx+'px', bottom:'0',
        fontSize:'1.8rem', zIndex:'9998', pointerEvents:'none',
        transition:`transform ${3+Math.random()*2}s linear, opacity ${3+Math.random()*2}s ease`,
        transform:'translateY(0)', opacity:'1'
      });
      document.body.appendChild(o);
      requestAnimationFrame(() => {
        o.style.transform = `translateY(-${window.innerHeight+100}px) rotate(${Math.random()*360}deg)`;
        o.style.opacity = '0';
      });
      setTimeout(() => o.remove(), 5000);
    }
  }
});

