import React, { useState, useEffect } from 'react';
import ToggleOption from './InputOptions/booleanOptions';
import {saveSettings} from './API/saveSettings'

function App() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api/settings')
      .then(response => response.json())
      .then(data => setSettings(data));
  }, []);

  const handleSave = () => {
    saveSettings(settings)
      .then(data => console.log(data));
  };
  
   const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSettings(prevSettings => ({ ...prevSettings, [name]: value }));
  };

  return (
    <div>
      <ToggleOption label="PVP" name="PVP" value={settings.PVP} onChange={handleInputChange} />
      <ToggleOption label="PauseEmpty" name="PauseEmpty" value={settings.PauseEmpty} onChange={handleInputChange} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default App;