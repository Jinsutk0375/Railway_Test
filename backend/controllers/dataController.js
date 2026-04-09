import { state, getEffectiveState } from '../state.js';
import { broadcastTrackUpdate } from '../socketManager.js';

export function handleIncomingData(req, res) {
  const data = req.body;

  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: 'Invalid payload format' });
  }

  console.log(`[EXTERNAL DATA]`, data);

  for (const [key, value] of Object.entries(data)) {
    const track = state.tracks.find(t => t.id === key);

    if (track && (value === 0 || value === 1)) {
      track.sensorSafe = value;
    }
  }

  broadcastTrackUpdate();

  res.json({ success: true, effectiveTracks: getEffectiveState() });
}

export function getStatus(req, res) {
  res.json({ 
    tracks: getEffectiveState(), 
    trains: state.trains,
    // simulationMode: state.simulationMode
  });
}
