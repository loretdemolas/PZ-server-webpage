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
    setIsLoading(true);
    const data = await fetchSettings();
    setSettings(data);
    setIsLoading(false);
  };
  
   const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSettings(prevSettings => ({ ...prevSettings, [name]: value }));
  };
  const enabled =true
  const Notdisabled =true
  const isDisordEnabled = settings.DiscordEnable
  const isVoiceEnabled = settings.VoiceEnable
  const isPublicEnabled = settings.Public
  const isPVPEnabled = settings.PVP
  const isPlayerSafehouseEnabled = settings.PlayerSafehouse
  const isFactionEnabled = settings.Faction
  

  return (
    <>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
      <>
        <h3>Connection Settings</h3>
        <ToggleOption label="Public" name="Public" value={settings.Public} onChange={handleInputChange} disabled = {Notdisabled} />
        <InputOption label="PublicName" name="PublicName" value={settings.PublicName} onChange={handleInputChange} enabled={isPublicEnabled} />
        <InputOption label="PublicDescription" name="PublicDescription" value={settings.PublicDescription} onChange={handleInputChange} enabled={isPublicEnabled}/>
        <InputOption label="Password" name="Password" value={settings.Password} onChange={handleInputChange} enabled={isPublicEnabled}/>
        <InputOption label="MaxAccountsPerUser" name="MaxAccountsPerUser" value={settings.MaxAccountsPerUser} onChange={handleInputChange} enabled={enabled}/>
        <ToggleOption label="AllowCoop" name="AllowCoop" value={settings.AllowCoop} onChange={handleInputChange} disabled = {Notdisabled}/>

        <ToggleOption label="SteamScoreboard" name="SteamScoreboard" value={settings.SteamScoreboard} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="SteamVAC" name="SteamVAC" value={settings.SteamVAC} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="UPnP" name="UPnP" value={settings.UPnP} onChange={handleInputChange} disabled = {Notdisabled}/>

        <InputOption label="DefaultPort" name="DefaultPort" value={settings.DefaultPort} onChange={handleInputChange} enabled={enabled}/>
        <InputOption label="UDPPort" name="UDPPort" value={settings.UDPPort} onChange={handleInputChange} enabled={enabled}/>
    
        <InputOption label="MaxPlayers" name="MaxPlayers" value={settings.MaxPlayers} onChange={handleInputChange} enabled={enabled}/>
        <InputOption label="PingLimit" name="PingLimit" value={settings.PingLimit} onChange={handleInputChange} enabled={enabled}/>
        <InputOption label="ServerWelcomeMessage" name="ServerWelcomeMessage" value={settings.ServerWelcomeMessage} onChange={handleInputChange} enabled={enabled} />
        <InputOption label="server_browser_announced_ip" name="server_browser_announced_ip" value={settings.server_browser_announced_ip} onChange={handleInputChange} enabled={enabled}/>
        <ToggleOption label="LoginQueueEnabled" name="LoginQueueEnabled" value={settings.LoginQueueEnabled} onChange={handleInputChange} disabled = {Notdisabled}/>    
        <InputOption label="LoginQueueConnectTimeout" name="LoginQueueConnectTimeout" value={settings.LoginQueueConnectTimeout} onChange={handleInputChange} enabled={enabled}/>

        <ToggleOption label="DenyLoginOnOverloadedServer" name="DenyLoginOnOverloadedServer" value={settings.DenyLoginOnOverloadedServer} onChange={handleInputChange} disabled = {Notdisabled}/>    
      
        <InputOption label="RCONPort" name="RCONPort" value={settings.RCONPort} onChange={handleInputChange} enabled={enabled}/>
        <InputOption label="RCONPassword" name="RCONPassword" value={settings.RCONPassword} onChange={handleInputChange} enabled={enabled}/>

      </>
      <>
        <h3>IDs</h3>
        <InputOption label="ResetID" name="ResetID" value={settings.ResetID} onChange={handleInputChange} enabled={enabled}/>
        <InputOption label="ServerPlayerID" name="ServerPlayerID" value={settings.ServerPlayerID} onChange={handleInputChange} enabled={enabled}/>

      </>
      <>
      <h3>Server saving and backup</h3>
        <InputOption label="SaveWorldEveryMinutes" name="SaveWorldEveryMinutes" value={settings.SaveWorldEveryMinutes} onChange={handleInputChange} enabled={enabled}/>
        <InputOption label="BackupsCount" name="BackupsCount" value={settings.BackupsCount} onChange={handleInputChange} enabled={enabled}/>
        <ToggleOption label="BackupsOnStart" name="BackupsOnStart" value={settings.BackupsOnStart} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="BackupsOnVersionChange" name="BackupsOnVersionChange" value={settings.BackupsOnVersionChange} onChange={handleInputChange} disabled = {Notdisabled} />
        <InputOption label="BackupsPeriod" name="BackupsPeriod" value={settings.BackupsPeriod} onChange={handleInputChange} enabled={enabled}/>
      </>
      <>
        <h3>Logging</h3>
        <ToggleOption label="PerkLogs" name="PerkLogs" value={settings.PerkLogs} onChange={handleInputChange} disabled = {Notdisabled}/>
        <InputOption label="ClientCommandFilter" name="ClientCommandFilter" value={settings.ClientCommandFilter} onChange={handleInputChange} enabled={enabled} />
        <InputOption label="ClientActionLogs" name="ClientActionLogs" value={settings.ClientActionLogs} onChange={handleInputChange} enabled={enabled}/>
      </>
      <>
        <h3>Unsorted</h3>
        <ToggleOption label="Open" name="Open" value={settings.Open} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="PauseEmpty" name="PauseEmpty" value={settings.PauseEmpty} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="AutoCreateUserInWhiteList" name="AutoCreateUserInWhiteList" value={settings.AutoCreateUserInWhiteList} onChange={handleInputChange} disabled = {Notdisabled}/>
        <InputOption label="ItemNumbersLimitPerContainer" name="ItemNumbersLimitPerContainer" value={settings.ItemNumbersLimitPerContainer} onChange={handleInputChange} enabled={enabled}/>
      </>
      <>
        <h3>PVP and Player interactions</h3>
        <ToggleOption label="PVP" name="PVP" value={settings.PVP} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="NoFire" name="NoFire" value={settings.NoFire} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="SafetySystem" name="SafetySystem" value={settings.SafetySystem} onChange={handleInputChange} disabled = {isPVPEnabled}/>
        <ToggleOption label="ShowSafety" name="ShowSafety" value={settings.ShowSafety} onChange={handleInputChange} disabled = {isPVPEnabled}/>
        <InputOption label="SafetyToggleTimer" name="SafetyToggleTimer" value={settings.SafetyToggleTimer} onChange={handleInputChange} enabled={isPVPEnabled}/>
        <InputOption label="SafetyCooldownTimer" name="SafetyCooldownTimer" value={settings.SafetyCooldownTimer} onChange={handleInputChange} enabled={isPVPEnabled} />
        <ToggleOption label="PVPMeleeWhileHitReaction" name="PVPMeleeWhileHitReaction" value={settings.PVPMeleeWhileHitReaction} onChange={handleInputChange} disabled = {isPVPEnabled}/>
        <InputOption label="PVPMeleeDamageModifier" name="PVPMeleeDamageModifier" value={settings.PVPMeleeDamageModifier} onChange={handleInputChange} enabled={isPVPEnabled}/>
        <InputOption label="PVPFirearmDamageModifier" name="PVPFirearmDamageModifier" value={settings.PVPFirearmDamageModifier} onChange={handleInputChange} enabled={isPVPEnabled}/>
        <ToggleOption label="HidePlayersBehindYou" name="HidePlayersBehindYou" value={settings.HidePlayersBehindYou} onChange={handleInputChange} disabled = {Notdisabled} />
        <ToggleOption label="PlayerBumpPlayer" name="PlayerBumpPlayer" value={settings.PlayerBumpPlayer} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="AnnounceDeath" name="AnnounceDeath" value={settings.AnnounceDeath} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="DropOffWhiteListAfterDeath" name="DropOffWhiteListAfterDeath" value={settings.DropOffWhiteListAfterDeath} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="KnockedDownAllowed" name="KnockedDownAllowed" value={settings.KnockedDownAllowed} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="SneakModeHideFromOtherPlayers" name="SneakModeHideFromOtherPlayers" value={settings.SneakModeHideFromOtherPlayers} onChange={handleInputChange} disabled = {isPVPEnabled}/>
        </>
        <>
        <h3> Player Name related Settings </h3>
        <ToggleOption label="DisplayUserName" name="DisplayUserName" value={settings.DisplayUserName} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="ShowFirstAndLastName" name="ShowFirstAndLastName" value={settings.ShowFirstAndLastName} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="AllowNonAsciiUsername" name="AllowNonAsciiUsername" value={settings.AllowNonAsciiUsername} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="MouseOverToSeeDisplayName" name="MouseOverToSeeDisplayName" value={settings.MouseOverToSeeDisplayName} onChange={handleInputChange} disabled = {Notdisabled}/>
        </>
        <>
        <h3>Safehouse Factions and spawning!</h3>
        <ToggleOption label="PlayerSafehouse" name="PlayerSafehouse" value={settings.PlayerSafehouse} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="AdminSafehouse" name="AdminSafehouse" value={settings.AdminSafehouse} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="SafehouseAllowTrepass" name="SafehouseAllowTrepass" value={settings.SafehouseAllowTrepass} onChange={handleInputChange} disabled={isPlayerSafehouseEnabled}/>
        <ToggleOption label="SafehouseAllowFire" name="SafehouseAllowFire" value={settings.SafehouseAllowFire} onChange={handleInputChange} disabled={isPlayerSafehouseEnabled}/>
        <ToggleOption label="SafehouseAllowLoot" name="SafehouseAllowLoot" value={settings.SafehouseAllowLoot} onChange={handleInputChange} disabled={isPlayerSafehouseEnabled}/>
        <ToggleOption label="SafehouseAllowRespawn" name="SafehouseAllowRespawn" value={settings.SafehouseAllowRespawn} onChange={handleInputChange} disabled={isPlayerSafehouseEnabled}/>
        <ToggleOption label="SafehouseAllowNonResidential" name="SafehouseAllowNonResidential" value={settings.SafehouseAllowNonResidential} onChange={handleInputChange} disabled={isPlayerSafehouseEnabled} />
        <ToggleOption label="AllowDestructionBySledgehammer" name="AllowDestructionBySledgehammer" value={settings.AllowDestructionBySledgehammer} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="SledgehammerOnlyInSafehouse" name="SledgehammerOnlyInSafehouse" value={settings.SledgehammerOnlyInSafehouse} onChange={handleInputChange} disabled={isPlayerSafehouseEnabled}/>
        <InputOption label="SafehouseDaySurvivedToClaim" name="SafehouseDaySurvivedToClaim" value={settings.SafehouseDaySurvivedToClaim} onChange={handleInputChange} enabled={isPlayerSafehouseEnabled} />
        <InputOption label="SafeHouseRemovalTime" name="SafeHouseRemovalTime" value={settings.SafeHouseRemovalTime} onChange={handleInputChange} enabled={isPlayerSafehouseEnabled}/>
        <ToggleOption label="PlayerRespawnWithSelf" name="PlayerRespawnWithSelf" value={settings.PlayerRespawnWithSelf} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="PlayerRespawnWithOther" name="PlayerRespawnWithOther" value={settings.PlayerRespawnWithOther} onChange={handleInputChange} disabled = {Notdisabled}/>
        <ToggleOption label="DisableSafehouseWhenPlayerConnected" name="DisableSafehouseWhenPlayerConnected" value={settings.DisableSafehouseWhenPlayerConnected} onChange={handleInputChange} />
        <ToggleOption label="Faction" name="Faction" value={settings.Faction} onChange={handleInputChange} disabled = {Notdisabled}/>
        <InputOption label="FactionDaySurvivedToCreate" name="FactionDaySurvivedToCreate" value={settings.FactionDaySurvivedToCreate} onChange={handleInputChange} enabled={isFactionEnabled} />
        <InputOption label="FactionPlayersRequiredForTag" name="FactionPlayersRequiredForTag" value={settings.FactionPlayersRequiredForTag} onChange={handleInputChange} enabled={isFactionEnabled}/>
        <InputOption label="SpawnPoint" name="SpawnPoint" value={settings.SpawnPoint} onChange={handleInputChange} enabled={enabled}/>
        </>
        <>
        <h3>Item and Loot</h3>
        <InputOption label="SpawnItems" name="SpawnItems" value={settings.SpawnItems} onChange={handleInputChange} enabled={enabled}/>
        <InputOption label="HoursForLootRespawn" name="HoursForLootRespawn" value={settings.HoursForLootRespawn} onChange={handleInputChange} enabled={enabled}/>
        <InputOption label="MaxItemsForLootRespawn" name="MaxItemsForLootRespawn" value={settings.MaxItemsForLootRespawn} onChange={handleInputChange} enabled={enabled} />
        <ToggleOption label="ConstructionPreventsLootRespawn" name="ConstructionPreventsLootRespawn" value={settings.ConstructionPreventsLootRespawn} onChange={handleInputChange} disabled = {Notdisabled}/>
        </>
        <>
        <h3>General</h3>
        <InputOption label="MapRemotePlayerVisibility" name="MapRemotePlayerVisibility" value={settings.MapRemotePlayerVisibility} onChange={handleInputChange} enabled={enabled}/>
        <InputOption label="MinutesPerPage" name="MinutesPerPage" value={settings.MinutesPerPage} onChange={handleInputChange} enabled={enabled} />
        <ToggleOption label="SleepAllowed" name="SleepAllowed" value={settings.SleepAllowed} onChange={handleInputChange}disabled = {Notdisabled} />
        <ToggleOption label="SleepNeeded" name="SleepNeeded" value={settings.SleepNeeded} onChange={handleInputChange} disabled = {Notdisabled}/>
        <InputOption label="CarEngineAttractionModifier" name="CarEngineAttractionModifier" value={settings.CarEngineAttractionModifier} onChange={handleInputChange} enabled={enabled}/>
        <InputOption label="SpeedLimit" name="SpeedLimit" value={settings.SpeedLimit} onChange={handleInputChange} enabled={enabled}/>
        <InputOption label="FastForwardMultiplier" name="FastForwardMultiplier" value={settings.FastForwardMultiplier} onChange={handleInputChange} enabled={enabled} />
        <InputOption label="BloodSplatLifespanDays" name="BloodSplatLifespanDays" value={settings.BloodSplatLifespanDays} onChange={handleInputChange} enabled={enabled}/>
        <ToggleOption label="TrashDeleteAll" name="TrashDeleteAll" value={settings.TrashDeleteAll} onChange={handleInputChange} disabled = {Notdisabled} />
        </>
        <>
        <h3>General Chat Settings</h3>
          <ToggleOption label="GlobalChat" name="GlobalChat" value={settings.GlobalChat} onChange={handleInputChange} disabled = {Notdisabled}/>
          <InputOption label="ChatStreams" name="ChatStreams" value={settings.ChatStreams} onChange={handleInputChange} enabled={enabled}/>
        </>
        <>
        <h3>Discord Settings</h3>
          <ToggleOption label="DiscordEnable" name="DiscordEnable" value={settings.DiscordEnable} onChange={handleInputChange} disabled = {Notdisabled}/>
          <InputOption label="DiscordToken" name="DiscordToken" value={settings.DiscordToken} onChange={handleInputChange} enabled={isDisordEnabled}/>
          <InputOption label="DiscordChannel" name="DiscordChannel" value={settings.DiscordChannel} onChange={handleInputChange}enabled={isDisordEnabled} />
          <InputOption label="DiscordChannelID" name="DiscordChannelID" value={settings.DiscordChannelID} onChange={handleInputChange} enabled={isDisordEnabled}/>
        </>
        <>
        <h3>Voice Chat Settings</h3>
          <ToggleOption label="VoiceEnable" name="VoiceEnable" value={settings.VoiceEnable} onChange={handleInputChange} disabled = {Notdisabled}/>
          <InputOption label="VoiceMinDistance" name="VoiceMinDistance" value={settings.VoiceMinDistance} onChange={handleInputChange} enabled={isVoiceEnabled}/>
          <InputOption label="VoiceMaxDistance" name="VoiceMaxDistance" value={settings.VoiceMaxDistance} onChange={handleInputChange} enabled={isVoiceEnabled}/>
          <ToggleOption label="Voice3D" name="Voice3D" value={settings.Voice3D} onChange={handleInputChange} disabled = {Notdisabled}/>
        </>
        <>
        <h3>Group Related Radio Permission</h3>
          <ToggleOption label="DisableRadioStaff" name="DisableRadioStaff" value={settings.DisableRadioStaff} onChange={handleInputChange} disabled = {Notdisabled}/>
          <ToggleOption label="DisableRadioAdmin" name="DisableRadioAdmin" value={settings.DisableRadioAdmin} onChange={handleInputChange} disabled = {Notdisabled}/>
          <ToggleOption label="DisableRadioGM" name="DisableRadioGM" value={settings.DisableRadioGM} onChange={handleInputChange} disabled = {Notdisabled}/>
          <ToggleOption label="DisableRadioOverseer" name="DisableRadioOverseer" value={settings.DisableRadioOverseer} onChange={handleInputChange} disabled = {Notdisabled}/>
          <ToggleOption label="DisableRadioModerator" name="DisableRadioModerator" value={settings.DisableRadioModerator} onChange={handleInputChange} disabled = {Notdisabled}/>
          <ToggleOption label="DisableRadioInvisible" name="DisableRadioInvisible" value={settings.DisableRadioInvisible} onChange={handleInputChange} disabled = {Notdisabled}/>
        </>
      
      <button onClick={handleSave}>Save</button>
      </div>
    )}
    </>
  );
}