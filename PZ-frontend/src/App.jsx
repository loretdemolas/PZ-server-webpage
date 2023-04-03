import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import ServerSetting from './Pages/settings/Settings';
import AntiCheatSetting from './Pages/settings/AntiCheat';
import AddedContent from './Pages/settings/AddedContent';
import Home from './Pages/Home/Home'

function SettingsNavBar() {
  return (
    <nav>
      <ul style={{ display: "flex", listStyleType: "none", margin: 0, padding: 0 }}>
        <li style={{ marginRight: "1rem" }}>
          <NavLink to="/" activeclassname="active">Home</NavLink>
        </li>
        <li style={{ marginRight: "1rem" }}>
          <NavLink to="/settings" activeclassname="active">Admin Settings</NavLink>
        </li>
        <li style={{ marginRight: "1rem" }}>
          <NavLink to="/settings/anticheat" activeclassname="active">Anti-Cheat </NavLink>
        </li>
        <li style={{ marginRight: "1rem" }}>
          <NavLink to="/settings/content" activeclassname="active">Added Content</NavLink>
        </li>
      </ul>
    </nav>
  );
}

function HomeNavBar() {
  return (
    <nav>
      <ul style={{ display: "flex", listStyleType: "none", margin: 0, padding: 0 }}>
        <li style={{ marginRight: "1rem" }}>
          <NavLink to="/" activeclassname="active">Home</NavLink>
        </li>
        <li style={{ marginRight: "1rem" }}>
          <NavLink to="/tools" activeclassname="active">Tools</NavLink>
        </li>
        <li style={{ marginRight: "1rem" }}>
          <NavLink to="/settings" activeclassname="active"> Server Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
}

function SettingsWrapper({ children }) {
  return (
    <>
      <SettingsNavBar />
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/settings/*"
          element={
            <SettingsWrapper>
              <Routes>
                <Route path="/" element={<ServerSetting />} />
                <Route path="/anticheat" element={<AntiCheatSetting />} />
                <Route path="/content" element={<AddedContent />} />
              </Routes>
            </SettingsWrapper>
          }
        />
        <Route
          path="/*"
          element={
            <>
              <HomeNavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tools" element={<div>Tools</div>} />
                <Route path="/settings" element={<div>Settings</div>} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
