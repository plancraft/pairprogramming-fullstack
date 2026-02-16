# Pairprogramming Fullstack

This repository is a lightweight interview/pair-programming playground that contains:

- a dashboard-like frontend (visual focus, intentionally simple)
- a minimal backend API for ToDos
- NX-based monorepo orchestration for multiple packages

The project is designed to be easy to extend during a coding session and to discuss architecture/refactoring decisions.

## What this project serves

- Provides a realistic but stripped-down dashboard UI for frontend exercises.
- Provides a simple Express API for ToDo retrieval/creation.
- Demonstrates monorepo organization with separate frontend/backend packages managed by NX.

## Tech stack

- **Monorepo / Tooling**
  - `NX`
  - `npm workspaces`
  - `ESLint`
- **Frontend (`pkgs/frontend`)**
  - `React` + `TypeScript` (`.tsx`)
  - `Vite`
  - `Material Symbols` (Google Fonts)
- **Backend (`pkgs/backend`)**
  - `Node.js`
  - `Express`
  - `cors`

## Project structure

```txt
.
├─ nx.json
├─ package.json
└─ pkgs
   ├─ frontend
   │  ├─ index.html
   │  ├─ package.json
   │  ├─ tsconfig.json
   │  ├─ vite.config.js
   │  ├─ public/
   │  └─ src/
   └─ backend
      ├─ package.json
      └─ src/
```

## Most important commands

Run all commands from repository root.

- `npm install`
  - Install all workspace dependencies.
- `npm run dev`
  - Start frontend (Vite dev server).
- `npm run server`
  - Start backend API (`http://localhost:3001`).
- `npm run dev:all`
  - Start frontend and backend in parallel via NX.
- `npm run lint`
  - Lint frontend and backend.
- `npm run build`
  - Build frontend production bundle.
- `npm run preview`
  - Preview the built frontend.

### Useful NX commands

- `npx nx show projects`
  - List all inferred NX projects.
- `npx nx run frontend:dev`
- `npx nx run backend:dev`
- `npx nx run-many -t lint --projects frontend,backend`

## Backend API

Base URL (local): `http://localhost:3001`

- `GET /api/todos`
  - Returns all todos.
- `POST /api/todos`
  - Creates a new todo.
  - Request body example:

```json
{
  "title": "Neue Aufgabe"
}
```

Notes:

- Data is currently stored in memory (no database yet).
- Server restart resets todos to seed data.

## Frontend behavior

- The dashboard page is implemented as a React component.
- The ToDo card fetches todos from `GET /api/todos` on component mount.
- If backend is unavailable, the card shows a simple loading/error fallback message.

## Typical local workflow

1. `npm install`
2. `npm run dev:all`
3. Open the frontend URL shown by Vite (usually `http://localhost:5173`)
4. Verify API manually if needed:
   - `GET http://localhost:3001/api/todos`

## Current limitations

- No persistence layer (in-memory backend only).
- No authentication/authorization.
- No frontend create/update/delete actions for todos yet.

