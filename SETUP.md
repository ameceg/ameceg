# AME CEG — Development Setup

This guide explains how to set up the AME CEG website locally.

## 1. Prerequisites

Install:

* Git
* Node.js 24 LTS
* VS Code (recommended)

Verify:

```bash
node -v
npm -v
git --version
```

Node.js should be version 24.

---

## 2. Clone the Repository

Clone the repository:

```bash
git clone https://github.com/ameceg/ameceg.git
```

Enter the project:

```bash
cd ameceg
```

---

## 3. Install Dependencies

Install the project dependencies:

```bash
npm install
```

---

## 4. Environment Variables

Create a local environment file:

```bash
.env.local
```

Do not commit this file.

Add:

```env
DATABASE_URL=
PAYLOAD_SECRET=
```

The development database connection string and Payload secret will be provided privately to authorized developers.

**Never use the production database credentials for local development.**

---

## 5. Database

Local development uses the AME **development** database hosted on Neon.

```text
Local Development
        ↓
Neon — development
```

Production uses a separate Neon branch:

```text
Production
        ↓
Neon — production
```

Never make development changes directly against the production database.

---

## 6. Start the Development Server

Run:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Payload Admin:

```text
http://localhost:3000/admin
```

---

## 7. Verify the Project

Before starting development, run:

```bash
npm run lint
```

Then:

```bash
npm run build
```

Both commands should complete successfully.

---

## 8. Git Workflow

Do not work directly on `main` or `dev`.

Create a feature branch from the latest `dev`:

```bash
git switch dev
git pull origin dev
git switch -c feature/<feature-name>
```

Example:

```bash
git switch -c feature/events-page
```

Work on your feature and commit your changes:

```bash
git add .
git commit -m "feat: add events page"
```

Push your branch:

```bash
git push -u origin feature/events-page
```

Create a Pull Request targeting:

```text
dev
```

Do not merge your own Pull Request unless explicitly authorized.

---

## 9. Commit Convention

Use:

```text
type: short description
```

Examples:

```text
feat: add events page
fix: resolve mobile navbar issue
refactor: simplify event card
docs: update setup guide
chore: update dependencies
```

Avoid meaningless commits such as:

```text
update
changes
final
test
asdf
```

---

## 10. Secrets and Sensitive Information

Never commit:

```text
.env
.env.local
.env.production
```

Never commit:

* Database credentials
* API keys
* Authentication secrets
* Private tokens
* Passwords

Use `.env.example` to document required environment variables.

If a secret is accidentally committed, notify the project lead immediately. Do not simply delete the file and assume the secret is safe.

---

## 11. Before Opening a Pull Request

Make sure:

```bash
npm run lint
npm run build
```

both pass locally.

Also check:

```bash
git status
```

Make sure no sensitive files are being committed.

---

## 12. Development Rules

Before making significant changes:

1. Make sure you are working from the latest `dev`.
2. Create a feature branch.
3. Keep your changes focused on the assigned task.
4. Do not modify another developer's active work without coordination.
5. Do not introduce new dependencies without discussing significant additions with the project lead.
6. Do not make architectural or database changes without discussion.
7. Open a Pull Request when the feature is ready.
8. Wait for review before merging.

---

## 13. Getting Help

If you are blocked, communicate early.

If your implementation requires:

* Database changes
* Payload collection changes
* Authentication/authorization changes
* Dependency changes
* Deployment changes
* Major architectural changes

Discuss it with the project lead before implementing it.

---

## AME CEG

Association of Manufacturing Engineers
College of Engineering Guindy

**Website Development Team**
