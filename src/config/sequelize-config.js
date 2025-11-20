// sequelize-config.js
const { Sequelize } = require('sequelize');

const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

const sequelize = new Sequelize(
  process.env.DB_NAME,     // "railway"
  process.env.DB_USER,     // "root"
  process.env.DB_PASSWORD, // tu password
  {
    host: process.env.DB_HOST, // "mainline.proxy.rlwy.net"
    port: dbPort,              // 13165
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

module.exports = sequelize;