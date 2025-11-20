// src/config/sequelize-config.js
const { Sequelize } = require('sequelize');

// Railway inyecta la URL completa de la base de datos
const connectionUrl = process.env.MYSQL_URL || 'mysql://root:tu_contraseña@localhost:3306/railway';

if (!connectionUrl) {
  console.error('❌ No se encontró la URL de la base de datos (MYSQL_URL).');
  process.exit(1);
}

const sequelize = new Sequelize(connectionUrl, {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

console.log('✅ Conexión configurada con éxito a la base de datos.');

module.exports = sequelize;
