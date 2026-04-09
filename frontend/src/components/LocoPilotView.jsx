import React, { useState } from 'react';
import { Search, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

export default function LocoPilotView({ tracks, trains }) {
  const [searchQuery, setSearchQuery] = useState('');

  const activeTrain = trains.find(t => 
    searchQuery && (t.id.includes(searchQuery) || t.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const stations = [];
  if (tracks.length > 0) {
    stations.push(tracks[0].from);
    tracks.forEach(t => stations.push(t.to));
  }

  return (
    <div className="glass-card">
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder="Enter Train Number or Name (e.g. 12604)" 
          className="search-input"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {activeTrain ? (
        <div className="train-info" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--accent)' }}>{activeTrain.name} ({activeTrain.id})</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Current Trajectory: <span style={{ color: 'white', fontWeight: 'bold' }}>{activeTrain.currentSegmentId}</span>
          </p>
        </div>
      ) : (
        searchQuery && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No train found matching "{searchQuery}". Try 12604, 12007, or 10912.</p>
      )}

      {/* Vertical Timeline Track view */}
      <div className="timeline">
        {stations.map((station, index) => {
          const segmentToNext = tracks.find(t => t.from === station);
          const isTrainHere = activeTrain && activeTrain.currentSegmentId === segmentToNext?.id;
          const isTrainAtEnd = index === stations.length - 1 && activeTrain && tracks.find(t => t.to === station)?.id === activeTrain.currentSegmentId;

          return (
            <div key={index} className="timeline-item">
              <div className="timeline-visual">
                <div className={`station-node ${(isTrainHere || isTrainAtEnd) ? 'active-train' : ''}`}></div>
                {segmentToNext && (
                  <div className={`track-segment ${segmentToNext.safe ? 'safe' : 'unsafe'}`}></div>
                )}
              </div>
              <div className="timeline-content">
                <div className="station-name">
                  {station} {(isTrainHere || isTrainAtEnd) && <MapPin size={16} color="var(--accent)" style={{ marginLeft: '8px' }} />}
                </div>
                {segmentToNext && (
                  <div className="segment-status">
                    To {segmentToNext.to}
                    <span className={`status-badge ${segmentToNext.safe ? 'safe' : 'unsafe'}`}>
                      {segmentToNext.safe ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                      {segmentToNext.safe ? 'SAFE' : 'UNSAFE'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
