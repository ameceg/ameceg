# AME CEG Website

Official website and content management platform for the **Association of Manufacturing Engineers (AME), College of Engineering Guindy (CEG), Anna University**.

## Project Overview

The AME website is being rebuilt from scratch as a modern, maintainable web platform.

The system will provide:

* Public-facing AME website
* Events and announcements
* Office bearer information
* Gallery and media
* AME activities and initiatives
* Content management system for future AME teams
* Secure administrative access
* Responsive design across devices

## Tech Stack

* **Next.js** — Web framework
* **TypeScript** — Programming language
* **Tailwind CSS** — Styling
* **shadcn/ui** — UI components
* **Payload CMS** — Content management
* **PostgreSQL** — Database
* **Neon** — PostgreSQL hosting
* **Vercel** — Deployment

## Getting Started

### Requirements

* Node.js
* npm
* Git

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd ameceg
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Development Workflow

The project uses the following branch structure:

```text
main
  ↓
Production

dev
  ↓
Development / Integration

feature/*
  ↓
Individual feature development
```

### Branch naming

Use:

```text
feature/<feature-name>
fix/<bug-name>
refactor/<change>
docs/<change>
```

Example:

```text
feature/events-page
feature/navbar
fix/mobile-layout
```

### Pull Requests

Do not push directly to `main`.

Create a feature branch, make your changes, push the branch, and open a Pull Request against `dev`.

All production changes must eventually go through:

```text
feature → dev → main
```

## Environment Variables

Environment-specific secrets must never be committed to Git.

Use `.env.local` for local development.

Refer to `.env.example` for the required environment variables.

## Project Documentation

Additional development and AI coding guidelines are maintained in:

* `AGENTS.md`
* `CONTRIBUTING.md`

## Deployment

Production deployment will be handled through Vercel.

Production configuration and credentials must not be committed to the repository.

---

**AME CEG — Website Development Team**
