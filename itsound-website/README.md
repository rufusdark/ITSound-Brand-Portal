# ITSOUND.IT Website

Sito web ufficiale di ITSOUND.IT - Piattaforma open source per la musica indipendente italiana.

## 🚀 Tecnologie

- **Astro** - Framework per siti statici moderni
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety
- **Inter Font** - Typography moderna e leggibile

## 📦 Installazione

```bash
# Installa dipendenze
npm install

# Avvia server di sviluppo
npm run dev

# Build per produzione
npm run build

# Preview build locale
npm run preview
```

## 🎨 Design System

### Colori
- **Primary**: `#DE1A1A` (Rosso)
- **Background**: `#0A0A0A` (Nero)
- **Surface**: `#1A1A1A` (Grigio scuro)
- **Text Primary**: `#FFFFFF` (Bianco)
- **Text Secondary**: `#E0E0E0` (Grigio chiaro)
- **Text Muted**: `#808080` (Grigio medio)

### Typography
- **Font**: Inter (Google Fonts)
- **H1**: 96px Bold
- **H2**: 24px Regular (tracking 0.5em)
- **H3**: 48px Bold
- **Body**: 18px Regular

### Spacing
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

## 📄 Pagine

- **Home** (`/`) - Hero, artisti in evidenza, eventi, blog
- **Artisti** (`/artisti`) - Lista artisti con filtri e ricerca
- **Eventi** (`/eventi`) - Calendario eventi con mappa
- **Blog** (`/blog`) - Articoli, guide, interviste
- **Contatti** (`/contatti`) - Form contatto e informazioni

## 🌐 Deploy su Aruba.it

### Prerequisiti
- Account Aruba con hosting Linux
- Accesso FTP
- Dominio itsound.it configurato

### Procedura

1. **Build del sito**
```bash
npm run build
```

2. **Upload via FTP**
```bash
# Usa FileZilla o comando ftp
# Carica tutto il contenuto di /dist nella root del dominio
```

3. **Configurazione .htaccess** (opzionale)
Crea un file `.htaccess` nella root:
```apache
RewriteEngine On
RewriteBase /

# Redirect www to non-www
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE application/xml
</IfModule>
```

### Script Deploy Automatico

Crea un file `deploy.sh`:
```bash
#!/bin/bash

# Build
npm run build

# Upload via FTP (configura le credenziali)
lftp -c "
set ftp:ssl-allow no
open -u USERNAME,PASSWORD ftp.itsound.it
mirror -R dist/ /
bye
"
```

Rendi eseguibile:
```bash
chmod +x deploy.sh
```

Esegui:
```bash
./deploy.sh
```

## 🔧 Configurazione

### Environment Variables
Crea un file `.env` nella root:
```env
PUBLIC_SITE_URL=https://itsound.it
PUBLIC_GA_ID=UA-XXXXXXXXX-X
```

### SEO
Modifica i meta tags in `src/layouts/Layout.astro`:
- Title
- Description
- Open Graph tags
- Twitter Card tags

## 📝 Contenuti

### Aggiungere Artisti
Modifica `src/pages/artisti.astro` e aggiungi oggetti all'array `artists`:
```javascript
{
  name: 'Nome Artista',
  genre: 'Genere · Sottogenere',
  city: 'Città'
}
```

### Aggiungere Eventi
Modifica `src/pages/eventi.astro` e aggiungi oggetti all'array `events`:
```javascript
{
  date: '15',
  month: 'GIU',
  title: 'Nome Evento',
  location: 'Città, Italia',
  time: '23:00',
  genre: 'Genere',
  artists: ['Artista 1', 'Artista 2']
}
```

### Aggiungere Articoli Blog
Modifica `src/pages/blog.astro` e aggiungi oggetti all'array `posts`:
```javascript
{
  title: 'Titolo Articolo',
  excerpt: 'Breve descrizione',
  date: '10 Giugno 2026',
  category: 'Guide',
  readTime: '8 min'
}
```

## 🎯 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **PageSpeed**: < 1s First Contentful Paint
- **Bundle Size**: < 100KB (HTML + CSS + JS)

## 🤝 Contribuire

1. Fork del repository
2. Crea un branch (`git checkout -b feature/nuova-funzionalita`)
3. Commit delle modifiche (`git commit -m 'Aggiunta nuova funzionalità'`)
4. Push al branch (`git push origin feature/nuova-funzionalita`)
5. Apri una Pull Request

## 📄 Licenza

MIT License - Vedi file [LICENSE](LICENSE)

## 🔗 Link

- **Sito**: https://itsound.it
- **GitHub**: https://github.com/itsound
- **Instagram**: https://instagram.com/itsound
- **Discord**: https://discord.gg/itsound

---

**Made with ❤️ by ITSOUND Community**
