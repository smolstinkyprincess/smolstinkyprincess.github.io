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
  const versionTag = document.getElementById('latest-version-tag');
  if (versionTag) {
    fetch('https://api.github.com/repos/smolstinkyprincess/Mochibun/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.tag_name === 'string' && data.tag_name.trim()) {
          versionTag.textContent = data.tag_name.trim();
        }
      })
      .catch(() => {});
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
