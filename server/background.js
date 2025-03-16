#!/usr/bin/env node

/**
 * Script to start the automation server in the background
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Path to the server script
const serverPath = path.join(__dirname, 'start.js');

// Path to the log file
const logPath = path.join(__dirname, 'server.log');

// Open the log file
const out = fs.openSync(logPath, 'a');
const err = fs.openSync(logPath, 'a');

// Spawn the server process
const server = spawn('node', [serverPath], {
  detached: true,
  stdio: ['ignore', out, err]
});

// Unref the child process so the parent can exit
server.unref();

console.log(`Server started in background with PID: ${server.pid}`);
console.log(`Logs are being written to: ${logPath}`);
console.log('You can close this terminal window now.');

// Exit the parent process
process.exit(0); 