import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ServerSetting from './Pages/settings/Settings'
import AntiCheatSetting from './Pages/settings/AntiCheat';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/settings" element={<ServerSetting/>} />
        <Route path="/settings/AntiCheat" element={<AntiCheatSetting/>} />
      </Routes>
    </Router>
  );
}

export default App;