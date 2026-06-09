# ITSound — Fix Sito WordPress
## Cose da sistemare SUBITO nel backend

---

### 1. PREZZI SHOP (problema critico!)
I servizi sono a **0,00€** — blocca gli acquisti e sembra poco professionale.

**Soluzione:** Entra in WordPress > WooCommerce > Prodotti
Per ogni prodotto:
- Prezzo regolare: lascia vuoto (se vuoi preventivo personalizzato)
- Oppure usa "Prezzo: 0,00€" con messaggio "Richiedi preventivo"
- Scarica plugin **"Request a Quote" per WooCommerce** (ce ne sono gratis)

**Lista prodotti da sistemare:**
1. ~~ Mixing & Mastering ~~
2. ~~ Ghost Production ~~
3. ~~ Track Placement ~~
4. ~~ Track Promotion ~~
5. ~~ Gestione Social Network ~~
6. ~~ Graphic Design ~~
7. ~~ Singer Finder ~~
8. ~~ Web Design Musicale ~~
9. ~~ Consulting ~~

> **Consiglio:** Metti un prezzo fisso per servizi base (es. Mixing da 50€) e "Richiedi preventivo" per servizi complessi.

---

### 2. LINK ROTTI NEL FOOTER
Il footer ha link che puntano a `rawtracks.qodeinteractive.com` (il tema demo) invece che a ITSound.

**Cosa fare:**
- Vai a Aspetto > Widget > Footer Widget
- Trova i link con `rawtracks.qodeinteractive.com`
- Sostituisci con URL di ITSound o rimuovi

**Link da sistemare:**
- Tutti i testi "We collaborate..." e "Let's build..." nel footer
- I link del carousel/marquee in home page

---

### 3. TWITTER LINK
Il footer ha link a Twitter (#). Se non lo usate, **toglietelo**.

**Cosa fare:**
- Vai a Aspetto > Widget > Footer
- Trova l'icona Twitter e rimuovila

---

### 4. SEO BASE (plugin Yoast o RankMath)
Se non hai un plugin SEO, installa **RankMath** (gratis).

**Per ogni pagina, imposta:**
| Pagina | Title | Meta Description |
|--------|-------|-----------------|
| Home | ITSound — Record Label & Music Services | ITSound è una record label di Martina Franca. Collaboriamo con DJ e producer. Mixing, mastering, ghost production e promozione musicale. |
| About | Chi Siamo — ITSound | Scopri la storia di ITSound, record label pugliese. Marco Carbotti e Andrea Maggi ti raccontano il progetto. |
| Artist | Artisti — ITSound | I talenti della nostra label. Marco Carbotti e altri artisti in arrivo. |
| Shop | Servizi Musicali — ITSound Mixing, Mastering, Ghost Production | Produzione musicale, mixing, mastering, ghost production, promozione. Tutti i servizi per artisti e DJ. |
| Contact | Contatti — ITSound | Contatta ITSound. Demo submission, collaborazioni, informazioni. |

---

### 5. AGGIUNGERE LINGUA ITALIANA
Il sito è 100% in inglese ma il target è locale.

**Opzioni:**
- **Opzione A (consigliata):** Plugin **Polylang** (gratis) o **WPML** (a pagamento)
- **Opzione B (veloce):** Riscrivi le pagine principali in italiano, lascia l'inglese per la sezione artisti internazionali

> **Soluzione rapida per ora:** Almeno la Home e About in italiano.

---

### 6. PAGINA DEMO SUBMISSION
Mancano un form e una pagina dedicata per l'invio demo.

**Plugin consigliati (gratis):**
- **WPForms Lite** — form semplice drag&drop
- **Fluent Forms** — alternativo

**Campi del form:**
1. Nome e cognome *
2. Email *
3. Nome d'arte
4. Genere musicale (menu a tendina: Techno / House / Elettronica / Pop / Rap / Altro)
5. Link alla tua musica (SoundCloud / YouTube / Spotify)
6. Messaggio / Bio
7. Allega file (mp3/wav) — max 10MB

---

### 7. GOOGLE MY BUSINESS (fondamentale!)
Fatevi trovare su Google Maps come "ITSound" a Martina Franca.

**Cosa fare:**
1. Vai su google.com/business
2. Crea profilo con nome, indirizzo, telefono, sito
3. Categoria: "Record Label" o "Music Producer"
4. Aggiungi foto del logo, studio, location
5. Metti orari e contatti

> Questo vi farà comparire nelle ricerche locali "record label Martina Franca"

### 8. CHECKLIST FINALE
- [ ] Prezzi shop sistemati
- [ ] Link rawtracks rimossi
- [ ] Twitter rimosso
- [ ] SEO impostato (RankMath/Yoast)
- [ ] Italiano aggiunto (anche parziale)
- [ ] Form demo creato
- [ ] Google My Business attivo
- [ ] Titolo sito impostato: "ITSound — Record Label & Music Services"
- [ ] Favicon aggiunta
