# Kusanagi no Tsurugi ($NAGI)

![Kusanagi no Tsurugi Preview](images/image.png)

Kusanagi no Tsurugi ($NAGI) is a legendary sword-themed meme coin minted on the Base Network, inspired by Japanese mythology. The project balances stark, structural brutalism with deep, atmospheric mythos, presenting a modern "Museum-Brutalist" digital exhibition.

---

## Technical Architecture

The platform is engineered using a modular Next.js architecture designed for fast rendering, responsive layout shifts, and heavy graphical stability.

### Core Stack
- **Framework**: Next.js (App Router, Turbopack enabled)
- **Library**: React 19
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

---

## Key Exhibition Features

### 1. Destiny Engine (Lore Generator)
An interactive ritualistic lore card generator. Users input a lineage name to generate a custom Divine Artifact Card combined with random mythological attributes, complete with non-clipping text scaling and vertical-first ordering optimized for mobile viewports.

### 2. Mythology Modal Exhibition
State-driven overlays showcasing high-resolution art and backstory of key mythological entities:
- **Yamato Takeru** (The Hero Prince)
- **Yamata no Orochi** (The Eight-Headed Serpent)
- **Kusanagi no Tsurugi** (The Grass-Cutting Sword)

### 3. Responsive Layout Control
A custom responsive grid layout designed to dynamically rearrange content (e.g. prioritizing the Artifact Card above analytical attributes) on narrow screens, avoiding clipping or overlapping text.

---

## Token Specifications

| Parameter | Specification |
| :--- | :--- |
| **Token Name** | Kusanagi no Tsurugi |
| **Token Symbol** | $NAGI |
| **Network** | Base |
| **Decimals** | 18 |
| **Total Supply** | 1,000,000,000 |
| **Circulating Supply** | 500,000,000 |
| **Contract Address** | `UPCOMING` |

### Allocation Matrix

| Allocation | Percentage | Amount | Description |
| :--- | :---: | :---: | :--- |
| **Retail** | 81% | 810,000,000 | Distributed across the digital collective. |
| **Liquidity** | 10% | 100,000,000 | Locked pool for stable trading flow. |
| **Funding** | 6% | 60,000,000 | Long-term operational and shrine sustenance. |
| **Dev** | 3% | 30,000,000 | Master smiths and developers allocation. |

---

## Development Guide

### Prerequisites
- Node.js 18.17+
- npm / yarn / pnpm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/xvrique/kusanagi-no-tsurugi.git
   cd kusanagi-no-tsurugi
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the page.

### Production Build
To run static page compilation and verify the production build:
```bash
npm run build
```

---

## Directory Structure

```text
├── images/                  # Repository preview assets
├── public/                  # Public assets
│   ├── images/              # Illustration assets & SVG particles
│   └── sounds/              # Audio assets for UI feedback
├── src/
│   ├── app/                 # Next.js App Router entry & global styling
│   ├── components/
│   │   ├── layout/          # Global Shell components (Navbar, Footer)
│   │   ├── sections/        # Section-specific components (Hero, About, Tokenomics)
│   │   └── ui/              # Atom components (Particles, Badges, Modals)
│   └── lib/                 # Utility files, constants, and animation presets
└── tailwind.config.ts       # Design token configurations
```

---

## Disclaimer
$NAGI is a meme coin created for entertainment and community purposes. It is not an investment vehicle and does not constitute financial advice.
