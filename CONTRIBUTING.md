# Contributing to AME CEG

This document defines the development workflow and contribution rules for the AME CEG website.

The goal is to keep the codebase stable, maintainable, and easy for the current and future AME website teams to work on.

---

## 1. Branch Structure

The repository uses three levels of branches:

```text
main
  ↓
Production

dev
  ↓
Development / Integration

feature/*
fix/*
refactor/*
docs/*
  ↓
Individual work
```

### `main`

`main` contains production-ready code.

* Do not develop directly on `main`.
* Do not push directly to `main`.
* Production changes must come through a Pull Request.

### `dev`

`dev` is the primary integration branch.

Completed features are merged here for testing and integration before production.

### Feature branches

Every piece of development work should be done on a separate branch.

Examples:

```text
feature/homepage
feature/events
feature/gallery
feature/admin-dashboard
fix/navbar-mobile
refactor/auth
docs/setup
```

---

## 2. Creating a Branch

Always start from the latest `dev` branch.

```bash
git switch dev
git pull origin dev
```

Create your feature branch:

```bash
git switch -c feature/<feature-name>
```

Example:

```bash
git switch -c feature/events-page
```

---

## 3. Commit Rules

Write clear, meaningful commit messages.

Preferred format:

```text
type: short description
```

Examples:

```text
feat: add events page
fix: resolve mobile navbar issue
refactor: simplify event card component
docs: update development setup
chore: update dependencies
```

Avoid commits such as:

```text
update
changes
final
test
working
asdf
final final
```

A commit should describe **what changed**, not how you felt while making it.

---

## 4. Pull Requests

Do not merge feature branches directly into `main`.

Normal workflow:

```text
feature/*
   ↓
Pull Request
   ↓
dev
   ↓
Testing
   ↓
Pull Request
   ↓
main
```

Every Pull Request should explain:

### What changed?

Briefly describe the implementation.

### Why?

Explain the purpose of the change.

### Testing

Mention what was tested.

For UI changes, include screenshots when useful.

---

## 5. Code Review

At least one other developer should review a Pull Request before it is merged.

Important architectural changes should be reviewed by the project lead.

This includes:

* Authentication
* Authorization
* Database changes
* Payload CMS configuration
* Environment configuration
* Deployment configuration
* Major architectural changes

Reviewers should look for:

* Correctness
* Security
* Maintainability
* Performance
* Responsive behaviour
* Consistency with the existing codebase

---

## 6. Keep Your Branch Updated

Before opening a Pull Request, make sure your branch is reasonably up to date with `dev`.

```bash
git fetch origin
git merge origin/dev
```

Resolve conflicts locally before requesting a review whenever possible.

---

## 7. Do Not Commit Secrets

Never commit:

```text
.env
.env.local
.env.production
```

Never commit passwords, API keys, database credentials, authentication secrets, or private tokens.

Use:

```text
.env.example
```

for documenting required environment variables without exposing their values.

---

## 8. Dependencies

Do not install packages simply because they seem useful.

Before adding a dependency, consider:

* Is it actually necessary?
* Does an existing dependency already solve the problem?
* Is it actively maintained?
* Does it introduce unnecessary complexity?
* Does it fit the project architecture?

Discuss significant dependencies with the team before introducing them.

---

## 9. Code Quality

Keep code:

* Readable
* Modular
* Consistent
* Type-safe
* Reusable where appropriate

Avoid unnecessary abstraction.

Do not create complicated systems to solve simple problems.

Follow the conventions already established in the project before introducing a new pattern.

---

## 10. File and Component Naming

Use descriptive names.

React components:

```text
EventCard.tsx
Navbar.tsx
OfficeBearerCard.tsx
```

Utilities:

```text
formatDate.ts
validateEmail.ts
```

Avoid vague names:

```text
Thing.tsx
Stuff.ts
TestComponent.tsx
NewFile.ts
```

---

## 11. Don't Modify Someone Else's Work Without Coordination

If another developer is actively working on a feature, do not modify their branch or overwrite their implementation without discussing it with them.

If your work depends on theirs, communicate before making architectural changes.

---

## 12. Issues and Tasks

Before starting a significant feature, make sure the task is clearly defined.

A task should ideally identify:

* Objective
* Expected behaviour
* Person responsible
* Dependencies
* Completion criteria

Small fixes do not necessarily require a formal issue.

---

## 13. Definition of Done

A feature is considered complete when:

* The implementation works as expected.
* TypeScript produces no errors.
* ESLint passes.
* The feature has been tested locally.
* Responsive behaviour has been checked where applicable.
* No secrets or unnecessary files have been committed.
* The Pull Request has been reviewed.
* The feature has been merged into `dev`.

---

## 14. Production Changes

Production deployment is treated separately from development.

```text
Developer
    ↓
feature branch
    ↓
dev
    ↓
Testing
    ↓
main
    ↓
Production
```

Only stable, tested changes should reach `main`.

---

## 15. Communication

If you are blocked, communicate early.

If a task is taking significantly longer than expected, update the team.

If you are going to make a major architectural change, discuss it before implementing it.

The objective is not to prevent people from experimenting.

The objective is to prevent one person's experiment from breaking everyone else's work.

---

## 16. Golden Rules

1. **Do not push directly to `main`.**
2. **Work in your own branch.**
3. **Keep commits meaningful.**
4. **Review before merging.**
5. **Never commit secrets.**
6. **Communicate before major architectural changes.**
7. **Keep `dev` stable.**
8. **Test before opening a Pull Request.**
9. **Don't overwrite another developer's work.**
10. **If you're unsure, ask before making a destructive change.**

---

**AME CEG — Website Development Team**
