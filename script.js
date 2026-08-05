/* =========================================================
   RYŪ NO KIOKU — 竜の記憶
   script.js — l'intera coreografia dell'esperienza
   ========================================================= */

const GOOGLE_FORM = {
  actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScXjHDjyMWEHvjiISWlcFtqy3fhxTxdeSl6E84d7CZUpGrg-g/formResponse',
  nameField: 'entry.2127382413',
  messageField: 'entry.1504016097',
};

document.addEventListener('DOMContentLoaded', () => {
  // Avvia subito il caricamento dei dati personalizzati
  loadUserData();

  wireEnterButton();
  initDragonReveal();
  initScrollReveal();
  initPetals();
  initNoteForm();
  initPhotoFallback();
});

/* =========================================================
   FUNZIONE NUOVA: CARICAMENTO DINAMICO
   Legge ?u=NOME_CARTELLA dall'URL e sostituisce i contenuti.
   ========================================================= */
async function loadUserData() {
  const urlParams = new URLSearchParams(window.location.search);
  // Usa il parametro "u" (es: tuosito.com/?u=cliente1)
  const userId = urlParams.get('u');

  // Se l'URL non ha il parametro, il sito usa i contenuti di base (HTML)
  if (!userId) return;

  const userFolder = `assets/${userId}/`;

  try {
    const response = await fetch(`${userFolder}config.json`);
    if (!response.ok) throw new Error("Utente non trovato o config assente.");

    const data = await response.json();

    // 1. Sostituisce il Titolo e il Messaggio della Sezione 1
    if (data.titolo) document.getElementById('dynamic-title').innerHTML = data.titolo;
    if (data.messaggio) document.getElementById('dynamic-text').innerHTML = data.messaggio;

    // 2. Sostituisce l'Immagine Principale (Hero)
    if (data.hero_img) {
      document.getElementById('dynamic-hero').src = userFolder + data.hero_img;
    }

    // 3. Sostituisce la Galleria Fotografica (accetta un array di nomi file)
    if (data.galleria && Array.isArray(data.galleria)) {
      data.galleria.forEach((imgName, index) => {
        const imgEl = document.getElementById(`dyn-gal-${index}`);
        if (imgEl) imgEl.src = userFolder + imgName;
      });
      // Se vuoi sovrascrivere anche il titolo della galleria
      if (data.titolo_galleria) {
        document.getElementById('dynamic-gallery-title').innerHTML = data.titolo_galleria;
      }
    }

    // 4. Sostituisce la playlist di Spotify se l'utente ha gusti diversi
    if (data.spotify_iframe_url) {
      document.getElementById('dynamic-spotify').src = data.spotify_iframe_url;
      if (data.spotify_link) {
        document.getElementById('dynamic-spotify-btn').href = data.spotify_link;
      }
    }

    // 5. (Opzionale) Personalizza il saluto finale
    if (data.saluto_finale) document.getElementById('dynamic-final-thanks').innerHTML = data.saluto_finale;

  } catch (error) {
    console.warn("Uso i contenuti standard. Errore dati dinamici:", error);
    // Se fallisce, il sito non si rompe: mostra semplicemente le scritte 
    // e le immagini di default che hai inserito nell'HTML.
  }
}

/* =========================================================
   IL RESTO DEL TUO CODICE ORIGINALE
   ========================================================= */

function wireEnterButton() {
  const enterBtn = document.getElementById('enter-btn');
  if (!enterBtn) return;
  enterBtn.addEventListener('click', enterSite, { once: true });
}

function enterSite() {
  const intro = document.getElementById('intro');
  const site = document.getElementById('site');
  if (!intro || !site) return;

  intro.classList.add('dissolving');

  site.hidden = false;
  site.style.opacity = '0';
  requestAnimationFrame(() => {
    site.style.transition = 'opacity 1.8s ease';
    site.style.opacity = '1';
  });

  setTimeout(() => {
    intro.style.display = 'none';
    triggerVisibleReveals();
  }, 1700);
}

function initDragonReveal() {
  const stage = document.querySelector('#intro .dragon-stage');
  requestAnimationFrame(() => {
    if (stage) stage.classList.add('revealed');
  });

  const line1 = document.querySelector('.line-1');
  const line2 = document.querySelector('.line-2');
  const enterBtn = document.getElementById('enter-btn');

  setTimeout(() => line1 && line1.classList.add('show'), 2200);
  setTimeout(() => line2 && line2.classList.add('show'), 3200);
  setTimeout(() => enterBtn && enterBtn.classList.add('show'), 4200);
}

let revealObserver;
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .gallery-item');
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

  targets.forEach((el) => revealObserver.observe(el));
}

function triggerVisibleReveals() {
  document.querySelectorAll('.reveal, .gallery-item').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      el.classList.add('in-view');
    }
  });
}

function initPetals() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let petals = [];
  const MAX_PETALS = 30;

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  const PETAL_COLORS = ['#C9A96E', '#E8C4C4', '#DDB8B0'];

  function spawnPetal() {
    if (petals.length >= MAX_PETALS) return;
    petals.push({
      x: Math.random() * window.innerWidth,
      y: -20,
      size: 5 + Math.random() * 4,
      speedY: 0.26 + Math.random() * 0.24,
      speedX: (Math.random() - 0.5) * 0.35,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.006 + Math.random() * 0.006,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.006,
      opacity: 0.24 + Math.random() * 0.2,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    });
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.quadraticCurveTo(p.size * 0.8, -p.size * 0.2, 0, p.size);
    ctx.quadraticCurveTo(-p.size * 0.8, -p.size * 0.2, 0, -p.size);
    ctx.fill();
    ctx.restore();
  }

  let lastSpawn = 0;
  function tick(time) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if (time - lastSpawn > 1500 && petals.length < MAX_PETALS) {
      spawnPetal();
      lastSpawn = time;
    }

    petals.forEach((p) => {
      p.sway += p.swaySpeed;
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.sway) * 0.25;
      p.rotation += p.rotSpeed;
      drawPetal(p);
    });

    petals = petals.filter((p) => p.y < window.innerHeight + 30);
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function initNoteForm() {
  const form = document.getElementById('note-form');
  if (!form) return;
  const confirmation = document.getElementById('note-confirmation');
  const nameInput = document.getElementById('note-name');
  const messageInput = document.getElementById('note-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    submitToGoogleForm(nameInput.value, messageInput.value);

    form.classList.add('submitted');
    confirmation.classList.add('show');
    form.reset();
  });
}

function submitToGoogleForm(name, message) {
  if (GOOGLE_FORM.actionUrl.includes('REPLACE_WITH_YOUR_FORM_ID')) return;

  const hiddenForm = document.createElement('form');
  hiddenForm.action = GOOGLE_FORM.actionUrl;
  hiddenForm.method = 'POST';
  hiddenForm.target = 'hidden-form-target';
  hiddenForm.style.display = 'none';

  const fields = { [GOOGLE_FORM.nameField]: name, [GOOGLE_FORM.messageField]: message };
  Object.keys(fields).forEach((fieldName) => {
    const input = document.createElement('input');
    input.name = fieldName;
    input.value = fields[fieldName];
    hiddenForm.appendChild(input);
  });

  document.body.appendChild(hiddenForm);
  hiddenForm.submit();
  setTimeout(() => hiddenForm.remove(), 1000);
}

function initPhotoFallback() {
  document.querySelectorAll('.photo-hero img, .gallery-item img').forEach((img) => {
    img.addEventListener('error', () => {
      img.style.opacity = '0';
    }, { once: true });
  });
}