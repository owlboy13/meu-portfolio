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

// ===== SPACE GAME =====
const openBtn = document.getElementById('openGameBtn');
const closeBtn = document.getElementById('close-game-btn');
const overlay = document.getElementById('game-overlay');
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let game = null;

function startGame() {
  overlay.classList.add('active');
  if (game) game.destroy();
  game = new SpaceGame();
}
function closeGame() {
  overlay.classList.remove('active');
  if (game) { game.destroy(); game = null; }
}

openBtn.addEventListener('click', startGame);
closeBtn.addEventListener('click', closeGame);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('active')) closeGame(); });

class SpaceGame {
  constructor() {
    // Redimensiona o canvas para caber em mobile
    const maxW = Math.min(600, window.innerWidth - 32);
    this.scale = maxW / 600;
    canvas.width = 600; canvas.height = 440;
    canvas.style.width = maxW + 'px';
    canvas.style.height = Math.round(440 * this.scale) + 'px';

    this.W = 600; this.H = 440;
    this.score = 0; this.lives = 3; this.wave = 1; this.paused = false; this.over = false;
    this.player = { x: this.W/2, y: this.H - 50, w: 30, h: 20, speed: 5 };
    this.bullets = []; this.enemies = []; this.particles = []; this.stars = [];
    this.keys = {};
    this.touch = { left: false, right: false, fire: false };
    this.shootCooldown = 0;
    this.msgEl = document.getElementById('game-msg');
    this.intro = true;

    // Estrelas
    for (let i = 0; i < 80; i++) this.stars.push({
      x: Math.random()*this.W, y: Math.random()*this.H,
      r: Math.random()*1.5+.3, speed: Math.random()*.8+.2, opacity: Math.random()*.6+.2
    });

    this.spawnWave();

    // Teclado
    this.keyDown = e => {
      this.keys[e.code] = true;
      if (e.code === 'KeyP') this.paused = !this.paused;
      if (/Space|Arrow/.test(e.code)) e.preventDefault();
    };
    this.keyUp = e => { this.keys[e.code] = false; };
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);

    // Botões touch (◀ 🚀 ▶)
    this._bindTouch('btn-left',  () => this.touch.left  = true,  () => this.touch.left  = false);
    this._bindTouch('btn-right', () => this.touch.right = true,  () => this.touch.right = false);
    this._bindTouch('btn-fire',  () => this.touch.fire  = true,  () => this.touch.fire  = false);

    // Swipe direto no canvas (metade esq = esquerda, metade dir = direita)
    this._canvasTouch = e => {
      e.preventDefault();
      if (!e.touches.length) return;
      const rect = canvas.getBoundingClientRect();
      const tx = (e.touches[0].clientX - rect.left) / this.scale;
      if (tx < this.W / 2) { this.touch.left = true;  this.touch.right = false; }
      else                  { this.touch.right = true; this.touch.left  = false; }
    };
    this._canvasTouchEnd = () => { this.touch.left = false; this.touch.right = false; };
    canvas.addEventListener('touchstart', this._canvasTouch, { passive: false });
    canvas.addEventListener('touchmove',  this._canvasTouch, { passive: false });
    canvas.addEventListener('touchend',   this._canvasTouchEnd);

