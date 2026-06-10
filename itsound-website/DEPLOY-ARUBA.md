# Guida Deploy su Aruba.it

## 📋 Prerequisiti

1. **Account Aruba attivo** con hosting Linux
2. **Dominio itsound.it** configurato e puntato all'hosting
3. **Credenziali FTP** (username e password)
4. **lftp installato** sul tuo computer

### Installare lftp

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install lftp
```

**macOS:**
```bash
brew install lftp
```

**Windows:**
- Scarica da: https://nwgat.net/lftp-for-windows/
- Oppure usa WSL (Windows Subsystem for Linux)

## 🔧 Configurazione

### 1. Modifica deploy.sh

Apri il file `deploy.sh` e configura le credenziali FTP:

```bash
FTP_HOST="ftp.itsound.it"
FTP_USER="TUO_USERNAME_ARUBA"
FTP_PASS="TUA_PASSWORD_ARUBA"
```

**Dove trovare le credenziali:**
- Accedi al pannello Aruba: https://admin.aruba.it
- Vai su "Hosting" → "Gestione FTP"
- Copia username e password

### 2. Verifica il dominio

Assicurati che il dominio `itsound.it` sia:
- Attivo e raggiungibile
- Puntato alla directory corretta dell'hosting
- Con HTTPS abilitato (certificato SSL)

## 🚀 Deploy

### Metodo 1: Script Automatico (Consigliato)

```bash
./deploy.sh
```

Lo script:
1. Esegue il build del sito
2. Carica tutti i file via FTP
3. Mostra il progresso in tempo reale

### Metodo 2: Manuale

```bash
# 1. Build
npm run build

# 2. Upload via FTP (FileZilla o simile)
# Carica tutto il contenuto di /dist nella root del dominio
```

## 📁 Struttura File su Aruba

Dopo il deploy, la struttura sarà:

```
/
├── .htaccess          # Configurazione Apache
├── robots.txt         # SEO
├── sitemap.xml        # SEO
├── index.html         # Homepage
├── 404.html           # Pagina errore
├── artisti/
│   └── index.html
├── eventi/
│   └── index.html
├── blog/
│   └── index.html
├── contatti/
│   └── index.html
└── _astro/            # Assets (CSS, JS, immagini)
    ├── *.css
    └── *.js
```

## ⚙️ Configurazione Aruba

### Pannello di Controllo

1. **Accedi**: https://admin.aruba.it
2. **Vai su**: Hosting → Gestione
3. **Verifica**:
   - PHP version: 8.0+ (non usato ma consigliato)
   - Apache modules: mod_rewrite, mod_deflate, mod_expires
   - SSL certificate: Attivo

### .htaccess

Il file `.htaccess` è già configurato con:
- ✅ Redirect www → non-www
- ✅ Force HTTPS
- ✅ Cache static assets (1 anno per immagini, 1 mese per CSS/JS)
- ✅ Gzip compression
- ✅ Security headers
- ✅ Custom 404 page

## 🔍 Verifica Deploy

### 1. Controlla il sito

Apri nel browser:
- https://itsound.it
- https://itsound.it/artisti
- https://itsound.it/eventi
- https://itsound.it/blog
- https://itsound.it/contatti

### 2. Test Performance

Usa Google PageSpeed Insights:
- https://pagespeed.web.dev/
- Inserisci: https://itsound.it
- Obiettivo: Score 90+

### 3. Verifica SEO

Controlla:
- https://itsound.it/robots.txt
- https://itsound.it/sitemap.xml
- Meta tags nelle pagine (View Source)

## 🐛 Troubleshooting

### Problema: "403 Forbidden"

**Soluzione:**
```bash
# Verifica permessi file
chmod 644 *.html
chmod 755 */
```

### Problema: "404 Not Found"

**Soluzione:**
- Verifica che `.htaccess` sia caricato
- Controlla che `mod_rewrite` sia abilitato su Aruba
- Verifica la struttura delle directory

### Problema: CSS/JS non caricati

**Soluzione:**
- Verifica che la directory `_astro/` sia presente
- Controlla i percorsi nei file HTML
- Pulisci la cache del browser (Ctrl+Shift+R)

### Problema: Font non caricati

**Soluzione:**
- Verifica connessione internet (Google Fonts)
- Controlla Content Security Policy in `.htaccess`
- Aggiungi fallback fonts nel CSS

## 📊 Monitoraggio

### Google Analytics

1. Crea account: https://analytics.google.com
2. Aggiungi proprietà per itsound.it
3. Copia il Tracking ID (UA-XXXXXXXXX-X o G-XXXXXXXXXX)
4. Aggiungi al file `src/layouts/Layout.astro`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Google Search Console

1. Accedi: https://search.google.com/search-console
2. Aggiungi proprietà: https://itsound.it
3. Verifica dominio (DNS o file HTML)
4. Submit sitemap: https://itsound.it/sitemap.xml

## 🔄 Aggiornamenti

Per aggiornare il sito:

```bash
# 1. Modifica i contenuti
# 2. Build
npm run build

# 3. Deploy
./deploy.sh
```

## 📞 Supporto Aruba

- **Telefono**: 0575 8621 (24/7)
- **Ticket**: https://supporto.aruba.it
- **Chat**: Disponibile nel pannello di controllo

## ✅ Checklist Pre-Deploy

- [ ] Credenziali FTP configurate in `deploy.sh`
- [ ] Dominio itsound.it attivo e puntato
- [ ] Certificato SSL installato
- [ ] Build completata senza errori (`npm run build`)
- [ ] File `.htaccess` presente in `/public`
- [ ] File `robots.txt` e `sitemap.xml` presenti
- [ ] Test locale completato (`npm run preview`)

## ✅ Checklist Post-Deploy

- [ ] Homepage raggiungibile (https://itsound.it)
- [ ] Tutte le pagine funzionanti
- [ ] CSS e JS caricati correttamente
- [ ] Font Inter visualizzati
- [ ] Form contatti funzionanti
- [ ] 404 page personalizzata
- [ ] Google Analytics installato
- [ ] Search Console configurato
- [ ] Performance test superato (90+)

---

**Ultimo aggiornamento**: 10 Giugno 2026
**Versione**: 1.0.0
