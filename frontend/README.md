# Finlec Tasks - Task Management App

This is a full-stack task management app with authentication.

## Setup

### Backend
1. Install dependencies: `npm install`.
2. Set up MySQL database with `schema.sql`.
3. Update `.env` with your DB credentials.
4. Run: `node server.js`.

### Frontend
1. Install dependencies: `npm install`.
2. Update `.env` with backend URL.
3. Run: `npm run dev`.

## Deployment
- Backend: Deploy on Render (free tier).
- Frontend: Deploy on Netlify. Set build command `npm run build`, publish `dist`, env var `VITE_API_URL`.