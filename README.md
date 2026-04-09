# Railway Safety Monitoring System

A full-stack web application designed for real-time track safety monitoring. Features a premium mobile-first Loco Pilot UI and an Admin Dashboard with manual override capabilities.

## Features
- **Real-Time Updates**: WebSockets via Socket.IO push instantaneous status updates.
- **Loco Pilot View**: Track individual trains dynamically along their vertical timeline routes.
- **Admin Dashboard**: Toggle safety status of specific segments and run automated simulation sweeps.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Local Setup
1. **Clone/Navigate to the repository**
   ```bash
   cd RailGuard
   ```
2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   # Backend starts on http://localhost:5000
   ```
3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   # Frontend starts on http://localhost:5173
   ```

## Deployment Instructions

### Deploying Backend (to Render)
1. Push the `backend` folder to a GitHub repository.
2. Sign up on [Render.com](https://render.com) and click **New > Web Service**.
3. Connect your repository and select the `backend` directory.
4. Set Build Command to `npm install` and Start Command to `npm start`.
5. Render will provide a live URL (e.g., `https://railguard-backend.onrender.com`).

### Deploying Frontend (to Vercel)
1. Push the `frontend` folder to a GitHub repository.
2. Sign up on [Vercel.com](https://vercel.com) and click **Add New > Project**.
3. Import the repository and select the `frontend` directory.
4. Set the Framework Preset to **Vite**.
5. Add an Environment Variable: Name: `VITE_BACKEND_URL`, Value: `<Your Render URL>`.
6. Click **Deploy**.
