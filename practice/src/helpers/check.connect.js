'use strict'

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECONDS = 5000;

// 3. Counting the number of connections 
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`>>> Number of connections: ${numConnection}`);
}

// 4. Checking overloading connection
const checkOverload = () => {
  // monitoring each of 5s
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length; // check how many CPU's cores
    const usedMemoryUsage = process.memoryUsage().rss;

    // Giả sử máy này chịu được 5 connections của mongodb 
    // Let's say maximum number of connections based on number of cores
    const maxConnections = numCores * 5; // Giả sử: mỗi core chịu được 5 connections

    console.log(`>>> Activate connections: ${numConnection}`);
    console.log(`>>> Memory usage: ${usedMemoryUsage}`);

    if(numConnection > maxConnections) {
      console.log(`>>> MongoDB Connection overload detected!`);
    }
  }, _SECONDS);
}

module.exports = {
  countConnect,
  checkOverload,
}