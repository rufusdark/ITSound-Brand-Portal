# Analisi di Mercato — Hero Design (Record Label / Music Studio)

## Data: 2026-06-09
## Contesto: ITSound — Record Label di Martina Franca

---

## 1. Hero Attuale: Audit

| Elemento | Valutazione |
|----------|-------------|
| Struttura | Centrato, full viewport, stacked |
| Background | Solido #0A0A0A + gradient overlay + 2 orb glow |
| Logo | Presente in hero (60px) |
| Badge | "Record Label — Martina Franca" con pulse dot |
| H1 | "Gli Artisti in un unico posto" — gradient text |
| Sottotitolo | Bilingue (en + it) |
| CTA | 2 bottoni (Demo + Servizi) |
| Stats | 3 item (Mixing, Promotion, Consulting) |
| Scroll indicator | Sì |
| Trust bar | Marquee sotto hero |
| **Problemi** | Nessun elemento dinamico, manca "wow factor", layout comune |

---

## 2. Trend Hero Design 2025-2026 (Music Industry)

### Trend 1: Immersive Backgrounds
- **Canvas/WebGL animations** — particelle, onde, waveform, audio reattive
- **Esempi**: Monstercat, OWSLA, Spinnin' Records
- **Perché funziona**: Crea immediatezza, "questo è un posto musicale"
- **Costo implementazione**: Medio (CSS/JS puro, no librerie pesanti)

### Trend 2: Split Layout (50/50)
- **Testo a sinistra + visual a destra**
- **Esempi**: MajorMixing, KuramaSound, DoctorMix
- **Perché funziona**: Chiarezza gerarchica, facile scansionare, spazio per foto/illustrazione
- **Costo**: Basso, ma richiede asset visivo di qualità

### Trend 3: Bold Typography-Only
- **H1 gigante che occupa 80%+ dello schermo**
- **Esempi**: Brand moda/lusso, label indipendenti UK/US
- **Perché funziona**: Impatto memorabile, differenziazione netta
- **Rischio**: Senza buona font e spaziatura, appare vuoto

### Trend 4: Video Background (Muted/Loop)
- **Video breve dello studio / performance / crowd**
- **Esempi**: RCA Records, Atlantic Records
- **Perché funziona**: Storytelling immediato, atmosfera
- **Costo**: Alto (video di qualità, compressione, performance)
- **Non consigliato per ITSound** (no budget video, sito statico)

### Trend 5: Interactive 3D Elements
- **Three.js, Spline, modello 3D dello studio**
- **Esempi**: Siti premiati Awwwards
- **Perché funziona**: "Figo", tecnologicamente avanzato
- **Costo**: Alto, impatto performance, non per hosting Aruba
- **Non consigliato per ITSound**

---

## 3. Competitor Analysis — Hero Specifico

| Competitor | Tipo Hero | Prezzo Esposto | Stats | CTA | Nota |
|------------|-----------|----------------|-------|-----|------|
| **GroundLiftStudio** | Centrato, dark, gradient | Sì (€169) | No | "Book Now" | Pulito, ma comune |
| **DoctorMix** | Video + text overlay | No | Sì (820K YouTube) | "Listen" | Molto forte, ma richiede video |
| **MajorMixing** | Split, minimal | Sì ($50) | Sì (testimonials) | 2 CTAs | Struttura eccellente |
| **KuramaSound** | Centrato, photo bg | Sì (€20) | No | "Get Started" | Troppo semplice |
| **GhostProducerNL** | Dark, particle bg | Sì | No | "Buy Now" | Interattivo, ma confusionario |
| **FutureNoize** | Full-width, bold text | Sì | No | "Shop" | Molto minimal, quasi troppo |

---

## 4. Raccomandazioni per ITSound

### Direzione Strategica

> **"Dobbiamo sembrare più professionali dei competitor italiani, ma più accessibili degli internazionali"**

Il mercato di ITSound è:
- **Locale**: DJ e producer di Martina Franca/Taranto/Bari
- **Nazionale**: Artisti indipendenti che cercano prezzi accessibili
- **Online**: Producer che cercano mixing/mastering a basso costo

