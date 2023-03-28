import React, { useState, useEffect } from 'react';
import ToggleOption from './InputOptions/booleanOptions';
import InputOption from './InputOptions/InputOptions';
import {saveSettings, fetchSettings} from './API/Setting-API';

export default function AddedContent() {
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
      <InputOption label="Mods" name="Mods" value={settings.Mods} onChange={handleInputChange} />
      <InputOption label="WorkshopItems" name="WorkshopItems" value={settings.WorkshopItems} onChange={handleInputChange} />
      <InputOption label="Map" name="Map" value={settings.Map} onChange={handleInputChange} />

      <button onClick={handleSave}>Save</button>
    </div>
  );
}