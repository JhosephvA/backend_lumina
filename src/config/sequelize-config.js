// src/config/sequelize-config.js
const { Sequelize } = require('sequelize');

// Solo variables que Railway inyecta
const user = process.env.MYSQLUSER;
const password = process.env.MYSQLPASSWORD;
const host = process.env.MYSQLHOST;
const port = process.env.MYSQLPORT;
const database = process.env.MYSQLDATABASE;
const dialect = process.env.DB_DIALECT || 'mysql';

// Validar que existan
if (!user || !password || !host || !port || !database) {
  console.error('❌ Faltan variables de entorno para la DB en Railway');
  process.exit(1);
}

// Construir la URL de conexión
const connectionUrl = `mysql://${user}:${password}@${host}:${port}/${database}`;

const sequelize = new Sequelize(connectionUrl, {
  dialect,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // obligatorio en Railway
    },
  },
});

console.log('✅ Conexión configurada con éxito a la base de datos en Railway');

module.exports = sequelize;
