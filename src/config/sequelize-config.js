const { Sequelize } = require('sequelize');

// ⚠️ En producción en Railway NO necesitas dotenv
// Solo úsalo si quieres correr localmente con .env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Primero intentar la URL de Railway (MYSQL_URL), luego DB_URL (local)
const connectionUrl = process.env.MYSQL_URL || process.env.DB_URL;

if (!connectionUrl) {
  throw new Error(
    'La variable de entorno MYSQL_URL o DB_URL no está definida. Verifica tus variables en Railway o tu .env local.'
  );
}

console.log("Conectando a DB con:", connectionUrl);

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
