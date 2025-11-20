const { Sequelize } = require('sequelize');
require('dotenv').config();

const connectionUrl = process.env.DB_URL || process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL;

if (!connectionUrl) {
  throw new Error('No se encontró ninguna URL de conexión a la base de datos.');
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
