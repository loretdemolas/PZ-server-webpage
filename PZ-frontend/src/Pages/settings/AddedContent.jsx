import React from 'react';
import WorkshopList from './InputOptions/ModList';

export default function AddedContent() {
  
  const sendDataToServer = async () => {
    const settings = { WorkshopItems: [], Mods: [] };

    // Retrieve the data from local storage
    const data = JSON.parse(localStorage.getItem("workshops"));
  
    // Loop through each item in the data array
    data.forEach(item => {
      // Add the workshop ID to the WorkshopItems array
      settings.WorkshopItems.push(item.workshopId);
  
      // If the mods array is already an array, add its values to the Mods array
      if (Array.isArray(item.mods)) {
        settings.Mods.push(...item.mods);
      } 
      // Otherwise, add the single mod value to the Mods array
      else {
        settings.Mods.push(item.mods);
      }
    });
  
    // Join the WorkshopItems and Mods arrays into strings
    const workshopItemsString = settings.WorkshopItems.join('|');
    const modsString = settings.Mods.join('|');
  
    // Send the data to the server
    const response = await fetch('http://localhost:3000/api/mods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `WorkshopItems=${workshopItemsString}&Mods=${modsString}`
    });
  
    // Return the response data
    return await response.json();
  };
  return (
    <div>
      <button onClick={sendDataToServer}>Save</button>
      <WorkshopList />
    </div>
  );
}
