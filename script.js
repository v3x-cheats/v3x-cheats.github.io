/* ===== PARTICLES ===== */
(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((w * h) / 18000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); createParticles(); });
  resize();
  createParticles();
  draw();
})();

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ===== TERMINAL TYPING ===== */
(function () {
  const lines = [
    { text: '$ v3x --init', type: 'default' },
    { text: '[+] Initializing V3X Cheats v3.2.1...', type: 'info' },
    { text: '[+] Targeting: Fallen Survival', type: 'info' },
    { text: '[+] Loading kernel driver...', type: 'info' },
    { text: '[~] Driver loaded successfully', type: 'success' },
    { text: '[+] Injecting into game process...', type: 'info' },
    { text: '[~] Attached to process (PID: 8472)', type: 'success' },
    { text: '[+] Loading modules:', type: 'info' },
    { text: '    |-- Silent Aim ......... OK', type: 'success' },
    { text: '    |-- Manipulation ....... OK', type: 'success' },
    { text: '    |-- Hitscan ............ OK', type: 'success' },
    { text: '    |-- Noclip ............. OK', type: 'success' },
    { text: '[~] All modules online. GG.', type: 'success' },
    { text: '', type: 'default' },
    { text: '[~] Ready. Press INSERT to open menu.', type: 'success' },
  ];

  const body = document.getElementById('terminal-body');
  body.innerHTML = '';

  let i = 0;

  function addLine() {
    if (i >= lines.length) return;
    const line = lines[i];
    const el = document.createElement('div');
    el.className = 'term-line';
    el.style.animationDelay = '0s';

    const typeClass = line.type === 'success' ? 'term-success'
      : line.type === 'warning' ? 'term-warning'
      : line.type === 'info' ? 'term-info' : '';

    el.innerHTML = typeClass
      ? `<span class="${typeClass}">${escapeHtml(line.text)}</span>`
      : escapeHtml(line.text);

    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    i++;
    setTimeout(addLine, 180 + Math.random() * 150);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Start after a short delay
  setTimeout(addLine, 800);
})();

/* ===== COUNT-UP ANIMATION ===== */
function animateCountUp(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }

  requestAnimationFrame(update);
}

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Count-up for stat numbers
        entry.target.querySelectorAll('[data-target]').forEach(animateCountUp);

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.feature-card, .stat-card, .yt-player').forEach((el) => {
  revealObserver.observe(el);
});

// Hero stat counters
const heroStatObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.hero-stat-num[data-target]').forEach(animateCountUp);
        heroStatObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const heroStatsRow = document.querySelector('.hero-stats-row');
if (heroStatsRow) heroStatObserver.observe(heroStatsRow);

/* ===== FEATURE CARD MOUSE GLOW ===== */
document.querySelectorAll('.feature-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
  });
});

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach((el) => el.classList.remove('active'));

    // Open clicked (if not already open)
    if (!isActive) item.classList.add('active');
  });
});

/* ===== SMOOTH SCROLL FOR NAV LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===== DOWNLOAD CONFIG ===== */
// Paste your GitHub raw link here:
const DOWNLOAD_URL = 'https://raw.githubusercontent.com/v3x-cheats/v3x-cheats.github.io/refs/heads/main/V3X-CLIENT-V3.2.1.zip';

/* ===== DOWNLOAD HANDLER ===== */
const downloadBtn = document.getElementById('download-btn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const originalHTML = downloadBtn.innerHTML;
    downloadBtn.style.pointerEvents = 'none';

    downloadBtn.innerHTML = `<svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Preparing download...`;

    setTimeout(() => {
      downloadBtn.innerHTML = `<svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Connecting to server...`;
    }, 1200);

    setTimeout(() => {
      downloadBtn.innerHTML = `<svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Fetching latest build...`;
    }, 2500);

    setTimeout(() => {
      // Trigger the real download
      const a = document.createElement('a');
      a.href = DOWNLOAD_URL;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      downloadBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Download started!`;
      downloadBtn.style.pointerEvents = 'auto';

      setTimeout(() => {
        downloadBtn.innerHTML = originalHTML;
      }, 3000);
    }, 4000);
  });
}
