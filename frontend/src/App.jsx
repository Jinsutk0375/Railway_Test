import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Train, ShieldAlert, Activity } from 'lucide-react';
import { socket } from './socket';
import LocoPilotView from './components/LocoPilotView';
import AdminDashboard from './components/AdminDashboard';
import './index.css';

function Navigation() {
  const location = useLocation();
  return (
    <nav className="glass-nav">
      <div className="nav-brand">
        <ShieldAlert className="brand-icon" />
        <span>RailGuard Tracking</span>
      </div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          <Train className="nav-icon" /> Loco Pilot
        </Link>
        <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
          <Activity className="nav-icon" /> Admin Dashboard
        </Link>
      </div>
    </nav>
  );
}

function App() {
  const [tracks, setTracks] = useState([]);
  const [trains, setTrains] = useState([]);
  const [simulationMode, setSimulationMode] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() { setIsConnected(true); }
    function onDisconnect() { setIsConnected(false); }
    function onInitialData(data) {
      setTracks(data.tracks);
      setTrains(data.trains);
      setSimulationMode(data.simulationMode);
    }
    function onTrackUpdate(newData) { setTracks(newData); }
    function onSimulationUpdate(data) { setSimulationMode(data.simulationMode); }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('initial_data', onInitialData);
    socket.on('track_update', onTrackUpdate);
    socket.on('simulation_update', onSimulationUpdate);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('initial_data', onInitialData);
      socket.off('track_update', onTrackUpdate);
      socket.off('simulation_update', onSimulationUpdate);
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navigation />
        {!isConnected && <div className="connection-banner">Connecting to Live Server...</div>}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LocoPilotView tracks={tracks} trains={trains} />} />
            <Route path="/admin" element={<AdminDashboard tracks={tracks} simulationMode={simulationMode} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
