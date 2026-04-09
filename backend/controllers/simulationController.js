// import { state } from '../state.js';
// import { broadcastSimulationState, broadcastTrackUpdate } from '../socketManager.js';

// let simInterval = null;

// function runSimulationTick() {
//   if (!state.simulationMode) return;
  
//   // Randomly toggle sensors
//   state.tracks.forEach(track => {
//     track.sensorSafe = 1; // reset all internal sensors to safe
//   });
  
//   // Pick a random track segment and make its sensor unsafe
//   const randomIndex = Math.floor(Math.random() * state.tracks.length);
//   state.tracks[randomIndex].sensorSafe = 0;
  
//   console.log('[SIM TICK]', state.tracks.map(t => ({ id: t.id, sensorSafe: t.sensorSafe })));
//   broadcastTrackUpdate();
// }

// export function toggleSimulation(req, res) {
//   const { active } = req.body;
//   if (typeof active !== 'boolean') {
//     return res.status(400).json({ error: 'active must be a boolean' });
//   }

//   state.simulationMode = active;
//   console.log(`[SIMULATION] Simulation Mode: ${active ? 'ON' : 'OFF'}`);

//   if (active) {
//     // start interval if not exists
//     if (!simInterval) {
//       simInterval = setInterval(runSimulationTick, 5000);
//       runSimulationTick();
//     }
//   } else {
//     // clear interval
//     if (simInterval) {
//       clearInterval(simInterval);
//       simInterval = null;
//     }
//     // reset all sensors to 1 immediately when simulation ends
//     state.tracks.forEach(t => t.sensorSafe = 1);
//     broadcastTrackUpdate();
//   }

//   broadcastSimulationState();
//   res.json({ success: true, simulationMode: state.simulationMode });
// }
