(() => {
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    { baseY: 0.24, amp: 36, freq: 0.0018, speed: 0.18, color: 'rgba(16, 185, 129, 0.12)', offset: 0.4 },
    { baseY: 0.34, amp: 44, freq: 0.0014, speed: -0.15, color: 'rgba(56, 189, 248, 0.13)', offset: 2.2 },
    { baseY: 0.19, amp: 30, freq: 0.0021, speed: 0.12, color: 'rgba(37, 99, 235, 0.10)', offset: 4.1 }
  ];

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function seedParticles() {
    stars.length = 0;
    snow.length = 0;

    for (let i = 0; i < 64; i++) {
      stars.push({
        x: Math.random(),
        y: rand(0.02, 0.62),
        r: rand(0.55, 1.45),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.6, 1.7)
      });
    }

    for (let i = 0; i < 36; i++) {
      const depth = rand(0.35, 1);
      snow.push({
        x: Math.random(),
        y: Math.random(),
        depth,
        r: rand(0.8, 1.8) * depth,
        vy: rand(0.00014, 0.00038) * depth,
        vx: rand(-0.00005, 0.00009) * depth,
        wobble: rand(0, Math.PI * 2),
        alpha: rand(0.14, 0.38) * depth
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
        const twinkle = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.globalAlpha = twinkle * 0.62;
        ctx.fillStyle = '#e0f2fe';
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const mx = (pointerX - 0.5) * 24;
      for (const rib of ribbons) {
        const basePx = height * rib.baseY;
        const grad = ctx.createLinearGradient(0, basePx - 90, 0, basePx + 115);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.45, rib.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, basePx + 130);
        for (let x = 0; x <= width + 48; x += 48) {
          const wave =
            Math.sin((x + mx) * rib.freq + t * rib.speed + rib.offset) * rib.amp +
            Math.cos((x - mx) * rib.freq * 1.5 - t * rib.speed * 0.7) * (rib.amp * 0.35);
          ctx.lineTo(x, basePx + wave);
        }
        ctx.lineTo(width + 48, basePx + 135);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }

    for (const p of snow) {
      if (!prefersReducedMotion) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t * 0.7 + p.wobble) * 0.00008;
        if (p.y > 1.03) {
          p.y = -0.02;
          p.x = Math.random();
        }
      }
      ctx.globalAlpha = theme === 'dark' ? p.alpha : p.alpha * 0.5;
      ctx.fillStyle = theme === 'dark' ? '#e2f1ff' : '#38bdf8';
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

  function formatCounterValue(val, useGrouping) {
    if (!useGrouping) return String(val);
    return val.toLocaleString('en-US');
  }

  function animateCounter(el) {
    if (el.dataset.animated === '1') return;
    el.dataset.animated = '1';

    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || '';
    const useGrouping = target >= 1000;

    if (prefersReducedMotion || target === 0) {
      el.textContent = `${formatCounterValue(target, useGrouping)}${suffix}`;
      return;
    }

    const duration = 900;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      el.textContent = `${formatCounterValue(value, useGrouping)}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${formatCounterValue(target, useGrouping)}${suffix}`;
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
