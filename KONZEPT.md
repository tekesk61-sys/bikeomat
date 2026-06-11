# Bikeomat – Website-Relaunch · Vollständiges Konzept

> Positionierung: **„Der 24/7 Fahrrad-Servicepunkt zum Mieten – Full-Service inklusive."**
> Fokus: **Vermietung als Hauptgeschäft**, Verkauf als zusätzliche Option.
> Look & Feel: Apple / Tesla / Stripe / Linear / Notion – minimalistisch, hochwertig, viel Weißraum, große Typografie, dunkle Akzente + Fahrrad-Grün.

---

## 1. Was wurde gebaut

Eine vollständige, lauffähige Website (statisches HTML/CSS/JS, ohne Build-Tools, mobil-optimiert):

| Datei | Seite | Hauptziel (Conversion) |
|---|---|---|
| `index.html` | Startseite | Beratung / Angebot |
| `vermietung.html` | Vermietung (Hauptangebot) | Angebot anfordern |
| `kaufen.html` | Bikeomat kaufen | Kaufangebot anfordern |
| `einsatzorte.html` | Einsatzorte (interaktive Karte) | Beratung |
| `referenzen.html` | Referenzen & Case Studies | Beratung / Angebot |
| `ueber-uns.html` | Über uns / Story | Vertrauen → Kontakt |
| `kontakt.html` | Kontakt (3 Formulare) | Lead-Abschluss |
| `assets/styles.css` | Design-System | – |
| `assets/main.js` | Interaktion (Nav, Karte, FAQ, Counter, Forms) | – |
| `sitemap.xml`, `robots.txt` | SEO-Basics | – |

„So funktioniert's" ist als Sektion (`#ablauf`) auf der Startseite umgesetzt und aus der Navigation verlinkt.

**Lokal öffnen:** `index.html` im Browser öffnen. Für korrekte Pfade ggf. lokalen Server starten:
`python -m http.server` im Ordner `Bikeomat-Relaunch` → http://localhost:8000

---

## 2. Sitemap

```
Startseite (/)
├── Vermietung (/vermietung)            ← Hauptconversion
├── Bikeomat kaufen (/kaufen)
├── Einsatzorte (/einsatzorte)
│     └── Anker je Zielgruppe (Kommune, Hotel, Camping, Firma, Wohnen, Bahnhof, Uni, Freizeit)
├── So funktioniert's (/#ablauf)
├── Referenzen (/referenzen)
├── Über uns (/ueber-uns)
└── Kontakt (/kontakt)
      ├── #angebot   – Individuelles Angebot
      ├── #beratung  – Beratung vereinbaren
      └── #rueckruf  – Rückruf anfordern
```

Footer-Pflichtseiten (anzulegen): Impressum, Datenschutz, AGB.

---

## 3. Conversion-Strategie (CTA-System)

**Drei wiederkehrende Aktionen** – auf jeder Seite präsent:

1. **Angebot anfordern** (Primär, grün) – härteste Conversion
2. **Beratung vereinbaren** (Sekundär) – weicherer Einstieg
3. **Rückruf anfordern** (im Footer & Kontakt) – niedrigste Hürde

**Platzierung pro Seite:**
- **Sticky Header-CTA** (immer sichtbar): „Beratung" + „Angebot anfordern"
- **Sticky Mobile-Bar** unten am Viewport-Rand (nur Mobil)
- **Hero-CTA** (Doppel-Button)
- **CTA-Band** vor dem Footer (dunkel, mit Glow)
- **Inline-CTAs** in Sektionen (z. B. nach Full-Service-Block)

