import express from 'express';
import bodyParser from 'body-parser';
import ini from 'ini';
import fs from 'fs';
import cors from 'cors';

const app = express();
const configFilePath = 'server.ini';

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.get('/api/settings', (req, res) => {
  const settings = ini.parse(fs.readFileSync('server.ini', 'utf-8'));
  res.json(settings);
});

app.post('/api/settings', (req, res) => {
  const settings = req.body;
  const iniString = ini.stringify(settings);
  fs.writeFileSync('server.ini', iniString);
  res.json({ success: true });
});

// start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`)})