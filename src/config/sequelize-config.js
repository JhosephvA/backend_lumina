const { Sequelize } = require('sequelize');
require('dotenv').config();

if (!process.env.DB_URL) {
  throw new Error('La variable de entorno DB_URL no está definida.');
}

const sequelize = new Sequelize(process.env.DB_URL, {
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
