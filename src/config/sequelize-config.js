// sequelize-config.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Usar la URL pública de Railway
const connectionUrl = process.env.MYSQL_PUBLIC_URL;

const sequelize = new Sequelize(connectionUrl, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // importante para conexiones remotas
    },
  },
  logging: false, // desactiva logs de SQL
});

module.exports = sequelize;