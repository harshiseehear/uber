# Uber Eats — Canadiens de Montréal Quiz Questionnaire

## Structure Document

Reference: wireframe PDF (3 sets of quiz flows), VEEV app architecture for implementation patterns.

---

## Overview

Mobile-first trivia quiz branded for **Uber Eats × Canadiens de Montréal**. Users answer 5 multiple-choice questions about the Canadiens and Uber Eats ordering stats, then enter their info for a chance to win. All in French.

**Tagline:** "Réponds aux questions. Gagne presque presque tout."

---

## Tech Stack (matching VEEV pattern)

- **React 18** + **Vite 5**
- Single-file app (`App.jsx`) — no router, no state library
- CSS for styling
- gh-pages for deployment

---

## App Flow

```
welcome → q1 → q2 → q3 → q4 → q5 → form
```

6 screens total per flow. Each set has identical welcome + form screens but different questions.

---

## Screen Definitions

### Screen 1 — Welcome

- **Background:** Uber Eats green (#06C167)
- **Logo:** "Uber Eats" in black (Uber Move font, bold)
- **Heading:** "Réponds aux questions. Gagne presque presque tout."
- **CTA button:** "Joue maintenant" (black pill button, white text)
- Tapping CTA → navigate to Q1

### Screens 2–6 — Questions (Q1 through Q5)

- **Background:** Uber Eats green (#06C167)
- **Question text:** Black, bold italic, large font at top
- **Format:** 4 answer options (A/B/C/D), single select per question
- **Option style:** White rounded-rect cards, left-aligned text with letter prefix (A), B), C), D))
- Selecting an option → auto-advance to next question (no confirm button needed)

### Screen 7 — Entry Form

