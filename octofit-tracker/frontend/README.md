# Octofit Tracker frontend

The presentation tier is a React 19 application served by Vite. It uses
React Router for navigation and loads activities, leaderboard entries, teams,
users, and workouts from the backend API.

## Backend URL configuration

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` when
running the frontend in a GitHub Codespace:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then calls the forwarded API at
`https://<VITE_CODESPACE_NAME>-8000.app.github.dev`. Vite environment values
are read through `import.meta.env`; restart the Vite server after changing
`.env.local`.

When `VITE_CODESPACE_NAME` is not set, the frontend safely uses
`http://localhost:8000`, suitable for a local backend.

## Run the frontend

Install dependencies and start Vite from the repository root:

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
