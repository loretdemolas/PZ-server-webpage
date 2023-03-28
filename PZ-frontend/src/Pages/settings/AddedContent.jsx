import { fetchSettings, saveSettings } from './API/Setting-API';
import React, { useState, useEffect } from 'react';

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
    const newSettings = {
      ...settings,
      WorkshopItems: WorkshopItems.map(item => item.trim()).join('|'),
      Mods: Mods.map(item => item.trim()).join('|')
    };
    const response = await saveSettings(newSettings);
    console.log(response);
  };

  const [workshopInput, setWorkshopInput] = useState('');
  const [modInput, setModInput] = useState('');

  const handleAdd = () => {
    const WorkshopItems = settings.WorkshopItems ? settings.WorkshopItems.split('|') : [];
    const Mods = settings.Mods ? settings.Mods.split('|') : [];
  
    const newWorkshopItems = [...WorkshopItems, workshopInput];
    const newMods = [...Mods, modInput];
  
    setSettings(prevSettings => ({
      ...prevSettings,
      WorkshopItems: newWorkshopItems.map(item => item.trim()).join('|'),
      Mods: newMods.map(item => item.trim()).join('|')
    }));
  
    setWorkshopInput('');
    setModInput('');
  };

  const handleRemove = (index) => {
    const WorkshopItems = settings.WorkshopItems ? settings.WorkshopItems.split('|') : [];
    const Mods = settings.Mods ? settings.Mods.split('|') : [];
    const newWorkshopItems = [...WorkshopItems];
    const newMods = [...Mods];
    newWorkshopItems.splice(index, 1);
    newMods.splice(index, 1);
    setSettings(prevSettings => ({ ...prevSettings, WorkshopItems: newWorkshopItems.join('|'), Mods: newMods.join('|') }));
  };

  const WorkshopItems = settings.WorkshopItems ? settings.WorkshopItems.split('|') : [];
  const Mods = settings.Mods ? settings.Mods.split('|') : [];

  return (
    <div>
      <div>
        <label htmlFor="workshop-input">Workshop ID:</label>
        <input type="text" id="workshop-input" value={workshopInput} onChange={e => setWorkshopInput(e.target.value)} />
        <label htmlFor="mod-input">Mod name:</label>
        <input type="text" id="mod-input" value={modInput} onChange={e => setModInput(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div>
        <ul>
          {WorkshopItems.map((item, index) => (
            <li key={index}>
              {item} - {Mods[index]}
              <button onClick={() => handleRemove(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
