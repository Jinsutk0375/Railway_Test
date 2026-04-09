import express from 'express';
import http from 'http';
import cors from 'cors';
import { initSockets } from './socketManager.js';
import { handleIncomingData, getStatus } from './controllers/dataController.js';
import { handleOverride } from './controllers/overrideController.js';
// import { toggleSimulation } from './controllers/simulationController.js';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// Initialize Socket.io
initSockets(server);

// Routes
app.get('/api/status', getStatus);
app.post('/api/data', handleIncomingData);       // External hardware push hook
app.post('/api/override', handleOverride);       // Admin force toggle
// app.post('/api/simulation', toggleSimulation);   // Simulation master switch

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Modular Backend server running on port ${PORT}`);
});
