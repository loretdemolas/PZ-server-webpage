import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

export default function Home() {
  const socket = useRef(null);
  const term = useRef(null);
  const [command, setCommand] = useState('');

  useEffect(() => {
    // Create a new WebSocket connection to the backend server
    socket.current = new WebSocket('ws://localhost:8080');

    // Create a new instance of the terminal emulator
    term.current = new Terminal();

    // Add a "fit" addon to automatically resize the terminal to fit the container
    const fitAddon = new FitAddon();
    term.current.loadAddon(fitAddon);

    // Configure the terminal to send input to the backend server via WebSockets
    term.current.onData((data) => {
      socket.current.send(data);
    });

    // Handle incoming messages from the backend server and display them in the terminal
    socket.current.onmessage = (event) => {
      term.current.write(event.data);
    };

    // Clean up the WebSocket connection and terminal emulator when the component unmounts
    return () => {
      socket.current.close();
      term.current.dispose();
    };
  }, []);

  const handleCommandChange = (event) => {
    setCommand(event.target.value);
  };

  const handleSendCommand = () => {
    socket.current.send(`${command}\r\n`);
    setCommand('');
  };

  return (
    <div className="App" style={{ width: '80%', height: '400px' }}>
      <div ref={(ref) => (term.current = ref)}></div>
      <div>
        <input type="text" value={command} onChange={handleCommandChange} />
        <button onClick={handleSendCommand}>Send</button>
      </div>
    </div>
  );
}
