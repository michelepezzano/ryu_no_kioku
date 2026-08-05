# 竜の記憶 — Ryū no Kioku

Un'esperienza web one-page, pensata per essere aperta avvicinando uno
smartphone a un portachiavi NFC. Nessun framework: solo HTML, CSS e
JavaScript puro, pronta per GitHub Pages.

## Struttura del progetto

```
index.html   struttura della pagina (intro + 5 sezioni)
style.css    palette, tipografia, layout, animazioni
script.js    animazione del drago, reveal, petali, form
assets/      fotografie da inserire
```

## Cosa personalizzare prima della pubblicazione

1. **L'immagine del drago** (la più importante) — vedi la sezione
   dedicata qui sotto.

2. **Fotografie** — sostituisci i file dentro `assets/` con le tue
   immagini, mantenendo gli stessi nomi (oppure aggiornando i
   percorsi `src` in `index.html`):
   - `assets/laurea-principale.jpg` — foto grande, Sezione 1
   - `assets/momento-1.jpg` … `momento-5.jpg` — galleria, Sezione 2
   - Finché non carichi le foto reali, al loro posto resta una
     delicata sfumatura color carta: il sito resta comunque
     presentabile.

3. **Testo di ringraziamento** — modifica il paragrafo nella
   `Sezione 1` di `index.html` con un messaggio personale.

4. **Playlist Spotify** — nella `Sezione 3`, sostituisci l'URL
   dentro `src="https://open.spotify.com/embed/playlist/..."`
   con il link della tua playlist (da Spotify: Condividi →
   Incorpora playlist → copia l'URL dentro `src`). Aggiorna anche
   il link del pulsante "Ascolta su Spotify".

5. **Firma finale** — il nome "Michele Pezzano" è già impostato
   nell'ultima sezione; modificalo se necessario.

## L'immagine del drago

Il codice è pronto per mostrare una vera illustrazione: basta
salvare un file **`assets/dragon.jpg`** (o `.png`, aggiornando
l'estensione nei due punti di `index.html` dove compare
`src="assets/dragon.jpg"` — uno nell'intro, uno nella sezione
finale).

**Finché il file non è presente**, al suo posto compare
automaticamente un fallback pulito ed elegante (il carattere 龍
in caratteri giapponesi): il sito resta comunque presentabile,
ma è pensata come soluzione temporanea.

Consigli per trovarne una adatta:

- Cerca su siti di immagini gratuite e royalty-free come
  **Unsplash**, **Pixabay** o **Freepik**, con termini come
  *"japanese dragon illustration"*, *"ryu dragon ink painting"*,
  *"sumi-e dragon art"*.
- In alternativa, per un'opera d'arte storica giapponese in
  pubblico dominio (quindi liberamente utilizzabile), **Wikimedia
  Commons** ha diverse stampe tradizionali di draghi (ad esempio
  di Hokusai o di altri maestri ukiyo-e) — cerca *"dragon"* nella
  categoria arte giapponese.
- Formato consigliato: JPG, orientamento verticale o quadrato,
  almeno 800px di lato, sfondo chiaro o neutro se possibile (si
  intona meglio con la carta washi dello sfondo).
- Una volta scelta, rinominala `dragon.jpg` e mettila nella
  cartella `assets/`.

## Collegare il guestbook a Google Forms

Il form "Lascia un pensiero" è già pronto per inviare davvero i
messaggi a un Google Form — l'utente non lascia mai la pagina,
non serve alcun server proprio. Ecco come attivarlo:

1. Vai su [forms.google.com](https://forms.google.com) e crea un
   nuovo form (il titolo non conta ai fini tecnici).
2. Aggiungi **due domande**, nell'ordine che preferisci:
   - una a **risposta breve**, per il nome;
   - una a **paragrafo**, per il messaggio.
3. Clicca su **Invia** (in alto a destra) → scheda **collegamento**
   (l'icona a forma di link) → spunta **"Abbrevia URL"** non è
   necessario, copia semplicemente l'URL del form.
4. Apri l'URL copiato in una scheda del browser, poi apri gli
   **strumenti per sviluppatori** (F12 o tasto destro → Ispeziona)
   e cerca nel codice HTML gli attributi `name="entry.NUMERO"`:
   ce ne sarà uno per il campo nome e uno per il campo messaggio
   (in Chrome puoi anche cliccare col destro su ciascun campo del
   form → Ispeziona, per trovarli più in fretta).
5. Apri `script.js` e, in cima al file, compila l'oggetto
   `GOOGLE_FORM`:
   - `actionUrl` → prendi l'URL del form e sostituisci la parte
     finale `/viewform` con `/formResponse`
     (es. `.../e/1FAIpQ.../viewform` diventa
     `.../e/1FAIpQ.../formResponse`);
   - `nameField` → il valore `entry.NUMERO` trovato per il campo nome;
   - `messageField` → il valore `entry.NUMERO` trovato per il campo messaggio.
6. Salva e pubblica. Da questo momento ogni "pensiero" inviato dal
   sito comparirà nelle risposte del tuo Google Form (visibili
   anche come foglio Google Sheets, se colleghi il form a un
   nuovo foglio dalla scheda **Risposte**).

Nota: l'invio avviene "alla cieca" (per motivi tecnici di Google
Forms non è possibile leggere una conferma di ricezione dalla
pagina), quindi il sito mostra sempre il messaggio di
ringraziamento dopo l'invio. Se vuoi essere sicuro che tutto
funzioni, fai un invio di prova subito dopo la configurazione e
controlla che compaia tra le risposte del form.

## Pubblicazione su GitHub Pages

1. Crea una nuova repository su GitHub (es. `ryu-no-kioku`).
2. Carica i file `index.html`, `style.css`, `script.js` e la
   cartella `assets/` nella root della repository.
3. Vai su **Settings → Pages**.
4. In **Branch**, seleziona `main` e cartella `/ (root)`, poi
   **Save**.
5. Dopo un paio di minuti il sito sarà disponibile all'indirizzo
   `https://<tuo-utente>.github.io/ryu-no-kioku/`.

## Collegare il portachiavi NFC

Con qualunque app di scrittura NFC (es. "NFC Tools"), scrivi un
record di tipo URL puntando all'indirizzo pubblicato su GitHub
Pages. Da quel momento, avvicinare il portachiavi allo smartphone
aprirà direttamente l'esperienza.

## Note tecniche

- Il form "Lascia un pensiero" è collegato a Google Forms tramite
  un iframe nascosto (vedi la sezione dedicata sopra per
  attivarlo). Finché non lo configuri, resta comunque una UI
  raffinata che non invia nulla, esattamente come prima.
- Il drago è una normale immagine (`assets/dragon.jpg`), rivelata
  con una dissolvenza/sfocatura e un alone d'inchiostro che si
  espande alle sue spalle. Se il file manca, un fallback
  tipografico (il carattere 龍) prende il suo posto automaticamente.
- Elementi decorativi giapponesi inclusi: un fiore di ciliegio
  stilizzato come divisore tra le sezioni (sempre lo stesso motivo,
  per coerenza), un piccolo Daruma disegnato nella sezione "Lascia
  un pensiero" (a occhi vuoti, come nella tradizione, prima che si
  esprima un desiderio), un sigillo rosso (hanko) accanto alla
  firma finale, e un pattern a onde (seigaiha) molto sottile sullo
  sfondo dell'ultima sezione.
- Il sito rispetta `prefers-reduced-motion` per chi preferisce
  animazioni ridotte.
