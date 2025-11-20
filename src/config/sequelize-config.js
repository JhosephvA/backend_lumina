// sequelize-config.js
const { Sequelize } = require('sequelize');

// Configuración básica para MySQL
const dbConfig = {
  dialect: process.env.DB_DIALECT || 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // obligatorio en Railway DB
    },
  },
};

// Asegurarse de que el puerto sea número
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

// Conexión
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: dbPort,
    ...dbConfig,
  }
);

module.exports = sequelize;