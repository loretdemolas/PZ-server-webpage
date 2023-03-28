import React, { useState, useEffect } from 'react';
import ToggleOption from './InputOptions/booleanOptions';
import {saveSettings, fetchSettings} from './API/Setting-API';

export default function ServerSetting() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const getSettings = async () => {
      const data = await fetchSettings();
      setSettings(data);
    }
    getSettings();
  }, []);

  const handleSave = async () => {
    const response = await saveSettings(settings);
    console.log(response);
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