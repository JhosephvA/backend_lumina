const { Sequelize } = require('sequelize');
require('dotenv').config();

// -----------------------------
// Intentar leer la URL completa primero
// -----------------------------
let connectionUrl = process.env.DB_URL;

// -----------------------------
// Si DB_URL no está definida, usar variables separadas
// -----------------------------
if (!connectionUrl) {
  const {
    MYSQL_DATABASE,
    MYSQLUSER,
    MYSQLPASSWORD,
    MYSQLHOST,
    MYSQLPORT,
    DB_DIALECT
  } = process.env;

  if (!MYSQL_DATABASE || !MYSQLUSER || !MYSQLPASSWORD || !MYSQLHOST || !MYSQLPORT) {
    throw new Error(
      'Las variables de entorno necesarias para la base de datos no están definidas.'
    );
  }

  connectionUrl = `${DB_DIALECT || 'mysql'}://${MYSQLUSER}:${MYSQLPASSWORD}@${MYSQLHOST}:${MYSQLPORT}/${MYSQL_DATABASE}`;
}

// -----------------------------
// Debug: imprimir la URL para verificar
// -----------------------------
console.log("DB_URL final:", connectionUrl);

const sequelize = new Sequelize(connectionUrl, {
  dialect: process.env.DB_DIALECT || 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // necesario para conexiones remotas como Railway
    },
  },
});

module.exports = sequelize;
