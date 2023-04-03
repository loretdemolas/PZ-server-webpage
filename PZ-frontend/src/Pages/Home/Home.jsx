import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const socket = useRef(null);
  const textAreaRef = useRef(null);
  const [output, setOutput] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:8080');

    socket.current.onopen = () => {
      setOutput(prev => prev + 'WebSocket connection established\n');
    };

    socket.current.onmessage = (event) => {
      const data = event.data;
      setOutput(prev => prev + data + '\n');
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    };

    socket.current.onclose = (event) => {
      setOutput(prev => prev + 'WebSocket connection closed\n');
      setTimeout(connectWebSocket, 1000);
    };

    const connectWebSocket = () => {
      socket.current = new WebSocket('ws://localhost:8080');
    }

    return () => {
      socket.current.close();
    };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      const command = event.target.value.trim();
      socket.current.send(command);
      setInputValue('');
    }
  };

  const buttons = [
    { name: 'help', command: 'help' },
    { name: 'reload options', command: 'reloadoptions' },
    { name: 'add all to whitelist', command: 'addalltowhitelist' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: '200px', border: '2px solid black' }}>
        <p>Another sidebar</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '80%', height: '400px', maxWidth: '800px', marginRight: '10px', marginLeft: '10px'}}>
        <textarea ref={textAreaRef} value={output} style={{ width: '100%', height: '400px', overflow: 'scroll' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <div style={{ flex: 1 }}>
            <input type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} style={{ width: '80%', height: '20px' }} />
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            {buttons.map(button => (
              <button key={button.name} onClick={() => socket.current.send(button.command)}>{button.name}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ width: '200px', border: '2px solid black' }}>
        <p>Players</p>
      </div>
    </div>
  );
  
}
