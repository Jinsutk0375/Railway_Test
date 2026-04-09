import { state } from '../state.js';
import { broadcastTrackUpdate } from '../socketManager.js';

export function handleOverride(req, res) {
  // override parameter can be 1 (safe), 0 (unsafe), or null (clear override)
  const { segmentId, override } = req.body; 
  
  if (!segmentId || override === undefined) {
    return res.status(400).json({ error: 'Missing segmentId or override payload' });
  }

  const track = state.tracks.find(t => t.id === segmentId);
  if (!track) {
    return res.status(404).json({ error: 'Segment not found' });
  }

  track.override = override;
  
  console.log(`[OVERRIDE] Track ${segmentId} override set to ${override}`);
  broadcastTrackUpdate();

  res.json({ success: true, message: 'Override applied', segmentId, override });
}
