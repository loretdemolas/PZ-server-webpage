import React, { useState, useEffect } from 'react';
import ToggleOption from './InputOptions/booleanOptions';
import InputOption from './InputOptions/InputOptions';
import {saveSettings, fetchSettings} from './API/Setting-API';

export default function AntiCheatSetting() {
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

  const isAntiCheatProtectionType2Enabled = settings.AntiCheatProtectionType2;
  const isAntiCheatProtectionType3Enabled = settings.AntiCheatProtectionType3;
  const isAntiCheatProtectionType4Enabled = settings.AntiCheatProtectionType4;
  const isAntiCheatProtectionType9Enabled = settings.AntiCheatProtectionType9;
  const isAntiCheatProtectionType15Enabled = settings.AntiCheatProtectionType15;
  const isAntiCheatProtectionType20Enabled = settings.AntiCheatProtectionType20;
  const isAntiCheatProtectionType22Enabled = settings.AntiCheatProtectionType22;
  const isAntiCheatProtectionType24Enabled = settings.AntiCheatProtectionType24;
  return (
    <div>
      <>
        <ToggleOption label="DoLuaChecksum" name="DoLuaChecksum" value={settings.DoLuaChecksum} onChange={handleInputChange} />
        <ToggleOption label="KickFastPlayers" name="KickFastPlayers" value={settings.KickFastPlayers} onChange={handleInputChange} />
      </>

      <>
        <ToggleOption label="AntiCheatProtectionType1" name="AntiCheatProtectionType1" value={settings.AntiCheatProtectionType1} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType2" name="AntiCheatProtectionType2" value={settings.AntiCheatProtectionType2} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType3" name="AntiCheatProtectionType3" value={settings.AntiCheatProtectionType3} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType4" name="AntiCheatProtectionType4" value={settings.AntiCheatProtectionType4} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType5" name="AntiCheatProtectionType5" value={settings.AntiCheatProtectionType5} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType6" name="AntiCheatProtectionType6" value={settings.AntiCheatProtectionType6} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType7" name="AntiCheatProtectionType7" value={settings.AntiCheatProtectionType7} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType8" name="AntiCheatProtectionType8" value={settings.AntiCheatProtectionType8} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType9" name="AntiCheatProtectionType9" value={settings.AntiCheatProtectionType9} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType10" name="AntiCheatProtectionType10" value={settings.AntiCheatProtectionType10} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType11" name="AntiCheatProtectionType11" value={settings.AntiCheatProtectionType11} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType12" name="AntiCheatProtectionType12" value={settings.AntiCheatProtectionType12} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType13" name="AntiCheatProtectionType13" value={settings.AntiCheatProtectionType13} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType14" name="AntiCheatProtectionType14" value={settings.AntiCheatProtectionType14} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType15" name="AntiCheatProtectionType15" value={settings.AntiCheatProtectionType15} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType16" name="AntiCheatProtectionType16" value={settings.AntiCheatProtectionType16} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType17" name="AntiCheatProtectionType17" value={settings.AntiCheatProtectionType17} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType18" name="AntiCheatProtectionType18" value={settings.AntiCheatProtectionType18} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType19" name="AntiCheatProtectionType19" value={settings.AntiCheatProtectionType19} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType20" name="AntiCheatProtectionType20" value={settings.AntiCheatProtectionType20} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType21" name="AntiCheatProtectionType21" value={settings.AntiCheatProtectionType21} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType22" name="AntiCheatProtectionType22" value={settings.AntiCheatProtectionType22} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType23" name="AntiCheatProtectionType23" value={settings.AntiCheatProtectionType23} onChange={handleInputChange} />
        <ToggleOption label="AntiCheatProtectionType24" name="AntiCheatProtectionType24" value={settings.AntiCheatProtectionType24} onChange={handleInputChange} />
      </>

      <>
        <p>Minimum=1.00 Maximum=10.00 Default=1.00</p>
        <InputOption label="AntiCheatProtectionType2ThresholdMultiplier" name="AntiCheatProtectionType2ThresholdMultiplier" value={settings.AntiCheatProtectionType2ThresholdMultiplier} onChange={handleInputChange} enabled={isAntiCheatProtectionType2Enabled} />       
        <InputOption label="AntiCheatProtectionType3ThresholdMultiplier" name="AntiCheatProtectionType3ThresholdMultiplier" value={settings.AntiCheatProtectionType3ThresholdMultiplier} onChange={handleInputChange} enabled={isAntiCheatProtectionType3Enabled}/>
        <InputOption label="AntiCheatProtectionType4ThresholdMultiplier" name="AntiCheatProtectionType4ThresholdMultiplier" value={settings.AntiCheatProtectionType4ThresholdMultiplier} onChange={handleInputChange} enabled={isAntiCheatProtectionType4Enabled}/>
        <InputOption label="AntiCheatProtectionType9ThresholdMultiplier" name="AntiCheatProtectionType9ThresholdMultiplier" value={settings.AntiCheatProtectionType9ThresholdMultiplier} onChange={handleInputChange} enabled={isAntiCheatProtectionType9Enabled}/>
        <InputOption label="AntiCheatProtectionType15ThresholdMultiplier" name="AntiCheatProtectionType15ThresholdMultiplier" value={settings.AntiCheatProtectionType15ThresholdMultiplier} onChange={handleInputChange} enabled={isAntiCheatProtectionType15Enabled}/>
        <InputOption label="AntiCheatProtectionType20ThresholdMultiplier" name="AntiCheatProtectionType20ThresholdMultiplier" value={settings.AntiCheatProtectionType20ThresholdMultiplier} onChange={handleInputChange} enabled={isAntiCheatProtectionType20Enabled}/>
        <InputOption label="AntiCheatProtectionType22ThresholdMultiplier" name="AntiCheatProtectionType22ThresholdMultiplier" value={settings.AntiCheatProtectionType22ThresholdMultiplier} onChange={handleInputChange} enabled={isAntiCheatProtectionType22Enabled}/>
        <p>Minimum=1.00 Maximum=10.00 Default=6.00</p>
        <InputOption label="AntiCheatProtectionType24ThresholdMultiplier" name="AntiCheatProtectionType24ThresholdMultiplier" value={settings.AntiCheatProtectionType24ThresholdMultiplier} onChange={handleInputChange} enabled={isAntiCheatProtectionType24Enabled}/>
      </>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}