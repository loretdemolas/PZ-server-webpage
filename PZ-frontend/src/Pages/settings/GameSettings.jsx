import React, { useState, useEffect } from 'react';
import ToggleOption from './InputOptions/booleanOptions';
import InputOption from './InputOptions/InputOptions';
import {saveSettings, fetchSettings} from './API/Setting-API';

export default function GameSetting() {
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
          <h3>PVP and Player interactions</h3>
          <ToggleOption label="PVP" name="PVP" value={settings.PVP} onChange={handleInputChange} />
          <ToggleOption label="NoFire" name="NoFire" value={settings.NoFire} onChange={handleInputChange} />
          <ToggleOption label="SafetySystem" name="SafetySystem" value={settings.SafetySystem} onChange={handleInputChange} />
          <ToggleOption label="ShowSafety" name="ShowSafety" value={settings.ShowSafety} onChange={handleInputChange} />
          <InputOption label="SafetyToggleTimer" name="SafetyToggleTimer" value={settings.SafetyToggleTimer} onChange={handleInputChange} />
          <InputOption label="SafetyCooldownTimer" name="SafetyCooldownTimer" value={settings.SafetyCooldownTimer} onChange={handleInputChange} />
          <ToggleOption label="PVPMeleeWhileHitReaction" name="PVPMeleeWhileHitReaction" value={settings.PVPMeleeWhileHitReaction} onChange={handleInputChange} />
          <InputOption label="PVPMeleeDamageModifier" name="PVPMeleeDamageModifier" value={settings.PVPMeleeDamageModifier} onChange={handleInputChange} />
          <InputOption label="PVPFirearmDamageModifier" name="PVPFirearmDamageModifier" value={settings.PVPFirearmDamageModifier} onChange={handleInputChange} />
          <ToggleOption label="HidePlayersBehindYou" name="HidePlayersBehindYou" value={settings.HidePlayersBehindYou} onChange={handleInputChange} />
          <ToggleOption label="PlayerBumpPlayer" name="PlayerBumpPlayer" value={settings.PlayerBumpPlayer} onChange={handleInputChange} />
          <ToggleOption label="AnnounceDeath" name="AnnounceDeath" value={settings.AnnounceDeath} onChange={handleInputChange} />
          <ToggleOption label="DropOffWhiteListAfterDeath" name="DropOffWhiteListAfterDeath" value={settings.DropOffWhiteListAfterDeath} onChange={handleInputChange} />
          <ToggleOption label="KnockedDownAllowed" name="KnockedDownAllowed" value={settings.KnockedDownAllowed} onChange={handleInputChange} />
          <ToggleOption label="SneakModeHideFromOtherPlayers" name="SneakModeHideFromOtherPlayers" value={settings.SneakModeHideFromOtherPlayers} onChange={handleInputChange} />

          </>
          <>
          <h3> Player Name related Settings </h3>
          <ToggleOption label="DisplayUserName" name="DisplayUserName" value={settings.DisplayUserName} onChange={handleInputChange} />
          <ToggleOption label="ShowFirstAndLastName" name="ShowFirstAndLastName" value={settings.ShowFirstAndLastName} onChange={handleInputChange} />
          <ToggleOption label="AllowNonAsciiUsername" name="AllowNonAsciiUsername" value={settings.AllowNonAsciiUsername} onChange={handleInputChange} />
          <ToggleOption label="MouseOverToSeeDisplayName" name="MouseOverToSeeDisplayName" value={settings.MouseOverToSeeDisplayName} onChange={handleInputChange} />

          </>
          <>
          <h3>Safehouse Factions and spawning!</h3>
          <ToggleOption label="PlayerSafehouse" name="PlayerSafehouse" value={settings.PlayerSafehouse} onChange={handleInputChange} />
          <ToggleOption label="AdminSafehouse" name="AdminSafehouse" value={settings.AdminSafehouse} onChange={handleInputChange} />
          <ToggleOption label="SafehouseAllowTrepass" name="SafehouseAllowTrepass" value={settings.SafehouseAllowTrepass} onChange={handleInputChange} />
          <ToggleOption label="SafehouseAllowFire" name="SafehouseAllowFire" value={settings.SafehouseAllowFire} onChange={handleInputChange} />
          <ToggleOption label="SafehouseAllowLoot" name="SafehouseAllowLoot" value={settings.SafehouseAllowLoot} onChange={handleInputChange} />
          <ToggleOption label="SafehouseAllowRespawn" name="SafehouseAllowRespawn" value={settings.SafehouseAllowRespawn} onChange={handleInputChange} />
          <ToggleOption label="SafehouseAllowNonResidential" name="SafehouseAllowNonResidential" value={settings.SafehouseAllowNonResidential} onChange={handleInputChange} />
          <ToggleOption label="AllowDestructionBySledgehammer" name="AllowDestructionBySledgehammer" value={settings.AllowDestructionBySledgehammer} onChange={handleInputChange} />
          <ToggleOption label="SledgehammerOnlyInSafehouse" name="SledgehammerOnlyInSafehouse" value={settings.SledgehammerOnlyInSafehouse} onChange={handleInputChange} />
          <InputOption label="SafehouseDaySurvivedToClaim" name="SafehouseDaySurvivedToClaim" value={settings.SafehouseDaySurvivedToClaim} onChange={handleInputChange} />
          <InputOption label="SafeHouseRemovalTime" name="SafeHouseRemovalTime" value={settings.SafeHouseRemovalTime} onChange={handleInputChange} />
          <ToggleOption label="PlayerRespawnWithSelf" name="PlayerRespawnWithSelf" value={settings.PlayerRespawnWithSelf} onChange={handleInputChange} />
          <ToggleOption label="PlayerRespawnWithOther" name="PlayerRespawnWithOther" value={settings.PlayerRespawnWithOther} onChange={handleInputChange} />
          <ToggleOption label="DisableSafehouseWhenPlayerConnected" name="DisableSafehouseWhenPlayerConnected" value={settings.DisableSafehouseWhenPlayerConnected} onChange={handleInputChange} />
          <ToggleOption label="Faction" name="Faction" value={settings.Faction} onChange={handleInputChange} />
          <InputOption label="FactionDaySurvivedToCreate" name="FactionDaySurvivedToCreate" value={settings.FactionDaySurvivedToCreate} onChange={handleInputChange} />
          <InputOption label="FactionPlayersRequiredForTag" name="FactionPlayersRequiredForTag" value={settings.FactionPlayersRequiredForTag} onChange={handleInputChange} />
          <InputOption label="SpawnPoint" name="SpawnPoint" value={settings.SpawnPoint} onChange={handleInputChange} />

          </>
          <>
          <h3>Item and Loot</h3>
          <InputOption label="SpawnItems" name="SpawnItems" value={settings.SpawnItems} onChange={handleInputChange} />
          <InputOption label="HoursForLootRespawn" name="HoursForLootRespawn" value={settings.HoursForLootRespawn} onChange={handleInputChange} />
          <InputOption label="MaxItemsForLootRespawn" name="MaxItemsForLootRespawn" value={settings.MaxItemsForLootRespawn} onChange={handleInputChange} />
          <ToggleOption label="ConstructionPreventsLootRespawn" name="ConstructionPreventsLootRespawn" value={settings.ConstructionPreventsLootRespawn} onChange={handleInputChange} />

          </>
          <>
          <h3>General</h3>
          <InputOption label="MapRemotePlayerVisibility" name="MapRemotePlayerVisibility" value={settings.MapRemotePlayerVisibility} onChange={handleInputChange} />
          <InputOption label="MinutesPerPage" name="MinutesPerPage" value={settings.MinutesPerPage} onChange={handleInputChange} />
          <ToggleOption label="SleepAllowed" name="SleepAllowed" value={settings.SleepAllowed} onChange={handleInputChange} />
          <ToggleOption label="SleepNeeded" name="SleepNeeded" value={settings.SleepNeeded} onChange={handleInputChange} />
          <InputOption label="CarEngineAttractionModifier" name="CarEngineAttractionModifier" value={settings.CarEngineAttractionModifier} onChange={handleInputChange} />
          <InputOption label="SpeedLimit" name="SpeedLimit" value={settings.SpeedLimit} onChange={handleInputChange} />
          <InputOption label="FastForwardMultiplier" name="FastForwardMultiplier" value={settings.FastForwardMultiplier} onChange={handleInputChange} />
          <InputOption label="BloodSplatLifespanDays" name="BloodSplatLifespanDays" value={settings.BloodSplatLifespanDays} onChange={handleInputChange} />
          <ToggleOption label="TrashDeleteAll" name="TrashDeleteAll" value={settings.TrashDeleteAll} onChange={handleInputChange} />

          </>
          

          <button onClick={handleSave}>Save</button>
        </div>
      )};
    </>
  )  
}