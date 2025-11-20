const { Sequelize } = require('sequelize');
require('dotenv').config();

// Usar DB_URL, que Railway garantiza que existe
const connectionUrl = process.env.DB_URL || process.env.MYSQL_URL;

if (!connectionUrl) {
  throw new Error('La variable de entorno DB_URL no está definida.');
}

// Debug opcional
console.log("Conectando a DB con:", connectionUrl);

const sequelize = new Sequelize(connectionUrl, {
  dialect: process.env.DB_DIALECT || 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
