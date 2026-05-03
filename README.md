# 〰 Loci - Memory Consolidation System

> "Remember What Matters."  
> Not less sleep. Denser consolidation.

A 24-hour memory consolidation system targeting the spindle-ripple coupling failure that causes 20–40% memory loss in 1.5 billion people every night.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3 with custom brand tokens
- **Animation**: GSAP 3 + ScrollTrigger, Framer Motion 11
- **3D / Canvas**: Three.js, @react-three/fiber, canvas particles
- **Font**: DM Sans (Google Fonts)
- **Deployment**: Vercel (auto via GitHub)

---

## Local Development

```bash
# Clone
git clone https://github.com/camosi/loci-site.git
cd loci-site

# Install
npm install

# Dev server (http://localhost:3000)
npm run dev
```

---

## Project Structure

```
loci-site/
├── app/
│   ├── layout.tsx          ← Root layout, nav, footer, cursor
│   ├── page.tsx            ← / Home
│   ├── solution/page.tsx   ← /solution
│   ├── about/page.tsx      ← /about
│   ├── science/page.tsx    ← /science
│   └── prototype/page.tsx  ← /prototype
├── components/
│   ├── Nav.tsx             ← Sticky nav with glass effect
│   ├── Footer.tsx          ← 3-column footer
│   ├── BrainWaves.tsx      ← 3 animated SVG neural waves
│   ├── ParticleCanvas.tsx  ← Neural network particle canvas
│   ├── SectionReveal.tsx   ← GSAP ScrollTrigger reveal wrapper
│   ├── CountUp.tsx         ← Animated stat counter
│   └── ScrollPin.tsx       ← GSAP pinned horizontal scroll
├── lib/
│   └── gsap.ts             ← GSAP + ScrollTrigger registration
├── styles/
│   └── globals.css         ← Brand tokens, cursor, animations
├── tailwind.config.ts      ← Brand color tokens
└── next.config.ts
```

---

## Brand Tokens

| Token      | Value     | Usage                          |
|------------|-----------|--------------------------------|
| `midnight` | `#080A0F` | Primary background             |
| `surface`  | `#0E1018` | Card / section backgrounds     |
| `violet`   | `#7B5CFF` | Primary brand, CTAs            |
| `acid`     | `#C6FF00` | Highlights, "Matters.", energy |
| `coral`    | `#FF4A62` | Sleep spindle, warnings        |
| `cyan`     | `#00D4FF` | Sharp-wave ripple, replay      |

---

## Pages

| Route        | Description                                          |
|--------------|------------------------------------------------------|
| `/`          | Hero, problem stats, handshake teaser, science ticker |
| `/solution`  | 3-panel horizontal scroll: Encoding, Replay, Sync   |
| `/science`   | Scrollytelling wave viz + 4 peer-reviewed papers     |
| `/prototype` | Build status, demo embed, validation, roadmap        |
| `/about`     | Mission, values, SDGs, founders + LinkedIn           |

---

## Deploy to Vercel

### Option A - GitHub Integration (Recommended)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "feat: initial Loci site"
git remote add origin https://github.com/camosi/loci-site.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import from GitHub → select `camosi/loci-site`
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy**

Every push to `main` triggers automatic redeployment.

### Option B - Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## Prototype Demo

To embed the Wedge 3 Simulator on the `/prototype` page:

1. Open `app/prototype/page.tsx`
2. Find the comment `{/* Live Demo */}`
3. Replace the placeholder div with:

```tsx
<iframe
  src="YOUR_APP_URL_HERE"
  width="100%"
  height="500"
  style={{ border: 'none', borderRadius: '12px' }}
  title="Loci Wedge 3 Simulator"
  sandbox="allow-scripts allow-same-origin"
/>
```

---

## The Science

| Paper | Finding | Loci Application |
|-------|---------|------------------|
| Ngo et al., 2013 (Nature) | +40-60% UP phases with acoustic stim | Channel 1 - acoustic sync |
| Ladenbauer et al., 2017 (Curr. Biol.) | tACS induces spindles on demand | Channel 2 - tACS spindle |
| Loren Frank, 2013 (Neuron) | Awake replay in hippocampus | Wedge 2 - Replay Window |
| Nedergaard et al., 2013 (Science) | Glymphatic clearance during sleep | Stakes: disease-level urgency |

---

## SDG Alignment

- **SDG 3** - Good Health & Wellbeing (dementia prevention)
- **SDG 4** - Quality Education (memory consolidation = learning)
- **SDG 10** - Reduced Inequalities (built for disrupted sleepers, not optimizers)

---

*© 2026 Loci. A Moonshot Project.*