- **Background:** Uber Eats green (#06C167)
- **Icon:** Black circle (Uber logo/dot) centered at top
- **Heading:** "Prépare-toi à gagner presque presque tout."
- **Form fields:** 5 white rounded-rect input fields (no labels visible in wireframe — likely: name, email, phone, postal code, etc.)
- **Submit:** White arrow (→) button below the fields
- **Legal text (bottom):** "En participant à ce jeu, vous reconnaissez et acceptez les modalités et conditions (disponibles sur demande). L'admissibilité, les détails des prix et le processus de sélection sont assujettis au règlement officiel. Aucun achat requis. L'organisateur se réserve le droit de modifier, de suspendre ou d'annuler le jeu en tout temps, sans préavis."

---

## Question Sets

There are **3 independent question sets**. The app must support all 3 (likely randomized or configured per deployment).

### SET 1

| # | Question | A | B | C | D |
|---|----------|---|---|---|---|
| Q1 | En quelle année les Canadiens de Montréal ont-ils été fondés? | 1906 | 1909 | 1914 | 1907 |
| Q2 | Quelle gâterie les partisans des Canadiens ont-ils commandée plus de 50 000 fois cette saison? | Lait frappé | Chocolats | Tiramisu | Gâteau au fromage |
| Q3 | Durant les séries éliminatoires de 2025, quel trio (nourriture, produit d'épicerie et produit du quotidien) les partisans des Canadiens ont-ils commandé le plus souvent? | Shawarma, œufs, papier essuie-tout | Burgers, bananes, assiettes | Ramen, poulet rôti, gomme à mâcher | Pizza, fraises, fleurs |
| Q4 | En quelle année Youppi! est-il devenu la mascotte des Canadiens de Montréal? | 2000 | 2005 | 1990 | 2009 |
| Q5 | Durant les séries éliminatoires de 2025, les partisans des Canadiens ont commandé plus de 7000 portions de frites, ce qui correspond au : | Nombre de mises au jeu cette saison | Nombre de matchs de saison régulière disputés dans l'histoire de l'équipe | Nombre de minutes en supériorité numérique cette saison | Nombre de joueurs ayant porté le chandail du CH |

### SET 2

| # | Question | A | B | C | D |
|---|----------|---|---|---|---|
| Q1 | Les Canadiens sont l'équipe de la LNH qui a remporté le plus de coupes Stanley. Combien en ont-ils remporté? | 18 | 32 | 27 | 24 |
| Q2 | Au cours de cette saison, les partisans montréalais ont commandé plus de 300 000 burgers, un nombre suffisant pour : | Remplir cinq fois la patinoire du Centre Bell | Atteindre une hauteur correspondant à plus de 31 tours du stade olympique | Correspondre au poids de 1,2 million de rondelles | Couvrir toute la longueur de la ligne orange du métro |
| Q3 | Les soirs où les Canadiens jouent, lequel de ces aliments a été commandé plus de 450 000 fois au cours des deux dernières saisons? | Maïs soufflé | Frites | Poutine | Pomme de terre au four |
| Q4 | Quel entraîneur-chef des Canadiens a mené l'équipe à la conquête de cinq coupes Stanley consécutives entre 1956 et 1960? | Toe Blake | Scotty Bowman | Dick Irvin | Claude Ruel |
| Q5 | Durant la saison dernière, les partisans des Canadiens ont commandé plus de 150 000 pizzas, un nombre suffisant pour : | Parcourir 50 fois la distance entre le Centre Bell et le Vieux-Port | Faire 18 fois le tour de la patinoire du Centre Bell | Faire deux fois la longueur de la ligne orange du métro | Couvrir le belvédère du mont Royal |

### SET 3

| # | Question | A | B | C | D |
|---|----------|---|---|---|---|
| Q1 | Avant le Centre Bell, dans quel aréna les Canadiens ont-ils joué pendant des décennies? | Forum de Montréal | Centre Molson | Maple Leaf Gardens | Stade olympique |
| Q2 | Durant les séries éliminatoires de 2025, les partisans des Canadiens ont passé 3000 commandes d'ailes de poulet, un nombre qui correspond au : | Nombre de secondes dans une période de prolongation en séries éliminatoires | Nombre total de minutes en supériorité numérique | Nombre de tirs au but | Nombre total de mises au jeu cette saison |
| Q3 | La saison dernière, les partisans des Canadiens ont commandé suffisamment de hot-dogs pour parcourir la distance qui sépare le Centre Bell de quel site emblématique de Montréal? | La basilique Notre-Dame | Schwartz's Deli sur le boulevard Saint-Laurent (aussi appelé la « Main ») | Le stade olympique | La croix du mont Royal |
| Q4 | Le célèbre « Big Three » de la défense des Canadiens dans les années 1970 était composé de Serge Savard, Guy Lapointe et de quel autre défenseur? | Larry Robinson | Rod Langway | Craig Rivet | Chris Chelios |
| Q5 | Durant les séries éliminatoires de 2025, les partisans des Canadiens ont commandé beaucoup de poutines. Combien de surfaceuses à glace la sauce de ces poutines pourrait-elle remplir? | 1 resurfaceuse | 3 resurfaceuse | 7 resurfaceuse | 12 resurfaceuse |

---

## Key Differences from VEEV App

| Aspect | VEEV | Uber Eats |
|--------|------|-----------|
| Purpose | Product recommendation (decision tree) | Trivia quiz (no branching logic) |
| Question logic | Answers determine device + flavour result | No outcome logic — all questions are independent trivia |
| Selection type | Mix of multi-select (pick 2) and single-select (pick 1) | All single-select (pick 1 of 4) |
| Final screen | Product recommendation display | Entry form (name/email/etc.) for contest entry |
| Language | English | French |
| Question count | 4 | 5 |
| Question sets | 1 set (fixed) | 3 interchangeable sets |
| Auto-reset timer | 30s inactivity → reset to welcome | TBD (likely same pattern for kiosk use) |
| Google Sheets logging | Yes (answers + recommendation + clicks) | TBD |
| Branding | VEEV teal/dark backgrounds with product imagery | Uber Eats green (#06C167) with black text |

---

## Data Model

```js
const STEPS = ['welcome', 'q1', 'q2', 'q3', 'q4', 'q5', 'form']

// Each question set
const QUESTION_SET = {
  q1: { title: '...', options: [{ value: 'A', label: '...' }, ...] },
  q2: { title: '...', options: [...] },
  q3: { title: '...', options: [...] },
  q4: { title: '...', options: [...] },
  q5: { title: '...', options: [...] },
}

// All single-select
const answers = { q1: '', q2: '', q3: '', q4: '', q5: '' }
```

---

## Interaction Pattern

1. **Welcome** — tap "Joue maintenant" → fade out → show Q1
2. **Q1–Q5** — tap one of 4 options → auto-advance to next question (same pattern as VEEV single-select: select → fade out → next)
3. **Form** — fill 5 fields → tap arrow → submit entry
4. **Inactivity** — auto-reset to welcome after timeout (carry from VEEV: 30s)

---

## Visual Design Notes

- **Primary color:** #06C167 (Uber Eats green) — used as full-screen background
- **Text color:** Black (#000000)
- **Font:** Uber Move (bold italic for questions, regular for options)
- **Option cards:** White (#FFFFFF), fully rounded corners (~16px radius), tall pill shape
- **CTA button:** Black background, white text, rounded pill
- **Form inputs:** White rounded-rect, no visible labels/borders
- **Submit arrow:** White arrow icon (→) on green background
- **Layout:** Vertically stacked, centered, mobile-first (portrait)

---

## File Structure (Target)

```
uber/
  index.html
  package.json
  vite.config.js
  structure.md          ← this file
  src/
    App.jsx             ← all logic: question sets, navigation, form
    App.css             ← all styling
    index.css           ← fonts, CSS variables, theme
    main.jsx            ← React entry point
    assets/             ← background images, Uber Eats logo, fonts
```
