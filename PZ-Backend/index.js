import express from 'express';
import bodyParser from 'body-parser';
import ini from 'ini';
import fs from 'fs';
import cors from 'cors';
import { spawn } from 'child_process';


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


app.post('/api/settings', (req, res) => {
  const settings = req.body;
  const iniString = ini.stringify(settings);
  fs.writeFileSync(configFilePath, iniString);
  runWebConfigUpdater(); // starts the config updater and updates servertest.ini
  res.json({ success: true });
});

// start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`)})