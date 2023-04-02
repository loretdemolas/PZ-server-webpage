import React, { useState, useEffect } from "react";

import Mod from "./Mod.module.css"
const WorkshopList = React.memo(() => {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const storedWorkshops = JSON.parse(localStorage.getItem("workshops"));
    console.log(storedWorkshops);
    if (storedWorkshops) {
      console.log("Retrieving workshops from local storage:", storedWorkshops);
      setWorkshops(storedWorkshops);
    } else {
      localStorage.setItem("workshops", JSON.stringify([]));
      console.log("Setting local storage to empty array");
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem("workshops", JSON.stringify(workshops));
  }, [workshops]);

  const addWorkshop = (workshopId, mod) => {
    if (workshops.find((workshop) => workshop.workshopId === workshopId)) {
      setWorkshops(
        workshops.map((workshop) => {
          if (workshop.workshopId === workshopId) {
            return { ...workshop, mods: [...workshop.mods, mod] };
          }
          return workshop;
        })
      );
    } else {
      setWorkshops([...workshops, { workshopId, mods: [mod] }]);
    }
  };

  const removeWorkshop = (workshopId) => {
    setWorkshops(workshops.filter((workshop) => workshop.workshopId !== workshopId));
  };

  const removeMod = (workshopId, mod) => {
    setWorkshops(
      workshops.map((workshop) => {
        if (workshop.workshopId === workshopId) {
          return { ...workshop, mods: workshop.mods.filter((m) => m !== mod) };
        }
        return workshop;
      })
    );
  };

  return (
    <div>
      <div className={Mod.Header}>
        <h2>Add and Remove Mods</h2>
        <p>Input workshop ID and Mods separated by a comma. Then press Enter</p>
        <input
          type="text"
          placeholder="workshopId,mod1"
          onKeyDown={(event) => {
            if (event.key === "Enter" && event.target.value) {
              const [workshopId, ...mods] = event.target.value.split(",").map((value) => value.trim());
              addWorkshop(workshopId, mods);
              event.target.value = "";
            }
          }}
        />
      </div>
      <h2 style={{textAlign:"center"}}>Active Mods</h2>
      <div style={{ display: "flex", gap: "20px", margin: "10px" }}>
        {workshops.map((workshop) => (
                <div className={Mod.Mod} key={workshop.workshopId}>
                  <p>{workshop.workshopId}</p>
                  <button onClick={() => removeWorkshop(workshop.workshopId)}>Remove Workshop</button>
                  <ul>
                    {workshop.mods.map((mod) => (
                      <li key={mod}>
                        {mod}
                        <button onClick={() => removeMod(workshop.workshopId, mod)}></button>
                      </li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    placeholder="Add Mod"
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && event.target.value) {
                        addWorkshop(workshop.workshopId, event.target.value);
                        event.target.value = "";
                      }
                    }}
                  />
                </div>
              ))}
      </div>
      
      
    </div>
  );
});

export default WorkshopList;
