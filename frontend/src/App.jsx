function App() {
  const [tracks, setTracks] = useState([]);
  const [trains, setTrains] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() { setIsConnected(true); }
    function onDisconnect() { setIsConnected(false); }

    function onInitialData(data) {
      setTracks(data.tracks);
      setTrains(data.trains);
    }

    function onTrackUpdate(newData) {
      setTracks(newData);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('initial_data', onInitialData);
    socket.on('track_update', onTrackUpdate);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('initial_data', onInitialData);
      socket.off('track_update', onTrackUpdate);
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navigation />
        {!isConnected && (
          <div className="connection-banner">
            Connecting to Live Server...
          </div>
        )}

        <main className="main-content">
          <Routes>
            <Route path="/" element={<LocoPilotView tracks={tracks} trains={trains} />} />
            <Route path="/admin" element={<AdminDashboard tracks={tracks} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}