# Gega Santana // Digital Noir Archive & Portfolio

Personal portfolio website for Gega Santana, crafted with an editorial **Digital Noir** aesthetic, architectural precision, and pure vanilla web standards.

Designed in **Stitch MCP** and implemented using **HTML5, CSS3, and Vanilla JavaScript** without external frameworks or dependencies.

---

## 🏛️ Design Identity & Aesthetic

- **Design Philosophy**: Digital Noir — architectural discipline, cinematic restraint, high contrast, zero-radius rectilinear geometry, monospaced metadata indexes, and delicate hairline drafting lines.
- **Color Palette**:
  - Base Obsidian Canvas: `#08070B`
  - Dark Surface Layers: `#141317`, `#1C1B20`, `#201F24`
  - Deep Aubergine Accent: `#21102F`
  - Structural Hairlines: `#302339`
  - Primary Lavender / Violet: `#D0BCFF` / `#8B5CF6`
  - Kinetic Ultraviolet: `#B56BFF`
  - Primary Type: `#F0EDF5` / `#E6E1E7`
  - Technical Notation: `#928A9E`
- **Typography Hierarchy**:
  - Display / Headlines: **Space Grotesk**
  - Narrative Body: **Inter**
  - Technical & Archival Notation: **IBM Plex Mono**

---

## 📸 Personal Portrait System & Easy Photo Replacement

A dedicated architectural portrait node (`SPECIMEN // GS-73`) is integrated directly into the Hero Section.

### How to Replace Your Portrait Photo:

#### Method 1: Permanent File Replacement (No Code Editing Needed)
Simply copy or save your photograph into the following dedicated project path:
```
my-portfolio/assets/images/gega-profile.jpg
```
- **Recommended format**: JPG, PNG, or WebP.
- **Aspect ratio**: ~1:1.25 (vertical/editorial crop, e.g. 800×1000px or square 800×800px).
- The website automatically detects and renders the image with zero code changes required.

#### Method 2: Instant In-Browser Visual Preview (No Backend Required)
You can preview any photo directly in the browser:
1. Hover over the portrait node in the Hero section.
2. Click the camera icon (`📷`) in the upper-right corner.
3. Select your local photo file.
4. Your photo will render immediately in real-time and persist across page refreshes via secure client-side storage (`localStorage`).
5. Click the reset icon (`↺`) at any time to return to the default file path.

#### Graceful Fallback Mode:
If `gega-profile.jpg` has not been added yet, the website displays an engineered architectural biometric wireframe with clear archival status indicators (`PORTRAIT NODE // AWAITING ASSET // STANDBY`). It maintains the layout structure with zero broken image icons or awkward empty spaces.

---

## 🛰️ Live Interactive Radar Centerpiece

The hero section features a real-time tactical radar visualization engineered in HTML5 Canvas and mathematical SVG:
- **Continuous Radar Sweep**: Rotating 360° scanning beam with neon ultraviolet gradient trail.
- **Active Telemetry Targets**: 5 persistent target nodes (`EXP_01` to `EXP_04` + memory node) that illuminate with expanding pulse waves as the beam passes over them.
- **Dynamic Orbital Probes & Particles**: Telemetry probes traveling on orbital paths alongside ambient cosmic data particles.
- **Interactive Cursor Reticle**: Moving the mouse over the radar locks an interactive target reticle showing real-time range and azimuth angles. Clicking the radar emits a tactical beacon ping.
- **Subtle 3D Parallax Tilt**: The radar frame reacts naturally to cursor movement on desktop with smooth damping interpolation.
- **Accessibility**: Fully supports `prefers-reduced-motion` by disabling continuous rotations and parallax tilt for users who need reduced motion.

---

## 📂 Project Structure

```
my-portfolio/
├── index.html              # Main semantic HTML5 structure with interactive radar & portrait
├── README.md               # Project documentation & architectural ledger
├── assets/
│   ├── images/
│   │   ├── logo.png        # GS Monogram brand logo
│   │   └── gega-profile.jpg # Dedicated personal portrait file location
│   ├── icons/
│   └── fonts/
├── css/
│   ├── style.css           # Pure CSS3 design tokens, typography, layouts, animations
│   └── responsive.css      # Fluid media queries for desktop, tablet, and mobile
└── js/
    └── script.js           # Live radar engine, portrait manager, and interactive modules
```

---

## ⚡ Core Sections & Features

1. **Header Navigation & Archival Status**:
   - Monogram logo and brand badge.
   - Smooth-scrolling index anchors (`00 HOME`, `01 ABOUT`, `02 TOOLKIT`, `03 SELECTED WORK`, `04 CONTACT`).
   - Dynamic live UTC+7 system clock (`SYS: IDN [UTC+7] HH:MM:SS`).
   - Active learning status monitor with pulsing ultraviolet indicator.
   - Responsive mobile navigation drawer with hamburger toggle.

2. **Hero Section ("Code is a Craft")**:
   - Monospaced drafting grid overlay and technical coordinates (`+ 06° 12' 52.6" S / 106° 50' 42.5" E`).
   - High-impact display typography with gradient text accent.
   - Archival portrait specimen node with automated fallback and instant visual uploader.
   - Live interactive radar centerpiece with continuous sweep, target pings, and parallax tracking.
   - Technical metadata metrics block (Region, Discipline, Status, Session Runtime).

3. **Section 01 // The Person**:
   - Core principle card: *"Continuous experimentation over premature perfection"*.
   - Academic foundation specs (Undergraduate in Informatics & Computer Science).
   - Design ethos: Digital Noir.
   - Narrative statement & stats bar (100+ commits catalogued, 4 core specializations, 2025 chapter).

4. **Section 02 // The Toolkit**:
   - **Group 01: Core Web** (HTML5, CSS3 / PostCSS, JavaScript ES6+).
   - **Group 02: Programming** (Java, C++).
   - **Group 03: Databases** (MySQL, PostgreSQL).
   - **Group 04: Dev Tools** (Git / CLI, GitHub, VS Code / UNIX).

5. **Section 03 // Selected Work**:
   - **EXP_01 // Algorithmic Visualizer**: Interactive QuickSort animation and dynamic bar graph.
   - **EXP_02 // Minimalist Query Interface**: PostgreSQL relational schema mock table with live query indicator.
   - **EXP_03 // Study Tracker & Workspace**: Interactive task row items with checkbox toggles and live progression bar.
   - **EXP_04 // Creative Web Lab**: Experimental sandbox prototype preview.

6. **Section 04 // Contact**:
   - Direct communication channels (Email with one-click clipboard copy, GitHub, LinkedIn).
   - Interactive Dispatch Terminal form (`DISPATCH_TERMINAL.sh`) with instant transmission acknowledgment.

---

## 🚀 Running Locally

To preview the website locally:

```bash
# Option A: Open directly in your browser
Open my-portfolio/index.html in Google Chrome, Edge, or Firefox.

# Option B: Run via local Node.js / NPX
npx serve my-portfolio
```