**Funnel (B2B):**
```
Awareness        → SEO / Hero („24/7 Servicepunkt")
Interest         → Warum Bikeomat? + Leistungen
Consideration    → Vermietung (Full-Service) / Einsatzorte / Referenzen
Intent           → CTA-Band, Pricing-Vergleich Mieten vs. Kaufen
Action           → Kontakt: Angebot / Beratung / Rückruf (Micro-Commitment via Chips)
Retention        → Reporting, fester Ansprechpartner (im Copy versprochen)
```
Friction-Reduktion im Formular: erst Auswahl (Chips „Mieten/Kaufen/Unsicher"), dann minimale Pflichtfelder (Name + E-Mail). „Antwort in 24 h" als Trust-Verstärker.

---

## 4. Design-System

### Farbpalette
| Token | HEX | Einsatz |
|---|---|---|
| `--green` | `#18C77D` | Primärakzent, CTAs |
| `--green-strong` | `#0FA968` | Hover, Icons |
| `--green-dark` | `#0B6B45` | Text auf hellgrün |
| `--green-soft` | `#E7F9F0` | Icon-Hintergründe, Badges |
| `--ink` | `#0A0F0D` | Dunkler Akzent (grün-schwarz) |
| `--ink-2` | `#111A16` | Dunkle Sektionen/Cards |
| `--paper` | `#FFFFFF` | Haupt-Hintergrund |
| `--mist` | `#F5F7F6` | Alternierende Sektionen |
| `--text` | `#0B1311` | Fließtext |
| `--muted` | `#5A6B64` | Sekundärtext |

Kontraste erfüllen WCAG AA (Grün auf Dunkel & Dunkel auf Weiß geprüft).

### Typografie
- **Display/Headlines:** `Space Grotesk` (600/700), enge Laufweite (`-0.02em` … `-0.035em`)
- **Fließtext:** `Inter` (400–600), 17px Basis, Zeilenhöhe 1.6
- Skala: `clamp()`-basiert, fluid responsiv (Hero bis 4.6rem)

### Komponenten (in `styles.css`)
Buttons (primary/dark/ghost/light/lg), Pills/Badges, Feature-Cards, Benefit-Cards (dark+glow), Split-Showcase, Steps-Prozess, Stats mit Count-up, Tabs, interaktive Karte mit Pulse-Pins, Testimonials, FAQ-Accordion, Pricing-Pläne, Formularfelder + Chips, CTA-Band, Header (blur/sticky), Mobile-Nav, Footer, Sticky-Mobile-CTA.

### Animation
Dezent: Scroll-Reveal (IntersectionObserver, gestaffelt via `data-d`), schwebende Hero-Cards, Count-up-Zahlen, sanfte Hover-Lifts. `prefers-reduced-motion` wird respektiert.

### Mobile
- Breakpoints: 980 / 760 / 480px
- Hamburger-Menü (Full-Screen-Overlay)
- Sticky CTA-Bar unten
- Grids brechen auf 1 Spalte, Float-Cards ausgeblendet, Touch-Targets ≥ 44px

---

## 5. SEO-Struktur

### Keyword-Mapping (Seite → Fokus-Keywords)
| Seite | Primär | Sekundär |
|---|---|---|
| Start | Fahrradautomat, Fahrrad Service Station | Fahrrad Reparaturstation, 24/7 Fahrrad Service |
| Vermietung | Fahrradautomat mieten, Full-Service Fahrradautomat | Fahrrad Servicestation mieten |
| Kaufen | Fahrradautomat kaufen, Fahrrad Ersatzteile Automat | Fahrradautomat Fachhandel |
| Einsatzorte | Fahrradstation Kommune, Fahrradservice Hotel | Fahrradservice Campingplatz, Fahrradautomat Bahnhof |
| Start/Features | E-Bike Servicestation | E-Bike Ladestation Automat |

### Meta-Titles & -Descriptions (umgesetzt)
- **Start:** „Bikeomat – Der 24/7 Fahrrad-Servicepunkt zum Mieten | Fahrradautomat" · *Desc:* 24/7 Ersatzteile, Werkzeug, Luft & E-Bike-Ladung als Full-Service-Miete …
- **Vermietung:** „Bikeomat mieten – Full-Service Fahrradautomat ohne Investition"
- **Kaufen:** „Bikeomat kaufen – Fahrradautomat mit eigenem Branding & Sortiment"
- **Einsatzorte:** „Einsatzorte – Wo der Bikeomat überzeugt | Kommune, Hotel, Camping & mehr"
- **Referenzen:** „Referenzen & Case Studies – Bikeomat in der Praxis"
- **Über uns:** „Über uns – Die Idee hinter dem Bikeomat"
- **Kontakt:** „Kontakt – Angebot anfordern, Beratung & Rückruf | Bikeomat"

### H-Struktur (Beispiel Startseite)
```
H1  Der 24/7 Fahrrad-Servicepunkt für Ihre Besucher
H2  Warum Bikeomat?
  H3 Zusätzlicher Service für Radfahrer
  H3 Keine Arbeit für den Betreiber
  H3 Rund um die Uhr verfügbar
  H3 Zusätzliche Einnahmequelle
H2  Was der Bikeomat kann
  H3 Ersatzteile & Zubehör 24/7 · Reparaturanleitungen · Luftpumpe · E-Bike-Ladung · Werkzeug · Full-Service
H2  Bikeomat mieten – wir kümmern uns um den Rest
H2  In fünf Schritten zum eigenen Servicepunkt   (#ablauf)
H2  Überall dort, wo Räder rollen   (Einsatzorte)
H2  Was Bikeomat-Standorte bewegen   (Referenzen/Stats)
H2  Mieten oder kaufen – Sie entscheiden
H2  Gut zu wissen   (FAQ → eignet sich für FAQ-Rich-Snippet)
```

### Technisches SEO (umgesetzt / empfohlen)
- ✅ `<title>`, `meta description`, `keywords`, `canonical`, Open Graph je Seite
- ✅ `lang="de"`, semantische Sektionen, Alt-fähige Inline-SVGs
- ✅ JSON-LD `Product` auf der Startseite (erweiterbar um `LocalBusiness`, `FAQPage`, `BreadcrumbList`)
- ✅ `sitemap.xml` + `robots.txt`
- ✅ Mobile-first, schnelle Ladezeit (kein Framework, Fonts mit `preconnect`)
- ⏳ Empfohlen: echte Bilder mit `alt`, WebP/AVIF, `loading="lazy"`, FAQ-Schema, Standort-Landingpages (z. B. „Fahrradautomat + Stadt") für lokale Suche.

---

## 6. Wireframe-Logik (Seitenaufbau)

**Startseite (Scroll-Reihenfolge):**
`Sticky Header` → `Hero (Headline + Doppel-CTA + Trust-Items + Automaten-Visual)` → `Zielgruppen-Strip` → `Warum Bikeomat (4 Benefits)` → `Leistungen (6 Features)` → `Vermietung-Split (Full-Service)` → `So funktioniert's (5 Steps, dunkel)` → `Einsatzorte (Tabs)` → `Referenzen (Stats + 2 Quotes)` → `Mieten vs. Kaufen (Pricing)` → `FAQ` → `CTA-Band` → `Footer` → `Sticky Mobile CTA`.

**Unterseiten:** `Page-Hero (Breadcrumb + Pill + H1 + Lead + CTA)` → thematische Sektionen (abwechselnd hell/mist/dunkel) → `CTA-Band` → `Footer`.

---

## 7. Copywriting-Prinzipien (verkaufspsychologisch, B2B)

- **Nutzen vor Feature:** „Keine Arbeit für den Betreiber" statt „automatisierte Logistik".
- **Risiko-Umkehr:** „0 € Investition", „unverbindlich", „Antwort in 24 h".
- **Hauptangebot framen:** Vermietung = „Rundum-sorglos", als „Empfohlen" markiert.
- **Zielgruppen-Spiegelung:** Eigene Vorteils-Cluster je Standorttyp (Einsatzorte).
- **Social Proof:** Stats mit Count-up, konkrete Case-Study-Zahlen, Zitate mit Rolle/Region.
- **Klarheit:** Kurze Sätze, „Sie"-Ansprache, jede Sektion endet handlungsorientiert.

---

## 8. Nächste Schritte (Umsetzungsempfehlung)

1. **Echte Bilder** einsetzen (Hero-Foto Automat im Einsatz, Standort-Fotos, Team) – Platzhalter sind als dunkle Showcase-Flächen/Emojis angelegt.
2. **Formular-Backend** anbinden (z. B. Formspree, eigenes Mail-Skript oder CRM/HubSpot). Aktuell Demo-Submit ohne Versand.
3. **Echte Kontaktdaten** (Telefon, Adresse, Impressum/Datenschutz) eintragen.
4. **Analytics & Consent** (z. B. Plausible/GA4 + Cookie-Banner) ergänzen.
5. **Lokale Landingpages** für SEO ausbauen (Stadt-spezifisch).
6. **Domain/Hosting:** als statische Site überall deploybar (Netlify, Vercel, eigener Webspace).
```
```
