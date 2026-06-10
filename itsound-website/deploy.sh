#!/bin/bash

# ITSOUND.IT Deploy Script per Aruba.it
# Configurare le variabili prima dell'uso

# ========================================
# CONFIGURAZIONE
# ========================================
FTP_HOST="ftp.itsound.it"
FTP_USER="TUO_USERNAME"
FTP_PASS="TUA_PASSWORD"
REMOTE_DIR="/"
LOCAL_DIR="./dist"

# ========================================
# CONTROLLO PREREQUISITI
# ========================================
echo "🚀 ITSOUND.IT Deploy Script"
echo "============================"
echo ""

# Controlla se lftp è installato
if ! command -v lftp &> /dev/null; then
    echo "❌ Errore: lftp non è installato"
    echo "   Installa con: sudo apt-get install lftp (Linux) o brew install lftp (macOS)"
    exit 1
fi

# Controlla se la directory dist esiste
if [ ! -d "$LOCAL_DIR" ]; then
    echo "⚠️  Directory dist non trovata. Eseguo build..."
    npm run build
fi

# ========================================
# BUILD
# ========================================
echo "📦 Build del sito..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Errore durante la build"
    exit 1
fi

echo "✅ Build completata"
echo ""

# ========================================
# DEPLOY
# ========================================
echo "🌐 Deploy su Aruba..."
echo "   Host: $FTP_HOST"
echo "   Directory: $REMOTE_DIR"
echo ""

lftp -c "
set ftp:ssl-allow no
set net:max-retries 2
set net:timeout 10

open -u $FTP_USER,$FTP_PASS $FTP_HOST

# Upload directory dist
mirror -R \
  --verbose \
  --exclude-glob .git* \
  --exclude-glob .DS_Store \
  --exclude-glob node_modules \
  $LOCAL_DIR/ $REMOTE_DIR

bye
"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deploy completato con successo!"
    echo "   Sito: https://itsound.it"
    echo ""
else
    echo ""
    echo "❌ Errore durante il deploy"
    echo "   Verifica le credenziali FTP e riprova"
    echo ""
    exit 1
fi
