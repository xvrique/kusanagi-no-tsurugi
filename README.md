# Kusanagi no Tsurugi ($NAGI)

A legendary sword minted as a Solana meme coin. Inspired by Japanese mythology, Kusanagi no Tsurugi represents precision, myth, and force. The project is built with a distinctive "Museum-Brutalist" design language, balancing stark, structural elements with deep, atmospheric mythology.

## Overview

Kusanagi no Tsurugi is a high-performance, interactive landing page built to establish the digital presence of the $NAGI token. It features fluid animations, a curated color palette (Cream, Ink, and Crimson), and a responsive, modular component architecture. 

The aesthetic marries traditional Japanese mythos with modern, brutalist web design principles to create a unique and memorable user experience.

## Key Features

- **Museum-Brutalist Aesthetics**: A strict design system utilizing a tri-color palette, rigid grid structures, and sharp typography.
- **Fluid Animations**: Leveraging Framer Motion for scroll-linked animations, subtle floating particle systems, and interactive UI feedback.
- **Responsive Architecture**: Fully optimized for mobile, tablet, and desktop environments.
- **Modular Components**: Maintainable architecture with isolated sections for Hero, About, Mythology, Tokenomics, Roadmap, and How To Buy.
- **Next.js App Router**: Utilizing the latest Next.js features for optimal performance and SEO.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (version 18.17 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/xvrique/kusanagi-no-tsurugi.git
cd kusanagi-no-tsurugi
```

2. Install the dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Running Locally

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. The page will auto-update as you edit the source files.

## Project Structure

- `/src/app`: Core Next.js routing and layout configuration.
- `/src/components/layout`: Global structural components (Navbar, Footer).
- `/src/components/sections`: Page-specific modular sections (Hero, About, Tokenomics, etc.).
- `/src/components/ui`: Reusable UI elements (Buttons, Cards, Badges, Particles).
- `/src/lib`: Utility functions, animation variants, and constant data.
- `/public/images`: Static graphical assets, character illustrations, and decorative particles.

## Deployment

The application is optimized for deployment on [Vercel](https://vercel.com/), the platform built by the creators of Next.js. Simply import the repository into your Vercel dashboard for an automated, zero-configuration deployment pipeline.

## License

All rights reserved. $NAGI is a meme coin intended for entertainment purposes. Not financial advice.