    this.raf = requestAnimationFrame(() => this.loop());
  }

  // Helper: bind touchstart/end + fallback mouse nos botões virtuais
  _bindTouch(id, onStart, onEnd) {
    const el = document.getElementById(id);
    if (!el) return;
    const start = e => { e.preventDefault(); onStart(); el.classList.add('pressed'); };
    const end   = e => { e.preventDefault(); onEnd();   el.classList.remove('pressed'); };
    el.addEventListener('touchstart',  start, { passive: false });
    el.addEventListener('touchend',    end,   { passive: false });
    el.addEventListener('touchcancel', end,   { passive: false });
    el.addEventListener('mousedown',   start);
    el.addEventListener('mouseup',     end);
    el.addEventListener('mouseleave',  end);
  }

  destroy() {
    document.removeEventListener('keydown', this.keyDown);
    document.removeEventListener('keyup',   this.keyUp);
    canvas.removeEventListener('touchstart', this._canvasTouch);
    canvas.removeEventListener('touchmove',  this._canvasTouch);
    canvas.removeEventListener('touchend',   this._canvasTouchEnd);
    cancelAnimationFrame(this.raf);
  }

  spawnWave() {
    this.enemies = [];
    const cols = Math.min(8, 5 + this.wave), rows = Math.min(4, 2 + Math.floor(this.wave/2));
    const ex = (this.W - cols*52) / 2;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const tier = r < 1 ? 2 : r < 2 ? 1 : 0;
      this.enemies.push({ x: ex + c*52, y: 40 + r*40, w: 28, h: 18, tier,
        dir: 1, speed: .4 + this.wave*.12, dropAmount: 0, hp: tier+1 });
    }
    this.enemyBullets = [];
    this.enemyShootTimer = 0;
  }

  loop() {
    if (!this.over && !this.paused) this.update();
    this.draw();
    this.raf = requestAnimationFrame(() => this.loop());
  }

  update() {
    this.shootCooldown = Math.max(0, this.shootCooldown - 1);
    const p = this.player;

    // Aguardando espaço para sair da intro
    if (this.intro) {
      if (this.keys['Space'] || this.touch.fire) {
        this.intro = false;
        this.shootCooldown = 30; // evita atirar imediatamente ao sair da intro
      }
      return;
    }

    // Movimento — teclado OU touch
    if ((this.keys['ArrowLeft']  || this.keys['KeyA'] || this.touch.left)  && p.x > p.w/2)          p.x -= p.speed;
    if ((this.keys['ArrowRight'] || this.keys['KeyD'] || this.touch.right) && p.x < this.W - p.w/2) p.x += p.speed;

    // Tiro — mantém atirando enquanto o botão estiver pressionado
    if ((this.keys['Space'] || this.keys['ArrowUp'] || this.touch.fire) && this.shootCooldown === 0) {
      this.bullets.push({ x: p.x, y: p.y - p.h/2, w: 3, h: 10, speed: 9 });
      this.shootCooldown = 14;
    }

    this.bullets = this.bullets.filter(b => b.y > -10);
    this.bullets.forEach(b => b.y -= b.speed);
    this.stars.forEach(s => { s.y += s.speed; if (s.y > this.H) s.y = 0; });

    let hitEdge = false;
    this.enemies.forEach(e => { e.x += e.speed * e.dir; if (e.x > this.W-20 || e.x < 10) hitEdge = true; });
    if (hitEdge) { this.enemies.forEach(e => { e.dir *= -1; e.y += 16; }); }

    this.enemyShootTimer++;
    const interval = Math.max(30, 90 - this.wave*8);
    if (this.enemyShootTimer >= interval && this.enemies.length) {
      const shooter = this.enemies[Math.floor(Math.random()*this.enemies.length)];
      this.enemyBullets.push({ x: shooter.x + shooter.w/2, y: shooter.y + shooter.h, w: 3, h: 8, speed: 3+this.wave*.3 });
      this.enemyShootTimer = 0;
    }
    this.enemyBullets = this.enemyBullets.filter(b => b.y < this.H+10);
    this.enemyBullets.forEach(b => b.y += b.speed);

    this.bullets.forEach(b => {
      this.enemies.forEach(e => {
        if (!e.dead && b.x > e.x && b.x < e.x+e.w && b.y > e.y && b.y < e.y+e.h) {
          e.hp--; b.y = -999;
          if (e.hp <= 0) { e.dead = true; this.score += (e.tier+1)*10; this.spawnParticles(e.x+e.w/2, e.y+e.h/2, e.tier===2?'#ffaa00':e.tier===1?'#00aaff':'#00ff88'); }
        }
      });
    });
    this.enemies = this.enemies.filter(e => !e.dead);

    this.enemyBullets.forEach(b => {
      if (b.x > p.x-p.w/2 && b.x < p.x+p.w/2 && b.y > p.y-p.h/2 && b.y < p.y+p.h/2) {
        b.y = 9999; this.lives--;
        this.spawnParticles(p.x, p.y, '#ff4444');
        if (this.lives <= 0) this.gameOver();
      }
    });

    this.enemies.forEach(e => { if (e.y + e.h > this.H - 40) { this.lives = 0; this.gameOver(); } });
    this.particles = this.particles.filter(p => p.life > 0);
    this.particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.life--; p.vy += .08; });

    if (this.enemies.length === 0) { this.wave++; this.spawnWave(); showToast(`🚀 Fase ${this.wave}! Cada vez mais difícil...`); }

    document.getElementById('score-display').textContent = this.score;
    document.getElementById('lives-display').textContent = this.lives;
    document.getElementById('wave-display').textContent = this.wave;
  }

  spawnParticles(x, y, color) {
    for (let i = 0; i < 10; i++) this.particles.push({
      x, y, vx: (Math.random()-.5)*4, vy: (Math.random()-.5)*4,
      life: 30+Math.random()*20, color, r: Math.random()*3+1
    });
  }

  gameOver() {
    this.over = true;
    this.msgEl.innerHTML = `<span style="color:var(--red)">GAME OVER</span> — score: <span style="color:var(--green)">${this.score}</span> &nbsp; <button onclick="startGame()" style="font-family:var(--mono);font-size:.75rem;background:transparent;border:1px solid var(--green);color:var(--green);padding:4px 12px;border-radius:4px;cursor:pointer;margin-left:8px">[ reiniciar ]</button>`;
  }

  restart() { if (game) game.destroy(); game = new SpaceGame(); }

  draw() {
    ctx.fillStyle = '#060a0f'; ctx.fillRect(0,0,this.W,this.H);
    ctx.strokeStyle = 'rgba(0,255,136,0.03)'; ctx.lineWidth = 1;
    for (let x = 0; x < this.W; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,this.H); ctx.stroke(); }
    for (let y = 0; y < this.H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(this.W,y); ctx.stroke(); }

    this.stars.forEach(s => { ctx.fillStyle=`rgba(255,255,255,${s.opacity})`; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill(); });

    ctx.strokeStyle = 'rgba(0,255,136,0.15)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0,this.H-30); ctx.lineTo(this.W,this.H-30); ctx.stroke();

    this.particles.forEach(p => { ctx.globalAlpha = p.life/50; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); });
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#00ff88'; ctx.shadowColor = '#00ff88'; ctx.shadowBlur = 8;
    this.bullets.forEach(b => { ctx.fillRect(b.x-b.w/2, b.y, b.w, b.h); });
    ctx.fillStyle = '#ff4444'; ctx.shadowColor = '#ff4444';
    this.enemyBullets.forEach(b => { ctx.fillRect(b.x-b.w/2, b.y, b.w, b.h); });
    ctx.shadowBlur = 0;

    this.enemies.forEach(e => {
      const colors = ['#00ff88','#00aaff','#ffaa00'];
      ctx.fillStyle = colors[e.tier]; ctx.shadowColor = colors[e.tier]; ctx.shadowBlur = 6;
      ctx.fillRect(e.x+4, e.y+4, e.w-8, e.h-6);
      ctx.fillRect(e.x, e.y+8, 6, e.h-12); ctx.fillRect(e.x+e.w-6, e.y+8, 6, e.h-12);
      ctx.fillStyle='#000'; ctx.fillRect(e.x+7,e.y+6,3,3); ctx.fillRect(e.x+e.w-10,e.y+6,3,3);
      ctx.shadowBlur = 0;
    });

    const p = this.player;
    ctx.shadowColor = '#00ff88'; ctx.shadowBlur = 12; ctx.fillStyle = '#00ff88';
    ctx.beginPath(); ctx.moveTo(p.x,p.y-p.h/2); ctx.lineTo(p.x+p.w/2,p.y+p.h/2); ctx.lineTo(p.x-p.w/2,p.y+p.h/2); ctx.closePath(); ctx.fill();
    ctx.fillRect(p.x-p.w/2-8, p.y+2, 10, 6); ctx.fillRect(p.x+p.w/2-2, p.y+2, 10, 6);
    ctx.fillStyle = '#ffaa00'; ctx.shadowColor = '#ffaa00';
    ctx.fillRect(p.x-4, p.y+p.h/2, 8, 4);
    ctx.shadowBlur = 0;

    if (this.paused && !this.over) {
      ctx.fillStyle = 'rgba(6,10,15,.7)'; ctx.fillRect(0,0,this.W,this.H);
      ctx.fillStyle = '#00ff88'; ctx.font = "bold 24px 'Share Tech Mono'"; ctx.textAlign = 'center';
      ctx.fillText('PAUSADO', this.W/2, this.H/2);
      ctx.font = "14px 'Share Tech Mono'"; ctx.fillStyle = '#6a8aa0';
      ctx.fillText('toque em 🚀 para continuar', this.W/2, this.H/2+32); ctx.textAlign = 'left';
    }

    // Tela de abertura
    if (this.intro) {
      ctx.fillStyle = 'rgba(6,10,15,0.92)';
      ctx.fillRect(0, 0, this.W, this.H);

      // Linha de comentário verde
      ctx.font = "14px 'Share Tech Mono'";
      ctx.fillStyle = '#3a5570';
      ctx.textAlign = 'center';
      ctx.fillText('// além de resolver problemas, também os crio', this.W/2, this.H/2 - 48);

      // Texto principal
      ctx.font = "bold 15px 'Share Tech Mono'";
      ctx.fillStyle = '#c8d8e8';
      ctx.fillText('Desenvolver é construir algo do zero —', this.W/2, this.H/2 - 14);
      ctx.fillText('esse jogo é prova disso.', this.W/2, this.H/2 + 10);

      // Botão piscar
      if (Math.floor(Date.now() / 500) % 2 === 0) {
        ctx.font = "13px 'Share Tech Mono'";
        ctx.fillStyle = '#00ff88';
        ctx.fillText('[ pressione ESPAÇO para começar ]', this.W/2, this.H/2 + 52);
      }

      ctx.textAlign = 'left';
    }
  }
}

window._game = { restart: () => startGame() };
document.getElementById('game-msg').innerHTML = '';