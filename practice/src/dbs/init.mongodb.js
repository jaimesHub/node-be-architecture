'use strict'
const { countConnect, checkOverload } = require('../helpers/check.connect');

class Database {
  constructor() {
    this.connect();
  }

  connect(type='mongodb') {
    const mongoose = require('mongoose');
    const connectString = `mongodb://127.0.0.1:27017/shopDEV`;

    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose.connect(connectString)
      .then(_ => {
        console.log(`>>> [Applied SINGLETON] MongoDB Connected!`)
        // countConnect(); // 3. Kiểm tra hệ thống có bao nhiêu CONNECT ?
        // checkOverload(); // 4. Thông báo khi server QUÁ TẢI connect
      })
      .catch(err => console.log(`>>> [Applied SINGLETON] MongoDB Connecting Failed!`));
  }

  static getInstance() {
    if(!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;