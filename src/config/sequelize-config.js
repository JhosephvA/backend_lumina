const { Sequelize } = require('sequelize');
require('dotenv').config();

// Debug: imprimir la URL para ver si Railway la está pasando correctamente
console.log("DB_URL:", process.env.DB_URL);

const connectionUrl = process.env.DB_URL;

if (!connectionUrl) {
  throw new Error('La variable de entorno DB_URL no está definida.');
}

const sequelize = new Sequelize(connectionUrl, {
  dialect: process.env.DB_DIALECT || 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // necesario para conexiones remotas
    },
  },
});

module.exports = sequelize;
