import React, { useState, useEffect } from 'react';

export default function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [commandDetails, setCommandDetails] = useState('');

  useEffect(() => {
    // Poll the server for player data every 5 seconds
    const intervalId = setInterval(() => {
      fetch('http://localhost:3000/api/players')
        .then(res => res.json())
        .then(data => setPlayers(data));
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handlePlayerClick = player => {
    setSelectedPlayer(player);
  };

  const handleCommandClick = command => {
    setSelectedCommand(command);
  };

  const handleCommandSubmit = e => {
    e.preventDefault();
    // Make API call to run the selected command with the specified details
    fetch('/api/run-command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        command: `${selectedCommand} ${commandDetails}`,
        player: selectedPlayer
      })
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  return (
    <div className="App">
      <h1>Player List</h1>
      <ul>
        {players.map(player => (
          <li key={player.name} onClick={() => handlePlayerClick(player)}>
            {player.name}
            {selectedPlayer === player && (
              <div className="commands">
                <h2>Commands for {player.name}</h2>
                <ul>
                  <li onClick={() => handleCommandClick('kick')}>Kick</li>
                  <li onClick={() => handleCommandClick('ban')}>Ban</li>
                  {/* Add more commands as needed */}
                </ul>
                {selectedCommand && (
                  <form onSubmit={handleCommandSubmit}>
                    <label htmlFor="commandDetails">
                      Details for {selectedCommand}:
                    </label>
                    <input
                      type="text"
                      id="commandDetails"
                      value={commandDetails}
                      onChange={e => setCommandDetails(e.target.value)}
                    />
                    <button type="submit">Run Command</button>
                  </form>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

