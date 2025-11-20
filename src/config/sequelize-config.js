// sequelize-config.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Usar la URL interna de Railway para conexiones dentro de la misma red
const connectionUrl = process.env.DB_URL;

const sequelize = new Sequelize(connectionUrl, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // importante para conexiones remotas seguras
    },
  },
  logging: false, // desactiva logs SQL
});

module.exports = sequelize;