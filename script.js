(() => {
  // footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // a random cozy fortune for each visit
  const fortunes = [
    'a nap is in your near future 💤',
    'someone thinks your flip phone is cute 📱',
    'a warm drink will find you soon 🧋',
    'today is good for tiny wins ✨',
    'your next commit will compile first try 🍀',
    'a soft blanket is thinking of you ☁️',
    'snacks are on the horizon 🍪',
    'you are doing better than you think ♡',
  ];
  document.getElementById('fortune').textContent =
    fortunes[Math.floor(Math.random() * fortunes.length)];

  // latest Mochibun release tag (static text in the HTML stays as the fallback)
  const versionTags = document.querySelectorAll('[data-latest-version]');
  if (versionTags.length) {
    fetch('https://api.github.com/repos/smolstinkyprincess/Mochibun/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.tag_name === 'string' && data.tag_name.trim()) {
          const tag = data.tag_name.trim();
          versionTags.forEach((el) => { el.textContent = tag; });
        }
      })
      .catch(() => {});
  }

  // gentle scroll depth for the background clouds (each drifts at its own pace, wrapping around)
  const skyClouds = [...document.querySelectorAll('.sky-cloud')];
  if (skyClouds.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    const drift = () => {
      const range = window.innerHeight + 200;
      skyClouds.forEach((cloud) => {
        const shift = (window.scrollY * Number(cloud.dataset.speed)) % range;
        // once a cloud floats off the top, it re-enters from the bottom
        const y = cloud.offsetTop - shift < -150 ? range - shift : -shift;
        cloud.style.transform = `translateY(${y}px)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(drift); }
    }, { passive: true });
    drift();
  }

  // tap a screenshot to see it bigger
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const big = lightbox.querySelector('img');
    document.querySelectorAll('.shot').forEach((shot) => {
      shot.addEventListener('click', () => {
        const img = shot.querySelector('img');
        big.src = img.src;
        big.alt = img.alt;
        lightbox.showModal();
      });
    });
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
    // clicking the backdrop closes it too
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });
  }

  // back-to-top cloud
  const btn = document.querySelector('.to-top');
  const onScroll = () => btn.classList.toggle('is-visible', window.scrollY > 400);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
})();
