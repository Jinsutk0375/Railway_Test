// Centralized State Management
export const state = {
  tracks: [
    { id: 's1', from: 'Station A', to: 'Station B', sensorSafe: 1, override: null },
    { id: 's2', from: 'Station B', to: 'Station C', sensorSafe: 1, override: null },
    { id: 's3', from: 'Station C', to: 'Station D', sensorSafe: 1, override: null },
    { id: 's4', from: 'Station D', to: 'Station E', sensorSafe: 1, override: null }
  ],
  trains: [
    { id: '12604', name: 'Chennai Express', currentSegmentId: 's3' },
    { id: '12007', name: 'Shatabdi', currentSegmentId: 's1' }
  ]
};

// Helper to get effective safety: 
// The prompt states: "effective_sensor = incoming_sensor OR override"
// If override is 1 (Force Safe) or 0 (Force Unsafe), it overrides the sensor completely.
// If override is null, we fallback to the raw sensor value.
export function getEffectiveState() {
  return state.tracks.map(t => ({
    ...t,
    safe: t.override !== null ? t.override : t.sensorSafe
  }));
}
