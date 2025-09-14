#!/usr/bin/env node

const APIKeySetup = require('./utils/api-key-setup');

async function runSetup() {
  const setup = new APIKeySetup();
  await setup.startSetup();
}

runSetup().catch(error => {
  console.error('Setup failed:', error.message);
  process.exit(1);
});