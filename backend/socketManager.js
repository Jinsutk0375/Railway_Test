import { Server } from 'socket.io';
import { state, getEffectiveState } from './state.js';

let io;

export function initSockets(server) {
  io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    // Send initial effective state
    socket.emit('initial_data', { 
      tracks: getEffectiveState(), 
      trains: state.trains,
      simulationMode: state.simulationMode 
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

export function broadcastTrackUpdate() {
  if (io) {
    io.emit('track_update', getEffectiveState());
  }
}

export function broadcastSimulationState() {
  if (io) {
    io.emit('simulation_update', { simulationMode: state.simulationMode });
  }
}