### Cosa l'hero deve comunicare in < 3 secondi:
1. "Questo è un posto serio per la musica"
2. "Posso inviare una demo / comprare un servizio"
3. "Sono italiani, capiscono il mercato locale"

### 3 Approcci Testati (Varianti)

#### Variante 01 — Immersive Waveform
- **Concetto**: Background animato con onde sonore procedurali che reagiscono al mouse
- **Vantaggio**: "Wow" immediato, nessuna risorsa esterna, totalmente brand
- **Svantaggio**: Può distrarre dal testo se troppo intenso
- **Adatto per**: Utenti che cercano "vibe", prima impressione memorabile
- **Implementazione**: Canvas 2D, ~60 linee, performance light

#### Variante 02 — Split Studio
- **Concetto**: Testo a sinistra, visual circolare con logo a destra (3 ring animate)
- **Vantaggio**: Chiarezza, spazio per foto/illustrazione futura, struttura moderna
- **Svantaggio**: Richiede asset visivo di qualità (oggi placeholder)
- **Adatto per**: Utenti che scansionano rapidamente, lettura left-to-right
- **Implementazione**: CSS Grid, animazioni CSS, responsive

#### Variante 03 — Bold Minimal
- **Concetto**: Solo tipografia gigante, nessun elemento decorativo, glow neon
- **Vantaggio**: Impatto massimo, memorabile, "sembra costoso"
- **Svantaggio**: Rischio di sembrare "vuoto" su mobile, richiede copy eccellente
- **Adatto per**: Utenti che apprezzano design, pubblico giovane
- **Implementazione**: CSS puro, font-size clamp, gradient animati

---

## 5. Decision Matrix

| Criterio | V1 Waveform | V2 Split | V3 Bold |
|----------|-------------|----------|---------|
| **Impatto visivo** | ★★★★★ | ★★★★☆ | ★★★★★ |
| **Chiarezza messaggio** | ★★★★☆ | ★★★★★ | ★★★☆☆ |
| **Performance** | ★★★★☆ | ★★★★★ | ★★★★★ |
| **Mobile** | ★★★★☆ | ★★★★☆ | ★★★☆☆ |
| **Brand alignment** | ★★★★★ | ★★★★☆ | ★★★★★ |
| **Implementazione** | ★★★★☆ | ★★★★★ | ★★★★★ |
| **Future-proof** | ★★★★☆ | ★★★★★ | ★★★★☆ |
| **TOTALE** | **33** | **34** | **31** |

---

## 6. Proposta Finale

### Raccomandazione: **Variante 02 (Split Studio)** con elementi di V1

**Perché:**
1. Migliore chiarezza per pubblico locale (target principale)
2. Struttura facile da aggiornare con foto reale dello studio quando pronta
3. Può integrare un elemento animato sottile (es. ring o waveform dietro al visual)
4. Performance eccellente, mobile-friendly

**Implementazione:**
- Layout: 55/45 o 50/50 split
- Sinistra: Badge → H1 gradient → Sottotitolo → CTA primario → Stats
- Destra: Cerchio con logo + ring animate + glow sottile
- Sotto hero: Trust bar marquee (mantenere)

**Elementi da prendere da V1:**
- Waveform sottile come texture di background (opacità 0.03) anziché full canvas

**Elementi da prendere da V3:**
- Font-size più grande per H1 (clamp 3rem → 5rem)
- Meno elementi, più respiro

---

## 7. Checklist Implementazione

- [ ] Scegliere variante (attendere feedback utente)
- [ ] Integrare nel `index.html` del sito
- [ ] Testare responsive (mobile 320px → desktop 1920px)
- [ ] Verificare performance (Lighthouse > 90)
- [ ] Aggiungere alt text accessibile
- [ ] Testare CTA click-through
- [ ] Sostituire placeholder visual con foto reale (futuro)

---

*Documento generato per ITSound — Progetto in corso*
