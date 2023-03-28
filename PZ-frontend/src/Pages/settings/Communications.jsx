import React, { useState, useEffect } from 'react';
import ToggleOption from './InputOptions/booleanOptions';
import InputOption from './InputOptions/InputOptions';
import {saveSettings, fetchSettings} from './API/Setting-API';

export default function Communication() {
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
 const enabled =true
 const isDisordEnabled = settings.DiscordEnable
 const isVoiceEnabled = settings.VoiceEnable
 
  return (
    <div>
      <>
      <h3>General Chat Settings</h3>
        <ToggleOption label="GlobalChat" name="GlobalChat" value={settings.GlobalChat} onChange={handleInputChange} />
        <InputOption label="ChatStreams" name="ChatStreams" value={settings.ChatStreams} onChange={handleInputChange} enabled={enabled}/>
      </>
      <>
      <h3>Discord Settings</h3>
        <ToggleOption label="DiscordEnable" name="DiscordEnable" value={settings.DiscordEnable} onChange={handleInputChange} />
        <InputOption label="DiscordToken" name="DiscordToken" value={settings.DiscordToken} onChange={handleInputChange} enabled={isDisordEnabled}/>
        <InputOption label="DiscordChannel" name="DiscordChannel" value={settings.DiscordChannel} onChange={handleInputChange}enabled={isDisordEnabled} />
        <InputOption label="DiscordChannelID" name="DiscordChannelID" value={settings.DiscordChannelID} onChange={handleInputChange} enabled={isDisordEnabled}/>
      </>
      <>
      <h3>Voice Chat Settings</h3>
        <ToggleOption label="VoiceEnable" name="VoiceEnable" value={settings.VoiceEnable} onChange={handleInputChange} />
        <InputOption label="VoiceMinDistance" name="VoiceMinDistance" value={settings.VoiceMinDistance} onChange={handleInputChange} enabled={isVoiceEnabled}/>
        <InputOption label="VoiceMaxDistance" name="VoiceMaxDistance" value={settings.VoiceMaxDistance} onChange={handleInputChange} enabled={isVoiceEnabled}/>
        <ToggleOption label="Voice3D" name="Voice3D" value={settings.Voice3D} onChange={handleInputChange} />
      </>
      <>
      <h3>Group Related Radio Permission</h3>
        <ToggleOption label="DisableRadioStaff" name="DisableRadioStaff" value={settings.DisableRadioStaff} onChange={handleInputChange} />
        <ToggleOption label="DisableRadioAdmin" name="DisableRadioAdmin" value={settings.DisableRadioAdmin} onChange={handleInputChange} />
        <ToggleOption label="DisableRadioGM" name="DisableRadioGM" value={settings.DisableRadioGM} onChange={handleInputChange} />
        <ToggleOption label="DisableRadioOverseer" name="DisableRadioOverseer" value={settings.DisableRadioOverseer} onChange={handleInputChange} />
        <ToggleOption label="DisableRadioModerator" name="DisableRadioModerator" value={settings.DisableRadioModerator} onChange={handleInputChange} />
        <ToggleOption label="DisableRadioInvisible" name="DisableRadioInvisible" value={settings.DisableRadioInvisible} onChange={handleInputChange} />
      </>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}