import React, { useState, useEffect } from 'react';
import ToggleOption from './InputOptions/booleanOptions';
import InputOption from './InputOptions/InputOptions';
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
      <ToggleOption label="GlobalChat" name="GlobalChat" value={settings.GlobalChat} onChange={handleInputChange} />
      <InputOption label="ChatStreams" name="ChatStreams" value={settings.ChatStreams} onChange={handleInputChange} />
      <ToggleOption label="DiscordEnable" name="DiscordEnable" value={settings.DiscordEnable} onChange={handleInputChange} />
      <InputOption label="DiscordToken" name="DiscordToken" value={settings.DiscordToken} onChange={handleInputChange} />
      <InputOption label="DiscordChannel" name="DiscordChannel" value={settings.DiscordChannel} onChange={handleInputChange} />
      <InputOption label="DiscordChannelID" name="DiscordChannelID" value={settings.DiscordChannelID} onChange={handleInputChange} />

      <button onClick={handleSave}>Save</button>
    </div>
  );
}