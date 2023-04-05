import express from 'express';
import bodyParser from 'body-parser';
import ini from 'ini';
import fs from 'fs';
import cors from 'cors';
import { spawn } from 'child_process';
import { WebSocketServer } from 'ws';
import  Rcon  from './services/Rcon/Rcon.js';

// remove dot in file paths before dockerizing!!!!
const app = express();
const configFilePath = './home/steam/Zomboid/scripts/server.ini';

function runWebConfigUpdater() {
  const configUpdater = spawn('python', ['./home/steam/Zomboid/scripts/web-server-configUpdater.py']);

  configUpdater.on('exit', (code) => {
    if (code === 0) {
      console.log('Config updater script exited successfully');
    } else {
      console.log(`Config updater script exited with code ${code}`);
      console.log('Restarting config updater script...');
      setTimeout(runWebConfigUpdater, 5000);
    }
  });

  configUpdater.stdout.on('data', (data) => {
    console.log(`Config updater script stdout: ${data}`);
  });

  configUpdater.stderr.on('data', (data) => {
    console.error(`Config updater script stderr: ${data}`);
  });
}
function FetchCurrentConfig() {
  const configUpdater = spawn('python', ['./home/steam/Zomboid/scripts/server-web-configUpdater.py']);

  configUpdater.on('exit', (code) => {
    if (code === 0) {
      console.log('Config updater script exited successfully');
    } else {
      console.log(`Config updater script exited with code ${code}`);
      console.log('Restarting config updater script...');
      setTimeout(FetchCurrentConfig, 5000);
    }
  });

  configUpdater.stdout.on('data', (data) => {
    console.log(`Config updater script stdout: ${data}`);
  });

  configUpdater.stderr.on('data', (data) => {
    console.error(`Config updater script stderr: ${data}`);
  });
}

FetchCurrentConfig()


// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.get('/api/settings', (req, res) => {
  const fetchConfigPromise = new Promise((resolve, reject) => {
    FetchCurrentConfig();
    const intervalId = setInterval(() => {
      const settings = ini.parse(fs.readFileSync(configFilePath, 'utf-8'));
      if (settings) {
        clearInterval(intervalId);
        resolve(settings);
      }
    }, 1000);
  });

  fetchConfigPromise.then(settings => {
    res.json(settings);
  });
});

app.post('/api/server/create', (req, res) => {

const services = {
  service1: {
   
  },
};

// Create a Docker Compose object
const dockerCompose = {
  version: '3.8',
  services,
};

// Write the Docker Compose object to a YAML file
fs.writeFileSync('docker-compose.yml', YAML.stringify(dockerCompose));

});

app.post('/api/server/start', (req, res) => {

});

app.post('/api/server/stop', (req, res) => {

});

app.post('/api/server/delete', (req, res) => {

});


app.post('/api/settings', (req, res) => {
  const settings = req.body;
  console.log(settings)
  const iniString = ini.stringify(settings);
  fs.writeFileSync(configFilePath, iniString);
  runWebConfigUpdater(); // starts the config updater and updates servertest.ini
  res.json({ success: true });
});

app.post('/api/mods', (req, res) => {
  const { Mods, WorkshopItems, ...rest } = req.body;
  
  // Read the current content of the INI file and parse it
  const iniContent =fs.readFileSync(configFilePath, 'utf-8');
  const currentIniData = ini.parse(iniContent);

  // Merge the parsed object with the new data
  const newIniData = {
    ...currentIniData,
    ...rest,
    Mods: Mods,
    WorkshopItems: WorkshopItems
  };

  // Write the merged object back to the INI file
  const iniString = ini.stringify(newIniData);
  fs.writeFileSync(configFilePath, iniString);

  runWebConfigUpdater(); // starts the config updater and updates servertest.ini
  res.json({ success: true });
});

app.get('/api/players', (req, res) => {
  rcon.sendCommand('players', (response) => {
    console.log("players:", response);
    const playersList = response.split(': ')[1];
    const players = playersList ? playersList.split('\n').slice(1).map(p => p.trim().replace('-', '')) : [];
    console.log(players);
    res.json(players);
  });
});



app.post('/api/run-command', (req, res) => {
  const { command } = req.body;
  rcon.sendCommand(`sendcommandto "${req.query.steamId}" ${command}`, response => {
    console.log(`Rcon response:\n${response}`);
    res.json({ success: true, response });
  });
});

// start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`)})

//rcon 

const PORT = process.env.PORT || 8080;

const rcon = new Rcon('192.168.1.183', 27015, 'Seba5054!!');
await rcon.connect();
await rcon.authenticate();

const wss = new WebSocketServer({ port: PORT });
console.log(`WebSocket server listening on port ${PORT}...`);

wss.on('connection', (ws) => {
  console.log(`Client connected to WebSocket server`);

  ws.on('message', (message) => {
    console.log('WebSocket message:', message.toString());
    rcon.sendCommand(message.toString())
      .then((response) => {
        console.log('Rcon response:', response);
        ws.send(response.body);
      })
      .catch((error) => {
        console.error('Rcon error:', error);
        ws.send(`Error: ${error.message}`);
      });
});

  ws.on('close', () => {
    console.log(`Client disconnected from WebSocket server`);
  });
});