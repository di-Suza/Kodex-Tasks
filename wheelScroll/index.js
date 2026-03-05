 const navbar = document.getElementById('navbar');
  const pill   = document.getElementById('pill');
  const bar    = document.getElementById('progressBar');
  const badge  = document.getElementById('deltaBadge');
  const deltaVal = document.getElementById('deltaVal');
  const deltaDir = document.getElementById('deltaDir');

  let badgeTimer;

  window.addEventListener('wheel', (e) => {
    const delta = Math.round(e.deltaY);

    // ── CORE LOGIC ──
    if (e.deltaY > 0) {
      // neeche ja raha → navbar hide
      navbar.classList.add('hidden');
      pill.textContent = '↓ Scrolling down';
      pill.className = 'pill down';
    } else {
      // upar ja raha → navbar show
      navbar.classList.remove('hidden');
      pill.textContent = '↑ Scrolling up';
      pill.className = 'pill up';
    }

    // live delta badge
    deltaVal.textContent = delta > 0 ? `+${delta}` : delta;
    deltaDir.textContent = delta > 0 ? 'neeche (hide)' : 'upar (show)';
    badge.classList.add('show');
    clearTimeout(badgeTimer);
    badgeTimer = setTimeout(() => badge.classList.remove('show'), 1200);
  });

  // Scroll progress bar
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    const pct = (scrolled / total) * 100;
    bar.style.width = pct + '%';

    // Always show navbar at very top
    if (scrolled < 10) {
      navbar.classList.remove('hidden');
      pill.textContent = 'Top of page';
      pill.className = 'pill up';
    }
  });