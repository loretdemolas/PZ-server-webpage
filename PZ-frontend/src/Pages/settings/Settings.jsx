import React, { useState, useEffect } from 'react';
import ToggleOption from './InputOptions/booleanOptions';
import InputOption from './InputOptions/InputOptions';
import {saveSettings, fetchSettings} from './API/Setting-API';

export default function ServerSetting() {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({});
  
  useEffect(() => {
    const getSettings = async () => {
      setIsLoading(true);
      const data = await fetchSettings();
      setSettings(data);
      setIsLoading(false);
    };
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
    <>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
      <>
        <h3>Connection Settings</h3>
        <ToggleOption label="Public" name="Public" value={settings.Public} onChange={handleInputChange} />
        <InputOption label="PublicName" name="PublicName" value={settings.PublicName} onChange={handleInputChange} />
        <InputOption label="PublicDescription" name="PublicDescription" value={settings.PublicDescription} onChange={handleInputChange} />
        <InputOption label="Password" name="Password" value={settings.Password} onChange={handleInputChange} />
        <InputOption label="Password" name="Password" value={settings.Password} onChange={handleInputChange} />
        <InputOption label="MaxAccountsPerUser" name="MaxAccountsPerUser" value={settings.MaxAccountsPerUser} onChange={handleInputChange} />
        <ToggleOption label="AllowCoop" name="AllowCoop" value={settings.AllowCoop} onChange={handleInputChange} />

        <ToggleOption label="SteamScoreboard" name="SteamScoreboard" value={settings.SteamScoreboard} onChange={handleInputChange} />
        <ToggleOption label="SteamVAC" name="SteamVAC" value={settings.SteamVAC} onChange={handleInputChange} />
        <ToggleOption label="UPnP" name="UPnP" value={settings.UPnP} onChange={handleInputChange} />

        <InputOption label="DefaultPort" name="DefaultPort" value={settings.DefaultPort} onChange={handleInputChange} />
        <InputOption label="UDPPort" name="UDPPort" value={settings.UDPPort} onChange={handleInputChange} />
    
        <InputOption label="MaxPlayers" name="MaxPlayers" value={settings.MaxPlayers} onChange={handleInputChange} />
        <InputOption label="PingLimit" name="PingLimit" value={settings.PingLimit} onChange={handleInputChange} />
        <InputOption label="ServerWelcomeMessage" name="ServerWelcomeMessage" value={settings.ServerWelcomeMessage} onChange={handleInputChange} />
        <InputOption label="ServerWelcomeMessage" name="ServerWelcomeMessage" value={settings.ServerWelcomeMessage} onChange={handleInputChange} />
        <InputOption label="server_browser_announced_ip" name="server_browser_announced_ip" value={settings.server_browser_announced_ip} onChange={handleInputChange} />
        <ToggleOption label="LoginQueueEnabled" name="LoginQueueEnabled" value={settings.LoginQueueEnabled} onChange={handleInputChange} />    
        <InputOption label="LoginQueueConnectTimeout" name="LoginQueueConnectTimeout" value={settings.LoginQueueConnectTimeout} onChange={handleInputChange} />

        <ToggleOption label="DenyLoginOnOverloadedServer" name="DenyLoginOnOverloadedServer" value={settings.DenyLoginOnOverloadedServer} onChange={handleInputChange} />    
      
        <InputOption label="RCONPort" name="RCONPort" value={settings.RCONPort} onChange={handleInputChange} />
        <InputOption label="RCONPassword" name="RCONPassword" value={settings.RCONPassword} onChange={handleInputChange} />

      </>
      <>
        <h3>IDs</h3>
        <InputOption label="ResetID" name="ResetID" value={settings.ResetID} onChange={handleInputChange} />
        <InputOption label="ServerPlayerID" name="ServerPlayerID" value={settings.ServerPlayerID} onChange={handleInputChange} />

      </>
      <>
      <h3>Server saving and backup</h3>
        <InputOption label="SaveWorldEveryMinutes" name="SaveWorldEveryMinutes" value={settings.SaveWorldEveryMinutes} onChange={handleInputChange} />
        <InputOption label="BackupsCount" name="BackupsCount" value={settings.BackupsCount} onChange={handleInputChange} />
        <ToggleOption label="BackupsOnStart" name="BackupsOnStart" value={settings.BackupsOnStart} onChange={handleInputChange} />
        <ToggleOption label="BackupsOnVersionChange" name="BackupsOnVersionChange" value={settings.BackupsOnVersionChange} onChange={handleInputChange} />
        <InputOption label="BackupsPeriod" name="BackupsPeriod" value={settings.BackupsPeriod} onChange={handleInputChange} />
      </>
      <>
        <h3>Logging</h3>
        <ToggleOption label="PerkLogs" name="PerkLogs" value={settings.PerkLogs} onChange={handleInputChange} />
        <InputOption label="ClientCommandFilter" name="ClientCommandFilter" value={settings.ClientCommandFilter} onChange={handleInputChange} />
        <InputOption label="ClientActionLogs" name="ClientActionLogs" value={settings.ClientActionLogs} onChange={handleInputChange} />
      </>
      <>
        <h3>Unsorted</h3>
        <ToggleOption label="Open" name="Open" value={settings.Open} onChange={handleInputChange} />
        <ToggleOption label="PauseEmpty" name="PauseEmpty" value={settings.PauseEmpty} onChange={handleInputChange} />
        <InputOption label="ServerWelcomeMessage" name="ServerWelcomeMessage" value={settings.ServerWelcomeMessage} onChange={handleInputChange} />
        <ToggleOption label="AutoCreateUserInWhiteList" name="AutoCreateUserInWhiteList" value={settings.AutoCreateUserInWhiteList} onChange={handleInputChange} />
        <InputOption label="ItemNumbersLimitPerContainer" name="ItemNumbersLimitPerContainer" value={settings.ItemNumbersLimitPerContainer} onChange={handleInputChange} />
      </>
      
      <button onClick={handleSave}>Save</button>
      </div>
    )}
    </>
  );
}