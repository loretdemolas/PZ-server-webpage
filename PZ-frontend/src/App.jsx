import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';
import ServerSetting from './Pages/settings/Settings'
import AntiCheatSetting from './Pages/settings/AntiCheat';
import Communication from './Pages/settings/Communications';
import GameSetting from './Pages/settings/GameSettings';
import AddedContent from './Pages/settings/AddedContent';

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/settings" activeClassName="active">Server</NavLink>
        </li>
        <li>
          <NavLink to="/settings/anticheat" activeClassName="active">Anti-Cheat</NavLink>
        </li>
        <li>
          <NavLink to="/settings/communication" activeClassName="active">Communication</NavLink>
        </li>
        <li>
          <NavLink to="/settings/game" activeClassName="active">Game Settings</NavLink>
        </li>
        <li>
          <NavLink to="/settings/content" activeClassName="active">Added Content</NavLink>
        </li>
      </ul>
    </nav>
  );
}

function SettingsWrapper({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/tools" element={<div>Tools</div>} />
        <Route path="/settings/*" element={<SettingsWrapper>
          <Routes>
            <Route path="/" element={<ServerSetting />} />
            <Route path="/anticheat" element={<AntiCheatSetting />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/game" element={<GameSetting />} />
            <Route path="/content" element={<AddedContent />} />
          </Routes>
        </SettingsWrapper>} />
      </Routes>
    </Router>
  );
}

export default App;