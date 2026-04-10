import React from 'react';
import { ShieldAlert, CheckCircle, XCircle } from 'lucide-react';



export default function AdminDashboard({ tracks }) {
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL ||
    'https://railway-test-96ax.onrender.com';

  const handleOverride = async (segmentId, newOverrideStatus) => {
    try {
      await fetch(`${BACKEND_URL}/api/override`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ segmentId, override: newOverrideStatus })
      });
    } catch (error) {
      console.error('Error overriding status:', error);
    }
  };

  return (
    <div className="glass-card">
      {/* <h1 style={{color:"red"}}>NEW VERSION LOADED</h1> */}
      <div className="admin-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Track Network Overview (4 Sensors)
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Monitor and manually override sensor inputs.
          </p>
        </div>
      </div>

      <div className="segments-grid">
        {tracks.map(track => (
          <div
            key={track.id}
            className="glass-card segment-card"
            style={{ background: 'rgba(0,0,0,0.3)', position: 'relative' }}
          >
            {track.override !== null && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                background: '#f59e0b',
                color: '#000',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                OVERRIDDEN
              </div>
            )}

            <div className="segment-route">
              <span>
                {track.id.toUpperCase()} ({track.from} ➔ {track.to})
              </span>

              <span className={`status-badge ${track.safe ? 'safe' : 'unsafe'}`}>
                {track.safe ? <CheckCircle size={14} /> : <ShieldAlert size={14} />}
                {track.safe ? 'SAFE' : 'UNSAFE'}
              </span>
            </div>

            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Raw Sensor:{' '}
              <span style={{ color: track.sensorSafe ? 'var(--safe)' : 'var(--danger)' }}>
                {track.sensorSafe ? 'SAFE (1)' : 'UNSAFE (0)'}
              </span>
              <br />
              Effective:{' '}
              <span style={{ color: track.safe ? 'var(--safe)' : 'var(--danger)' }}>
                {track.safe ? 'SAFE (1)' : 'UNSAFE (0)'}
              </span>
            </div>

            <div className="segment-actions" style={{ flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn safe"
                  style={{ flex: 1 }}
                  onClick={() => handleOverride(track.id, 1)}
                >
                  Force SAFE
                </button>

                <button
                  className="btn danger"
                  style={{ flex: 1 }}
                  onClick={() => handleOverride(track.id, 0)}
                >
                  Force UNSAFE
                </button>
              </div>

              <button
                className="btn"
                style={{ width: '100%', background: 'var(--text-muted)' }}
                onClick={() => handleOverride(track.id, null)}
              >
                <XCircle size={16} /> Clear Override
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}