(() => {
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer =
    window.matchMedia && window.matchMedia('(pointer: fine)').matches;

  let canvas = null;
  let ctx = null;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let theme = 'dark';
  let rafId = null;
  let isVisible = true;
  let pointerX = 0.5;

  const stars = [];
  const snow = [];
  const ribbons = [
    { baseY: 0.22, amp: 42, freq: 0.002, speed: 0.24, color: 'rgba(16, 185, 129, 0.18)', offset: 0.3 },
    { baseY: 0.31, amp: 50, freq: 0.0016, speed: -0.19, color: 'rgba(56, 189, 248, 0.19)', offset: 2.1 },
    { baseY: 0.17, amp: 34, freq: 0.0024, speed: 0.16, color: 'rgba(37, 99, 235, 0.15)', offset: 3.9 }
  ];

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function seedParticles() {
    stars.length = 0;
    snow.length = 0;

    for (let i = 0; i < 76; i++) {
      stars.push({
        x: Math.random(),
        y: rand(0.02, 0.68),
        r: rand(0.6, 1.65),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.8, 2.1)
      });
    }

    for (let i = 0; i < 54; i++) {
      const depth = rand(0.35, 1);
      snow.push({
        x: Math.random(),
        y: Math.random(),
        depth,
        r: rand(0.9, 2.2) * depth,
        vy: rand(0.0002, 0.00055) * depth,
        vx: rand(-0.00008, 0.00014) * depth,
        wobble: rand(0, Math.PI * 2),
        alpha: rand(0.18, 0.52) * depth
      });
    }
  }

  function resizeCanvas() {
    if (!canvas || !canvas.parentElement) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  function drawAuroraFrame(nowMs) {
    if (!ctx) return;
    const t = nowMs * 0.001;
    ctx.clearRect(0, 0, width, height);

    if (theme === 'dark') {
      for (const s of stars) {
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.globalAlpha = twinkle * 0.7;
        ctx.fillStyle = '#e0f2fe';
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const mx = (pointerX - 0.5) * 30;
      for (const rib of ribbons) {
        const basePx = height * rib.baseY;
        const grad = ctx.createLinearGradient(0, basePx - 95, 0, basePx + 120);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.45, rib.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, basePx + 135);
        for (let x = 0; x <= width + 48; x += 48) {
          const wave =
            Math.sin((x + mx) * rib.freq + t * rib.speed + rib.offset) * rib.amp +
            Math.cos((x - mx) * rib.freq * 1.6 - t * rib.speed * 0.7) * (rib.amp * 0.4);
          ctx.lineTo(x, basePx + wave);
        }
        ctx.lineTo(width + 48, basePx + 140);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }

    for (const p of snow) {
      if (!prefersReducedMotion) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t * 0.8 + p.wobble) * 0.0001;
        if (p.y > 1.03) {
          p.y = -0.02;
          p.x = Math.random();
        }
      }
      ctx.globalAlpha = theme === 'dark' ? p.alpha : p.alpha * 0.6;
      ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#38bdf8';
      ctx.beginPath();
      ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function loop(now) {
    if (!isVisible || document.hidden) {
      rafId = null;
      return;
    }
    drawAuroraFrame(now);
    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(loop);
    }
  }

  function setupSpotlights() {
    let activeCard = null;
    document.addEventListener(
      'pointermove',
      (e) => {
        pointerX = e.clientX / Math.max(1, window.innerWidth);
        const card = e.target && e.target.closest ? e.target.closest('.spotlight-card') : null;
        if (activeCard && activeCard !== card) {
          activeCard.style.setProperty('--spot-opacity', '0');
        }
        if (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${(e.clientX - rect.left).toFixed(1)}px`);
          card.style.setProperty('--my', `${(e.clientY - rect.top).toFixed(1)}px`);
          card.style.setProperty('--spot-opacity', '1');
        }
        activeCard = card;
      },
      { passive: true }
    );
  }

  function setupHeroTilt() {
    const stageCard = document.getElementById('hero-stage-card');
    if (!stageCard || prefersReducedMotion || !hasFinePointer) return;

    stageCard.addEventListener('pointermove', (e) => {
      const rect = stageCard.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
      const ny = (e.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
      const rotateY = nx * 5.5;
      const rotateX = -ny * 5.5;
      stageCard.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    stageCard.addEventListener('pointerleave', () => {
      stageCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  function setupScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    const update = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)) : 0;
      bar.style.width = `${pct.toFixed(2)}%`;
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function animateCounter(el) {
    if (el.dataset.animated === '1') return;
    el.dataset.animated = '1';

    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || '';
    if (prefersReducedMotion || target === 0) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const duration = 850;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${target}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  }

  function setupReveals() {
    const revealEls = Array.from(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      revealEls.forEach((el) => {
        el.classList.add('is-visible');
        el.querySelectorAll('[data-count]').forEach(animateCounter);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  window.PeakLabsFX = {
    init(canvasId = 'aurora-fx') {
      canvas = document.getElementById(canvasId);
      if (canvas) {
        ctx = canvas.getContext('2d');
        theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
        seedParticles();
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        document.addEventListener('visibilitychange', () => {
          if (!document.hidden && isVisible && !rafId) {
            rafId = requestAnimationFrame(loop);
          }
        });

        if ('IntersectionObserver' in window) {
          const obs = new IntersectionObserver((entries) => {
            isVisible = Boolean(entries[0] && entries[0].isIntersecting);
            if (isVisible && !rafId && !document.hidden) {
              rafId = requestAnimationFrame(loop);
            }
          });
          obs.observe(canvas);
        }

        if (prefersReducedMotion) {
          drawAuroraFrame(performance.now());
        } else {
          rafId = requestAnimationFrame(loop);
        }
      }

      setupSpotlights();
      setupHeroTilt();
      setupScrollProgress();
      setupReveals();
    },

    setTheme(nextTheme) {
      theme = nextTheme === 'light' ? 'light' : 'dark';
      if (prefersReducedMotion && canvas) {
        drawAuroraFrame(performance.now());
      }
    }
  };
})();
