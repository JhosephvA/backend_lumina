const { Sequelize } = require('sequelize');
require('dotenv').config();

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
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
