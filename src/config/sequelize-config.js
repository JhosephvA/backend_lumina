const { Sequelize } = require('sequelize');
require('dotenv').config();

// Usar MYSQL_URL de Railway
const connectionUrl = process.env.MYSQL_URL;

if (!connectionUrl) {
  throw new Error(
    'La variable de entorno MYSQL_URL no está definida. Asegúrate de configurarla en Railway.'
  );
}

// Debug: mostrar URL de conexión (opcional, puedes comentar luego)
console.log("Conectando a DB con:", connectionUrl);

const sequelize = new Sequelize(connectionUrl, {
  dialect: process.env.DB_DIALECT || 'mysql',
  logging: false, // cambia a console.log si quieres ver queries
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // necesario para conexiones remotas
    },
  },
});

module.exports = sequelize;
