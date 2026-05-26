# UFO Burger — Premium Closed Burgers

> Cosmic flavor, premium craft, and limited first access in Wallsend.

## Tech Stack

- **Next.js 16** — App Router, Turbopack
- **React 19** — Server & Client Components
- **TypeScript 5** — strict mode
- **Tailwind CSS 4** — utility-first styling
- **Zod** — schema validation
- **react-hook-form** — form state management

## Project Structure
## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Cosmic-themed landing page with planet burger menu
- Waitlist form with WhatsApp integration
- Investor contact modal
- Scroll-based reveal animations
- Mobile-responsive navigation
- Security headers (CSP, HSTS, XSS protection)
- Form validation with Zod schemas

## Security

All routes are protected with security headers:
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options
- X-Content-Type-Options
- Permissions Policy

## Development

Built with Claude Code — refactored from a monolithic Codex-style page into
a modular, maintainable React component architecture.
