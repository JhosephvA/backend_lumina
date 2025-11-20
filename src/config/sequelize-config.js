const { Sequelize } = require('sequelize');
require('dotenv').config();

// Construir la URL de conexión usando variables de Railway
const {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE
} = process.env;

// Validar que existan todas las variables necesarias
if (!MYSQL_USER || !MYSQL_PASSWORD || !MYSQL_HOST || !MYSQL_PORT || !MYSQL_DATABASE) {
  console.error("==== DEBUG VARIABLES ENTORNO ====");
  console.log("MYSQL_USER:", MYSQL_USER);
  console.log("MYSQL_PASSWORD:", MYSQL_PASSWORD);
  console.log("MYSQL_HOST:", MYSQL_HOST);
  console.log("MYSQL_PORT:", MYSQL_PORT);
  console.log("MYSQL_DATABASE:", MYSQL_DATABASE);
  console.log("=================================");
  throw new Error('❌ No se encontró alguna variable de entorno de la base de datos en Railway.');
}

// Construir la URL de conexión completa
const connectionUrl = `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}`;

console.log("Conectando a DB con:", connectionUrl);

const sequelize = new Sequelize(connectionUrl, {
  dialect: 'mysql',
  logging: console.log, // puedes poner false si no quieres logs
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
